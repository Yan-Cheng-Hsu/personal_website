# Stopping Silicon Decay: Building a Stateful Health Check System for Large-Scale GPU Clusters

## Abstract

In hyperscale AI infrastructure, hardware failures are the norm, not the exception. This article explores the **"Circular Termination"** problem we encountered while managing GPU clusters with thousands of nodes—where the cloud provider reclaims GPUs we flagged as faulty, only to reallocate them back to us. To solve this money pit (H100 idle cost ~$100/hr), we rebuilt the health check system from scratch, evolving from a **stateless linear scan** to a **stateful architecture based on GPU serial number tracking**. By introducing a Parent-Child DAG parallel scheduling model and AWS SSM batch optimization, we eliminated wasteful compute spending while reducing detection latency during large-scale scaling by **96%**.

---

## 1. Situation: The Stateless Legacy

In the early stages, our health check was a simple linear workflow. The system assumed "Instance ID is unique," so every time a new node joined, we treated it as entirely new hardware.

### 1.1 Technical Implementation

We used Kubernetes Taints (`health-check-NotStarted:NoSchedule`) to isolate new nodes and ran a four-phase pipeline including CPU/Mem checks, hardware validation, **DCGM Level 4** diagnostics, and **NCCL** communication tests.

### 1.2 Sequence Diagram: Linear Detection Flow (Happy Path)

This workflow worked well for small clusters—simple and intuitive logic:

```mermaid
sequenceDiagram
    autonumber
    participant K8s as K8s API Server
    participant DAG as HealthCheck Controller
    participant Node as GPU Node (EC2)
    participant Job as Test Runner Pod

    Note over K8s, Node: Node Joins with "NotStarted" Taint

    loop Every 30 Minutes
        DAG->>K8s: List Nodes with taint "NotStarted"
        K8s-->>DAG: Return Node List [Node-A, Node-B...]

        DAG->>K8s: Patch Node-A Taint -> "InProgress"

        rect rgb(240, 248, 255)
            Note right of DAG: Phase 1: Heavy Tests
            DAG->>K8s: Submit Job (NodeSelector: Node-A)
            K8s->>Node: Schedule Pod
            Node->>Job: Run DCGM & NCCL Tests
            Job-->>DAG: Return Result (Pass/Fail)
        end

        alt Test Passed
            DAG->>K8s: Remove Taint (Node Ready)
        else Test Failed
            DAG->>K8s: Taint "Failed"
            DAG->>K8s: Trigger Node Termination
        end
    end
```

---

## 2. The Problem: Ghost Hardware & Circular Termination

As cluster scale grew, we discovered a bizarre phenomenon: some nodes would be terminated, new nodes would immediately fill in, but then fail again with the same hardware errors (like Xid Errors).

### 2.1 Root Cause Analysis

This is a classic **distributed systems state inconsistency** problem.

* **Tenant View (Us)**: This GPU is broken, discard it.
* **Provider View (AWS)**: This GPU passed basic POST checks, it's fine—reclaim it to the resource pool.
* **Result**: AWS mounts the same physical GPU (same Serial Number) to a new Instance ID and reallocates it to us.

Because the original DAG was **stateless**, it only recognized Instance IDs, not underlying hardware IDs. This caused us to pay thousands of dollars in boot-up and idle fees testing the same broken card repeatedly.

### 2.2 Sequence Diagram: The Cost Loop

```mermaid
sequenceDiagram
    participant We as HealthCheck System
    participant AWS as AWS Control Plane
    participant ResPool as AWS Resource Pool
    participant BadGPU as Physical GPU (SN: XYZ-123)

    Note over We, BadGPU: Cycle 1
    AWS->>We: Provision Instance-1 (w/ GPU XYZ-123)
    We->>We: Run 3-Hour Deep Test
    We->>We: Test Fails (Hardware Error)
    We->>AWS: Terminate Instance-1

    AWS->>ResPool: Reclaim GPU XYZ-123
    Note right of AWS: AWS Health Check says "OK"

    Note over We, BadGPU: Cycle 2 (The Phantom Returns)
    ResPool->>AWS: Allocation Request
    AWS->>We: Provision Instance-2 (w/ GPU XYZ-123)
    Note right of We: Instance ID changed, treated as NEW
    We->>We: Run 3-Hour Deep Test Again $$$
    We->>We: Test Fails
    We->>AWS: Terminate Instance-2

    Note over We, BadGPU: Loop continues endlessly...
```

---

## 3. Action: Stateful & Parallel Architecture Evolution

To solve this problem, we needed to introduce **"hardware fingerprint tracking"**. But this introduced a new performance bottleneck: AWS SSM API (used to get GPU serial numbers) has ~10 second latency per node. When scaling 400 nodes at once, serial calls would cause 4000+ seconds of delay.

