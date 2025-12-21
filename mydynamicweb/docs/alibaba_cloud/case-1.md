# Scaling Through Layers: Recursive Ray Resource Pooling Architecture Based on Virtual Kubelet

## Abstract

This article details how to solve the classic challenges of "compute-storage separation" and "multi-tenant isolation" in large-scale AI SaaS platforms. We adopted a **"K8s on K8s"** recursive virtualization pattern, and through our self-developed **Identity & Network Mesh** middleware, successfully bridged the gap between Kubernetes logical networks and physical networks in cross-cluster scenarios, achieving **25x capacity scaling** and **~40% TCO reduction**.

---

## 1. Situation (Context & Challenges)

When building the next-generation AI training platform, we faced structural bottlenecks that a single Kubernetes cluster couldn't solve.

### 1.1 Business Context: The Dual Constraints of SaaS

Our platform needed to simultaneously serve the **Control Plane's** high stability requirements and the **Data Plane's** extreme elasticity requirements:

* **Control Plane**: Responsible for billing, state management, and CRD Operators. CPU-intensive, requiring **zero downtime**.
* **Data Plane**: Responsible for large-scale Tensor computation (Ray). GPU-intensive, relying on **Spot Instances** for cost reduction, with massive scale fluctuations.

### 1.2 Technical Pain Points: Physical Connection, Logical Disconnection

We decided to adopt a **multi-cluster cascading architecture** to schedule compute workloads to remote GPU clusters. Although all clusters were in the same VPC (Layer 3 connectivity), we hit Kubernetes's "boundary wall":

1. **Network Split-Brain**: Remote Workers couldn't recognize the master cluster's **ClusterIP** (virtual IP) or use the master cluster's **CoreDNS** for service resolution.
2. **Identity Gap**: Remote Pods held local ServiceAccounts by default, unable to pass the master cluster API Server's **AuthN/AuthZ**, preventing the Autoscaler from calling back to the master for scaling.
3. **Shadow IT**: If remote clusters were allowed to scale independently, the master would lose control over Quota and Billing.

---

## 2. Task (Goals & Responsibilities)

As the core architect, my goal was to design and implement a **"physically separated, logically unified"** resource governance system.

### 2.1 Core Objectives

1. **Build K8s on K8s Recursive Architecture**: Use **Virtual Kubelet (VK)** to abstract heterogeneous GPU clusters as an "infinitely large virtual node" for the upper-layer Master.
2. **Enable Cross-Boundary Communication**: Achieve low-latency cross-cluster RPC communication without complex VPN or Overlay network tunneling.
3. **Unify Identity Plane**: Implement cross-cluster **Credential Projection** to ensure Control Flow always converges to the Master.

---

## 3. Action (Key Architecture & Technical Implementation)

To address these challenges, we designed a complete solution encompassing **recursive virtualization**, **network penetration**, and **identity mesh**.

### 3.1 Architecture Layer: Recursive Resource Abstraction (The Recursive Pattern)

Rather than treating the system as a simple frontend/backend, we defined two levels of virtualization to completely shield underlying resources.

* **L1 Virtualization (User -> SaaS)**: Users see the SaaS Master as a standard K8s cluster, unaware of backend complexity.
* **L2 Virtualization (SaaS Master -> GPU Pool)**: Master abstracts multiple Client GPU Clusters into a unified resource pool via VK.

```mermaid
graph TD
    classDef unifiedVK fill:#e8eaf6,stroke:#3f51b5,stroke-width:2px,stroke-dasharray: 5 5;
    classDef masterLayer fill:#e3f2fd,stroke:#1565c0,stroke-width:2px;
    classDef clientLayer fill:#fff3e0,stroke:#e65100,stroke-width:2px;

    subgraph "Middleware: Unified VK Mesh"
        VK_Logic[VK Logic: Schedule & Inject]
    end

    subgraph "L2: SaaS Master (The Brain)"
        API_Master[Master API Server]
        Ray_Head[Ray Head / GCS]
        ILB((Internal CLB<br>VPC IP: 192.168.x.x))
        VNode_L2[Virtual Node<br>Target: GPU Pool]

        Ray_Head -.->|Expose| ILB
    end

    subgraph "L3: SaaS Client (The Muscle)"
        Worker_Pod[Ray Worker Pod<br>GPU Node]
    end

    Ray_Head -->|Scale Out| API_Master
    API_Master -->|Schedule| VNode_L2
    VNode_L2 == "Recursive Sync" ==> VK_Logic
    VK_Logic == "Dispatch & Inject" ==> Worker_Pod

    Worker_Pod ==>|Network Path via CLB| ILB
    Worker_Pod -.->|Identity Path via Token| API_Master

    class VK_Logic unifiedVK;
    class API_Master,Ray_Head,ILB,VNode_L2 masterLayer;
    class Worker_Pod clientLayer;
```

### 3.2 Network Decision: Link Selection & Trade-offs

When connecting L2 Master and L3 Client communication links, we evaluated multiple solutions and ultimately chose **Internal CLB (L4 LoadBalancer) + Webhook Injection**.

#### Why Choose Internal CLB? (The Chosen Path)

* **Physical Reachability**: Internal CLB provides a **VPC internal IP** (Underlay Network). This is natively routable for all compute nodes within the same VPC.
* **High Performance & Stability**: Ray GCS needs to handle high-frequency heartbeats. L4 CLB provides hardware-accelerated, high-throughput, low-latency forwarding with a fixed IP.
* **Security Boundary**: Only exposes specific ports (e.g., 6379), and traffic is completely restricted within the VPC.

#### Alternatives Considered

