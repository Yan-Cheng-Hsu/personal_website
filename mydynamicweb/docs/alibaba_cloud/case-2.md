# Master of Time: Kubernetes Node Time-Sharing Architecture Based on Virtual Kubelet

## Abstract

In High-Performance Computing (HPC) and AI training scenarios, balancing "high compute costs" with "non-full-time usage requirements" is a classic FinOps challenge. This article introduces a declarative time-window scheduling solution based on **Virtual Kubelet**. Through our self-developed **TimeWindow Controller**, we upgraded traditional operations scripts to a Kubernetes-native **Cron-driven state machine**, achieving dynamic "time-sharing" of GPU nodes, effectively solving state consistency issues under network partitions, and supporting complex multi-timezone scheduling strategies.

---

## 1. Situation (Context & Challenges)

With the large-scale deployment of high-end GPU nodes like A100/H100, we faced significant resource waste issues.

### 1.1 Business Pain Points: The Tidal Effect of Compute

* **High-Cost Idle Time**: Many R&D and training tasks only run during business hours (e.g., 9:00-18:00). Outside working hours, these expensive 8x GPU nodes sit idle, burning massive cloud computing budgets.
* **Rigid Reservations**: To ensure resources are available the next morning, teams often don't dare to release nodes, leading to severe mismatch between resource utilization and costs.

### 1.2 Technical Bottlenecks: Defects of Traditional Solutions

Early attempts using CronJob scripts or scheduled on/off solutions had serious **distributed system defects**:

1. **State Inconsistency**: If network partitions occur or scripts fail, nodes might get stuck in "should be off but isn't" or "should be on but isn't" intermediate states, with no auto-recovery mechanism.
2. **Lack of Declarative Semantics**: Unable to express "resource only available during specific time windows" through standard K8s API, preventing the scheduler from perceiving future resource changes.
3. **Incomplete Cleanup (Zombie Pods)**: When time windows close, residual Pods often can't terminate gracefully, leading to interrupted data writes or continued billing.

---

## 2. Task (Goals & Responsibilities)

As the infrastructure architect, my goal was to build an **automated, declarative, and robust** time-window scheduling system.

### 2.1 Core Design Goals

1. **K8s Native**: Abandon external scripts, use CRD or Annotations for standardized Kubernetes resource management.
2. **Self-Healing**: System must have a Reconciliation Loop to ensure node actual state always matches time rules.
3. **Precise Control**: Support Cron expression-level fine control (minute precision), with native multi-timezone support (UTC / Asia/Shanghai).

---

## 3. Action (Key Architecture & Technical Implementation)

We designed a solution centered on **TimeWindow Controller**, leveraging **Virtual Kubelet (VK)** flexibility to manipulate node state.

### 3.1 System Architecture: Cron-Driven State Machine

We embedded a lightweight controller in the Virtual Kubelet Provider that calculates expected node state in real-time based on Cron expressions.

```mermaid
graph TD
    classDef controller fill:#e3f2fd,stroke:#1565c0,stroke-width:2px;
    classDef nodeState fill:#fff3e0,stroke:#e65100,stroke-width:2px;

    subgraph "Control Plane"
        User[User Config] -->|1. Update ConfigMap| TW_Controller
    end

    subgraph "TimeWindow Controller (Inside VK)"
        TW_Controller[Reconciliation Loop]
        Cron_Engine[Cron Engine<br>github.com/robfig/cron]

        TW_Controller -->|2. Watch Rules| Cron_Engine
        Cron_Engine -->|3. Evaluate Time| Logic{In Window?}
    end

    subgraph "Node Status Management"
        Logic -->|Yes| ReadyState[Node Ready<br>Schedulable]
        Logic -->|No| NotReadyState[Node NotReady<br>Unschedulable + Evict]
    end

    ReadyState -->|4. Update Node Status| K8s_API[K8s API Server]
    NotReadyState -->|4. Update Node Status| K8s_API

    K8s_API -.->|5. Watch Events| TW_Controller
    note[Self-Healing: <br>If Node is manually modified,<br>Controller reverts it instantly.]
    TW_Controller -.-> note

    class TW_Controller,Cron_Engine controller;
    class ReadyState,NotReadyState nodeState;
```

### 3.2 Key Decision: Why Manipulate Node Ready Instead of Taint?

During technical selection, we evaluated two approaches: using `Taint/Toleration` to repel Pods, or directly manipulating `Node Condition`. We chose the latter.