### 3.1 Architecture Decision: Parent-Child DAG + Batch Processing

We adopted a **Map-Reduce** design philosophy, breaking the monolithic DAG into a Parent-Child pattern:

1. **Parent DAG (The Dispatcher)**: Handles global scanning and sharding, splitting 400 nodes into multiple batches (e.g., 50 nodes/batch).
2. **Child DAG (The Worker)**: Processes individual batches, using **SSM Automation** for vectorized API calls.

### 3.2 Sequence Diagram: Parallel SSM Batch Retrieval

This design reduced API call count from **O(N)** to **O(N/BatchSize)**, dramatically reducing I/O wait time.

```mermaid
sequenceDiagram
    autonumber
    participant Parent as Parent DAG
    participant Child as Child DAG (Worker)
    participant SSM as AWS SSM Automation
    participant Lambda as Validation Logic
    participant DB as GPU History Table

    Note over Parent: Step I: Scan & Shard
    Parent->>Parent: Find 100 new nodes
    Parent->>Parent: Create Batch-1 (Node 1-50), Batch-2 (Node 51-100)

    par Parallel Execution
        Parent->>Child: Trigger Child DAG (Batch-1)
        Parent->>Child: Trigger Child DAG (Batch-2)
    end

    Note right of Child: Optimization: Vectorized API Call
    Child->>SSM: "Get Serial Numbers for these 50 Instance IDs"
    activate SSM
    SSM-->>Child: Return Map {InstanceID: GPU_Serial}
    deactivate SSM

    Child->>Lambda: Validate Batch (50 Serials)
    Lambda->>DB: Query History for 50 Serials
    DB-->>Lambda: Result: {GPU_A: Bad, GPU_B: Good...}
    Lambda-->>Child: Action Plan
```

---

## 4. Technical Deep Dive: Fast Fail Strategy

The core value of the new architecture lies in **"Pre-flight Check"**. Before launching expensive DCGM/NCCL test containers, we first check if this GPU is on our "blacklist".

### 4.1 State Management Logic

We maintain a DynamoDB table recording all H100/A100 Serial Numbers and their health status.

* **Cache Hit (Bad History)**: Immediately mark node Failed, terminate instance.
* **Cache Miss (New/Good)**: Proceed with normal testing.
* **Write Back**: If a new node fails testing, write its Serial Number to the blacklist.

### 4.2 Sequence Diagram: Defensive Termination Logic

```mermaid
sequenceDiagram
    participant Node as EC2 Instance
    participant Child as Child DAG
    participant DB as GPU History DB
    participant Test as Test Runner

    Child->>Child: Got GPU Serial: "SN-999" from SSM
    Child->>DB: Query "SN-999"

    alt Has Failure History (Blacklisted)
        DB-->>Child: Status: FAILED (Last seen 2h ago)

        rect rgb(255, 200, 200)
            Note over Child, Node: FAST FAIL PATH
            Child->>Node: Taint "health-check-Failed"
            Child->>Node: Terminate Instance
            Note right of Child: Cost Saved: 3 Hours of H100 time ($300)
        end

    else No History / Good History
        DB-->>Child: Status: UNKNOWN / HEALTHY

        rect rgb(200, 255, 200)
            Note over Child, Test: STANDARD PATH
            Child->>Test: Run DCGM & NCCL

            alt Test Fails
                Test-->>Child: Failure (Xid Error)
                Child->>DB: UPSERT "SN-999" -> Status: FAILED
                Child->>Node: Terminate
            else Test Passes
                Test-->>Child: Success
                Child->>Node: Untaint (Ready)
            end
        end
    end
```

---

## 5. Result (Outcomes & Impact)

This architecture overhaul was not just a technical upgrade—it was a successful **FinOps** practice.

1. **Eliminated the Money Pit**: Through GPU serial number tracking, we completely blocked faulty hardware from cycling back online. For clusters with 7000+ nodes, we intercept 15+ invalid allocations daily on average, saving tens of thousands of dollars monthly in wasted compute.

2. **Order of Magnitude Faster Scaling**: Through Parent-Child DAG parallelization and SSM batch calls, we reduced pre-check latency for 400-node scale-ups from an estimated **3000+ seconds** to under **120 seconds**, ensuring just-in-time compute resource delivery.

3. **Data as an Asset**: The GPU health database we built became powerful evidence for communicating with AWS TAM about claims and hardware replacements.

---

## 6. Summary

In cloud-native architecture, we cannot assume resources provided by cloud vendors are always reliable. By introducing **stateful hardware fingerprint tracking** and **parallel batch processing architecture**, we not only solved the technical performance bottleneck but also built a solid cost firewall for the company on the business side.