| Candidate Solution | Technical Principle | Why Rejected |
| --- | --- | --- |
| **Option A: Cross-cluster Overlay** | Establish encrypted tunnel (IPSec) | **Over-engineering**: We don't need full mesh connectivity, and Overlay encapsulation adds latency. |
| **Option B: CoreDNS Stub** | DNS forwarding | **Physical unreachability**: The resolved ClusterIP is still a virtual IP that Client nodes can't route to. |
| **Option C: NodePort** | Open high ports | **Security nightmare**: Exposes too much attack surface and requires maintaining complex Node IP lists. |

#### Technical Details: Network Injector Interception Logic

To let Workers connect to CLB without awareness, we used a Mutating Webhook for "dynamic surgery" during Pod creation.

```mermaid
sequenceDiagram
    autonumber
    participant Scheduler as K8s Scheduler
    participant Webhook as Network Injector
    participant CLB_API as Cloud Provider API
    participant Worker as Ray Worker Pod
    participant GCS as Ray Head (via CLB)

    Note over Scheduler, Worker: Phase 1: Pod Creation Interception
    Scheduler->>Webhook: Create Pod Request (Ray Worker)

    Webhook->>Webhook: Check Label "framework: ray"

    rect rgb(240, 248, 255)
        Note right of Webhook: Resolution Logic
        Webhook->>CLB_API: Lookup LoadBalancer IP for "ray-head-svc"
        CLB_API-->>Webhook: Return VPC IP: 192.168.0.100
        Webhook->>Webhook: Rewrite Env Var: RAY_ADDRESS=192.168.0.100
    end

    Webhook-->>Scheduler: Return Patched Pod Spec
    Scheduler->>Worker: Schedule & Start Pod

    Note over Worker, GCS: Phase 2: Direct Physical Connection
    Worker->>Worker: Read RAY_ADDRESS (Patched)
    Worker->>GCS: TCP Connect 192.168.0.100:6379
    Note right of Worker: Bypasses DNS & Kube-Proxy completely
    GCS-->>Worker: Connection Accepted
```

### 3.3 Identity Layer: Identity Mesh & Credential Projection

To address the **Identity Gap**, we implemented a **declarative credential injection and auto-refresh** mechanism.

* **Credential Projection Controller**: Packages Master's Token as a Secret and syncs it to the Client Cluster.
* **Token Auto-Refresh (Rotation)**: Designed a state machine that refreshes Tokens every **9 hours**, utilizing Kubelet's (v1.24+) file projection feature for **zero-downtime** rotation.

#### Technical Details: Cross-Cluster Identity Hot Rotation

This sequence diagram shows how the Controller silently updates credentials in the background, and how Workers perceive the changes.

```mermaid
sequenceDiagram
    autonumber
    participant Timer as Rotation Timer (9h)
    participant Controller as Identity Controller
    participant Master_API as Master API (Auth Provider)
    participant Client_API as Client API (Secret Store)
    participant Kubelet as Client Kubelet
    participant App as Worker Application

    Note over Timer, App: Steady State (Token Valid)

    Timer->>Controller: Trigger Rotation Event

    rect rgb(255, 245, 238)
        Note right of Controller: Step 1: Fetch New Credential
        Controller->>Master_API: Request Token (TokenRequest API)
        Master_API-->>Controller: Return JWT (Valid for 12h)
    end

    rect rgb(230, 255, 230)
        Note right of Controller: Step 2: Update Remote Secret
        Controller->>Client_API: Update Secret "ray-head-token"
        Client_API-->>Kubelet: Watch Event: Secret Modified
    end

    rect rgb(224, 255, 255)
        Note right of Kubelet: Step 3: File Projection (Zero Downtime)
        Kubelet->>Kubelet: Atomic Write /var/run/secrets/token
        App->>App: Periodic Re-read or File Watch
        Note right of App: App uses new token for next API call
    end
```

### 3.4 Governance Layer: Centralized Control

We adhered to the **"Control Flow Returns to Master"** design principle.

* **Billing Gatekeeper**: Forced Ray Autoscaler to call back to Master API to request resources, ensuring every scaling operation passes **Quota Check**, eliminating "Shadow IT".
* **Fault Domain Isolation**: Anchored the stateful GCS (Global Control Store) in the stable Master cluster. Even if underlying GPU nodes (Spot Instances) are massively reclaimed, the brain survives with self-healing capability.

---

## 4. Result (Outcomes & Impact)

This architecture was successfully deployed in production, supporting stable operation of large-scale heterogeneous compute clusters.

### 4.1 Quantitative Metrics

* **Capacity Scaling**: Achieved **25x capacity scaling**, breaking through single-cluster bottlenecks to regional-level resource pools.
* **Cost Optimization**: By seamlessly scheduling compute workloads to Spot instance pools, achieved **~40% TCO reduction**.
* **Operational Efficiency**: Automated telemetry and fault isolation mechanisms reduced **Mean Time to Detection (MTTD)** of "Zombie Workers" by **90%**.

### 4.2 Qualitative Value

* **Ultimate Compute-Storage Separation**: Truly achieved physical and logical decoupling of Control Plane and Data Plane.
* **Seamless User Experience**: Users continue using standard K8s API, completely unaware of the underlying cross-cluster complex topology.
* **Standardized Security Compliance**: Through unified Token rotation and least-privilege principles, solved long-standing static credential leakage risks.

---

## 5. Summary

This case proves that in the cloud-native era, **"distributed execution"** doesn't mean sacrificing **"centralized governance"**. Through **K8s on K8s** recursive design and **Mesh** technology's fine-grained traffic/identity control, we provided a universal architectural paradigm for large-scale AI compute infrastructure.