* **Comparison**:
  * **Taint**: While it blocks scheduling, K8s scheduler still considers the node "healthy". This causes Cluster Autoscaler to misjudge total resources, and requires additional logic to evict existing Pods.
  * **Node Ready/NotReady (Status)**: This is K8s's most fundamental availability signal.
    * **Native Affinity**: When a node is NotReady, Service LoadBalancer automatically removes the backend, and Deployments auto-trigger rescheduling.
    * **Semantic Accuracy**: Clearly tells users "this node is currently unavailable", matching `kubectl get nodes` intuitive experience.

### 3.3 Implementation Details: Lifecycle Management & Self-Healing

We defined strict state transition flows to ensure zero business impact and automatic anomaly recovery.

#### Time Window Transition Flow (Lifecycle Transition)

This sequence diagram shows how the controller coordinates with K8s API Server for state transitions and Pod eviction when time reaches window boundaries.

```mermaid
sequenceDiagram
    autonumber
    participant Cron as Cron Engine
    participant Controller as TW Controller
    participant K8s as K8s API Server
    participant Pod as User Workload

    Note over Cron, Pod: Scenario: Window Closes (18:00)

    Cron->>Controller: Trigger: Window End Event

    rect rgb(255, 240, 240)
        Note right of Controller: Step 1: Mark Node NotReady
        Controller->>K8s: Patch Node Condition (Ready=False)
        K8s-->>Controller: Node Status Updated
    end

    rect rgb(255, 250, 240)
        Note right of Controller: Step 2: Cordon Node
        Controller->>K8s: Cordon Node (Unschedulable)
    end

    rect rgb(240, 248, 255)
        Note right of Controller: Step 3: Evict Pods
        Controller->>K8s: List Pods on Node
        loop For each Pod
            Controller->>K8s: Evict Pod (Graceful Shutdown)
            K8s->>Pod: SIGTERM
            Pod-->>K8s: Terminated
        end
    end

    Note right of Controller: Node is now safe & idle
```

#### Self-Healing Logic

This diagram shows how even with manual interference or network partitions, the controller forcibly restores state consistency.

```mermaid
sequenceDiagram
    autonumber
    participant Admin as Human Operator
    participant K8s as K8s API Server
    participant Controller as TW Controller

    Note over Admin, Controller: Scenario: Manual Interference outside Window

    Admin->>K8s: kubectl uncordon node-x (Mistake!)
    K8s-->>Admin: Node uncordoned

    K8s->>Controller: Watch Event: Node Updated

    Controller->>Controller: Evaluate Rules
    Note right of Controller: Current Time is 20:00 (Outside Window)
    Note right of Controller: Expected: NotReady/Cordoned
    Note right of Controller: Actual: Ready/Uncordoned

    rect rgb(255, 230, 230)
        Note right of Controller: Correction Action
        Controller->>K8s: Patch Node Condition (Ready=False)
        Controller->>K8s: Cordon Node
    end

    Note right of Controller: Consistency Restored
```

### 3.4 Advanced Features: Multi-Timezone & Dynamic Reload

* **Multi-Timezone Support**: Maintain independent `cron.Cron` instances for each timezone. Critical for cross-national teams (e.g., one team in Silicon Valley, one in Shanghai, sharing the same cluster architecture).
* **Hot Reload**: Controller watches ConfigMap changes. When time window rules are modified, no VK process restart needed - controller automatically `Stops` old Cron tasks and `Adds` new ones for zero-downtime configuration changes.

---

## 4. Result (Outcomes & Impact)

This solution has been deployed at scale in production, managing thousands of virtual nodes with significant operational and cost benefits.

### 4.1 Quantitative Metrics

* **Cost Savings**: For "9-to-6" R&D clusters, resource runtime reduced from 24h to 9h, **compute costs reduced by ~62.5%**.
* **Operational Efficiency**: Eliminated manual on/off operational burden, node state anomaly tickets dropped to zero (thanks to controller's self-healing mechanism).

### 4.2 Architectural Value

* **FinOps Implementation**: Provided a technical means to enforce budget control policies, strictly aligning resource usage with business value production time.
* **Standardized Abstraction**: Through Virtual Kubelet, shielded differences in underlying resources (could be ECS, bare metal, or Serverless instances), providing unified "temporal elasticity" semantics to upper layers.

---

## 5. Summary

This case demonstrates how to use **Kubernetes Controller patterns** to solve state consistency issues that traditional operations scripts couldn't handle. By defining time windows as code (Configuration as Code) and leveraging Virtual Kubelet's flexibility, we successfully built a cloud-native scheduling system with **"time-sharing"** capability, providing a standard paradigm for enterprise AI infrastructure cost optimization.
