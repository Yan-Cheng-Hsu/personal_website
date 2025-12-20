export interface ContentBlock {
  type: 'text' | 'mermaid' | 'code' | 'table'
  content: string
  language?: string
}

export interface DeepDiveArticle {
  id: string
  title: string
  titleZh: string
  subtitle: string
  description: string
  tags: string[]
  readTime: string
  category: 'alibaba' | 'amazon' | 'web'
  content: ContentBlock[]
}

export const deepDiveArticles: DeepDiveArticle[] = [
  {
    id: 'k8s-on-k8s-architecture',
    title: 'K8s on K8s: Recursive Virtualization Architecture',
    titleZh: 'K8s on K8s 遞歸虛擬化架構',
    subtitle: 'Staff+ Level Architecture Design for Ray Distributed Training',
    description: 'A two-layer virtualization architecture achieving extreme disaggregation of compute and storage for AI SaaS platforms.',
    tags: ['Architecture', 'Kubernetes', 'Virtual Kubelet', 'Distributed Systems', 'Ray'],
    readTime: '12 min',
    category: 'alibaba',
    content: [
      {
        type: 'text',
        content: `## Executive Summary

When building large-scale AI SaaS platforms, traditional single-cluster architectures struggle to simultaneously meet the demands of **multi-tenant isolation**, **heterogeneous resource elasticity**, and **cost optimization**.

This article introduces a **K8s on K8s recursive architecture** based on Virtual Kubelet (VK), achieving extreme **Disaggregated Compute and Storage**:

- **Control Plane**: Converged on CPU-intensive Master Cluster, handling billing, CRD state management, and global scheduling
- **Data Plane**: Distributed across multiple GPU-intensive Client Clusters, serving as pure elastic resource pools

Through our self-developed **Identity & Network Mesh**, we solved the "network split-brain" and "identity gap" issues across Kubernetes domains within the same VPC.`
      },
      {
        type: 'mermaid',
        content: `graph TD
    classDef unifiedVK fill:#2d2d5a,stroke:#7c7cff,stroke-width:3px,stroke-dasharray: 5 5,color:#fff
    classDef masterLayer fill:#1a3a5c,stroke:#4a9eff,stroke-width:2px,color:#fff
    classDef clientLayer fill:#4a2c1a,stroke:#ff9966,stroke-width:2px,color:#fff

    subgraph VKMesh["Unified Virtualization Plane (The VK Mesh)"]
        VK_Logic[VK Logic: Schedule & Inject]
    end

    subgraph L2["L2: SaaS Master (The Brain)"]
        API_Master[Master API Server]
        Ray_Head[Ray Head / Job Controller]
        ILB((Internal CLB<br/>VPC IP: 192.168.x.x))
        VNode_L2[Virtual Node<br/>Target: GPU Pool]
        Ray_Head -.->|Expose| ILB
    end

    subgraph L3["L3: SaaS Client (The Muscle)"]
        Worker_Pod[Ray Worker Pod<br/>GPU Node]
    end

    Ray_Head -->|Scale Out| API_Master
    API_Master -->|Schedule| VNode_L2
    VNode_L2 ==>|Recursive Sync| VK_Logic
    VK_Logic ==>|Dispatch & Inject| Worker_Pod

    Worker_Pod ==>|Network: Traffic via CLB| ILB
    Worker_Pod -.->|Identity: Auth via Token| API_Master

    class VK_Logic unifiedVK
    class API_Master,Ray_Head,ILB,VNode_L2 masterLayer
    class Worker_Pod clientLayer`
      },
      {
        type: 'text',
        content: `## Architecture Philosophy: Recursive Abstraction

We don't view the system as simple "frontend-backend connections", but adopt a **Recursive** virtualization pattern. Virtual Kubelet here is not just a node simulator, but a **Unified Scheduling Layer**.

### System Layering

**L1 Virtualization (User Space → SaaS Control)**:
- Users submit tasks on ACK Frontend
- VK Layer 1 disguises SaaS Master as an infinitely large virtual node
- Users are unaware of backend complexity

**L2 Virtualization (SaaS Control → Resource Pool)**:
- SaaS Master (Brain) receives tasks, parses CRDs
- VK Layer 2 abstracts multiple Client GPU Clusters (Muscle) into a unified resource pool`
      },
      {
        type: 'text',
        content: `## Architectural Decision Records

In L2 virtualization (Master → Client), we made two critical design choices that define the system's reliability and consistency.

### Decision 1: Why Force Internal CLB Over K8s ClusterIP?

Even though Master and Client clusters are in the **same VPC** with Layer 3 connectivity, we still chose to introduce **Internal CLB** as the only cross-cluster communication bridge.`
      },
      {
        type: 'table',
        content: `| Problem | Root Cause | Solution |
|---------|------------|----------|
| ClusterIP Unreachable | K8s ClusterIP is just iptables rules on nodes. Client nodes don't have Master's rules. | Use Internal CLB for VPC-native real IP |
| VPC Routing Drop | VPC router doesn't know K8s overlay network segments | CLB provides physical network anchor point |
| DNS Split-Brain | Client CoreDNS can't resolve Master domains | Network Injector replaces DNS with CLB IP |`
      },
      {
        type: 'text',
        content: `**The Solution**:
- We use Internal CLB to provide a **VPC Native** real IP (e.g., \`192.168.0.100\`)
- **Network Injector** intercepts Pod Spec at startup, forcibly replacing \`ray-head-svc\` domain with CLB IP

**Benefits**:
- Completely decoupled from CoreDNS and Overlay network dependencies
- Leverages cloud vendor's underlying hardware load balancing for higher throughput and stability than kube-proxy

### Decision 2: Why Insist on Control Flow Returning to Master API?

Even though VK technology allows us to migrate Ray Head to Client Cluster, we **mandate** all control flows (Autoscaling requests, status reports) must **hit Master API**.`
      },
      {
        type: 'table',
        content: `| Reason | Explanation |
|--------|-------------|
| Billing Gatekeeper | If scaling happens directly in Client Cluster, SaaS billing system won't detect resource changes → "Shadow IT" problem |
| Single Source of Truth | Users view CRD status in Master Cluster. If Head acts independently in Client, Master state becomes stale or broken |
| Fault Domain Isolation | Client Clusters often use Spot Instances (cost optimization), less stable. Master uses On-Demand. Anchoring control logic on Master ensures self-healing capability |`
      },
      {
        type: 'text',
        content: `## Runtime Sequence

The complete lifecycle from user task submission to cross-cluster resource coordination:`
      },
      {
        type: 'mermaid',
        content: `sequenceDiagram
    autonumber
    participant Frontend as ACK Frontend (L1)
    participant VK as Unified VK Mesh
    participant Master as SaaS Master (L2)
    participant CLB as Internal CLB
    participant Worker as Client GPU Pod (L3)

    Note over Frontend, Master: Phase 1: Ingestion (K8s on K8s)
    Frontend->>VK: User Submit Job (Virtual Node)
    VK->>Master: Create Ray Head (Real Pod)
    Master->>CLB: Bind Head to VPC IP (192.168.0.100)

    Note over Master, Worker: Phase 2: Pooling (K8s on K8s)
    Master->>VK: Ray Autoscaler requests GPU

    rect rgb(40, 44, 52)
        Note right of VK: Mesh Injection Logic
        VK->>VK: 1. Intercept Pod Spec
        VK->>VK: 2. Resolve CLB IP (Bypass DNS)
        VK->>VK: 3. Project Master Token (Identity Mesh)
    end

    VK->>Worker: Dispatch Pod to Client Cluster

    Note over Worker, Master: Phase 3: The Unified Link
    Worker->>CLB: Connect GCS via Physical IP
    CLB->>Master: Forward Traffic (NAT)

    Worker->>Master: Auth via Injected Token
    Master-->>Worker: 200 OK (Quota Checked & Billed)

    Note right of Worker: Physically separated, logically unified`
      },
      {
        type: 'text',
        content: `## Conclusion

This architecture successfully bridges the gap between Kubernetes logical networks and VPC physical networks through **Identity & Network Mesh** technology.

We proved that in **highly pooled resource** scenarios, **Centralized Control** and **Distributed Execution** are not contradictory. By establishing physical pathways through **Internal CLB** and utilizing the **K8s on K8s** recursive scheduling model, we built an AI infrastructure that possesses both public cloud-level elasticity and private cluster-level controllability.

**Key Achievements**:
- Massive-scale GPU fleet managed as unified pool
- 40% cost reduction through TimeWindow scheduling
- Zero-downtime credential rotation
- Self-healing capability with fault domain isolation`
      }
    ]
  },
  {
    id: 'cross-cluster-identity',
    title: 'Cross-Cluster Identity Management',
    titleZh: '跨集群身份管理',
    subtitle: 'Federated Identity Mesh for Virtual Kubelet',
    description: 'How to let Pods on Virtual Kubelet securely access remote API Server with zero-restart credential rotation.',
    tags: ['Kubernetes', 'Security', 'Multi-Cluster', 'Virtual Kubelet'],
    readTime: '15 min',
    category: 'alibaba',
    content: [
      {
        type: 'text',
        content: `## The Problem

In multi-cluster architectures, how can Pods running on an Execution Cluster securely and continuously access the Kubernetes API of a Control Cluster?

When users schedule workloads to remote execution clusters via Virtual Kubelet (VK), a common requirement is: **Pods need to call the Control Cluster's Kubernetes API**. Typical scenarios include:

- **Ray Autoscaler**: Head Pods running in the execution cluster need to create/delete Worker Pods
- **Custom Operators**: Monitor Control Cluster CRDs and deploy resources in Execution Cluster
- **Logging/Monitoring Agents**: Report metrics to Control Cluster's Prometheus

However, the default ServiceAccount is only valid for the execution cluster, and the execution cluster typically cannot resolve the Control Cluster's Service domain names (like \`kubernetes.default.svc\`).`
      },
      {
        type: 'mermaid',
        content: `graph TD
    A["Control Cluster<br/>(User Submits Workload)"] -->|Create Pod| B[Virtual Kubelet Provider]

    B --> C{"Requires Remote API Access?<br/>e.g., labeled 'cross-cluster-api'"}
    C -->|Yes| D[Cross-Cluster Credential Injector]
    C -->|No| E[Standard VK Logic]

    subgraph Injector["Cross-Cluster Credential Injector"]
        D --> F[Sync ServiceAccount to Execution Cluster]
        F --> G["Create/Reuse Opaque Secret<br/>(sa-name-token)"]
        G --> H["Inject KUBERNETES_* ENVs<br/>(only if missing)"]
        H --> I[Mount Secret to Standard Path]

        D --> J{"Distributed Framework?<br/>e.g., has 'framework: ray' label"}
        J -->|Yes| K[Fetch Head Service LB IP]
        K --> L["Replace Service Domain with LB IP<br/>in Args/Env/Commands"]
    end

    B --> M["Execution Cluster<br/>(Pod Runs Here)"]
    M --> N[Pod Uses Token to Call Control Cluster API]

    O[Token Refresh Controller] -->|Every 9h| P[List Managed Secrets]
    P --> Q[Generate New Token from Control Cluster]
    Q --> R[Update Secret.data.token]
    R --> S["kubelet Auto-Updates File in Container (v1.24+)"]

    T[Delete Pod] --> U{Last Pod in Namespace?}
    U -->|Yes| V[Delete Secret & ServiceAccount]
    U -->|No| W[Keep for Sharing]

    style A fill:#1a3a5c,color:#fff
    style B fill:#4a2c1a,color:#fff
    style D fill:#3d2d4a,color:#fff
    style M fill:#1a4a3a,color:#fff
    style O fill:#4a2a2a,color:#fff`
      },
      {
        type: 'text',
        content: `## Credential Injection Mechanism

### ServiceAccount Synchronization

- Create same-name ServiceAccount in execution cluster
- Reuse original imagePullSecrets and key metadata
- Add management label: \`managed-by: vk-provider\`

### Token Secret Management

- **Type**: Opaque
- **Naming**: \`<service-account-name>-token\` (supports multi-Pod sharing)
- **Content**:`
      },
      {
        type: 'code',
        language: 'yaml',
        content: `data:
  token: <base64-encoded-jwt>        # From Control Cluster SA Token API
  ca.crt: <control-cluster-ca>       # From kube-root-ca.crt ConfigMap
  namespace: <base64-namespace>`
      },
      {
        type: 'text',
        content: `- **Mount path**: \`/var/run/secrets/kubernetes.io/serviceaccount\` (standard path)

### Environment Variable Injection (Conservative Strategy)

- Only inject when Pod hasn't set \`KUBERNETES_SERVICE_HOST\` or \`KUBERNETES_SERVICE_PORT_HTTPS\`
- Values from pre-loaded Control Cluster endpoint (avoid real-time query latency)
- Disable default mount: \`automountServiceAccountToken: false\`

**Result**: client-go default behavior seamlessly connects to remote API without code modification.

## Automatic Token Refresh

To avoid 12-hour token expiration, we implement a dedicated controller:`
      },
      {
        type: 'mermaid',
        content: `stateDiagram-v2
    [*] --> Idle
    Idle --> Scanning: Timer (9h)
    Scanning --> Processing: Found managed secrets
    Processing --> Updating: For each secret
    Updating --> Success: Token refreshed
    Updating --> Retry: API error (exponential backoff)
    Success --> Idle
    Retry --> Updating`
      },
      {
        type: 'table',
        content: `| Feature | Description |
|---------|-------------|
| Cycle | Scan every 9 hours (3-hour buffer) |
| Async Queue | Use \`workqueue.RateLimitingInterface\` for retry support |
| Transparent Update | Relies on Kubernetes v1.24+ Secret file auto-update mechanism |
| Tenant Isolation | Each controller instance only handles resources with specific \`tenant-id\` |`
      },
      {
        type: 'text',
        content: `## Ray Framework Optimization

Ray is a typical scenario requiring cross-cluster communication:

- **Head Pod**: Runs Autoscaler, needs to call Control Cluster API
- **Worker Pod**: Needs to connect to Head Pod's GCS service

### DNS Unreachability Problem

Execution cluster cannot resolve \`ray-head-svc.namespace.svc.cluster.local\`.

### LoadBalancer IP Replacement

If Head Service type is LoadBalancer, extract its IP and replace Service domain names in args, command, and env with the LB IP.

**Before**:`
      },
      {
        type: 'code',
        language: 'yaml',
        content: `env:
  - name: RAY_ADDRESS
    value: ray-head-svc.ray-ns.svc.cluster.local:6379`
      },
      {
        type: 'text',
        content: `**After**:`
      },
      {
        type: 'code',
        language: 'yaml',
        content: `env:
  - name: RAY_ADDRESS
    value: 203.0.113.42:6379`
      },
      {
        type: 'text',
        content: `## Security & Limitations`
      },
      {
        type: 'table',
        content: `| Security Measure | Description |
|-----------------|-------------|
| Tenant Isolation | Independent VK instance per tenant + Label Selector filtering |
| Minimal Privilege | Token validity fixed at 12 hours |
| Compatibility | Only supports Kubernetes v1.24+ (Secret auto-update); apps must not cache token file |`
      },
      {
        type: 'text',
        content: `**Summary**: This solution solves cross-cluster identity challenges through standard Kubernetes primitives (SA, Secret, ENV), running stably in production. Core logic is reusable for any VK or multi-cluster scenario.`
      }
    ]
  },
  {
    id: 'cross-cluster-storage',
    title: 'Cross-Cluster Storage Scheduling',
    titleZh: '跨集群存储调度',
    subtitle: 'Mock PV Architecture for Virtual Kubelet',
    description: 'Enabling cloud disk PVC support across clusters with a two-phase provisioning mechanism.',
    tags: ['Kubernetes', 'Storage', 'CSI', 'Virtual Kubelet'],
    readTime: '12 min',
    category: 'alibaba',
    content: [
      {
        type: 'text',
        content: `## The Problem

In multi-cluster architectures, users often submit Pods and PersistentVolumeClaims (PVCs) in the Control Cluster, while actual workloads run in the Execution Cluster.

The Kubernetes scheduler has a hard requirement:

> **Pods are only allowed to be scheduled when all PVCs are in Bound state.**

The problem: No real PV exists in the Control Cluster, so PVC cannot bind → scheduling fails.

### Traditional Solution Problems`
      },
      {
        type: 'table',
        content: `| Problem Type | Description |
|-------------|-------------|
| Resource Waste | Pre-provision disks even if Pod not scheduled |
| Operational Complexity | Manual cross-cluster PV/PVC lifecycle management |
| No Dynamic Parameters | Cannot dynamically select disk type based on Pod needs |`
      },
      {
        type: 'text',
        content: `## Overall Architecture

The core idea is **"Two-Phase Provisioning"**:

- **Phase One (Control Plane)**: Create a Mock PV to make PVC Bound in Control Cluster, passing scheduler check
- **Phase Two (Execution Plane)**: Create real PVC/PV in Execution Cluster, provisioned by CSI Driver`
      },
      {
        type: 'mermaid',
        content: `graph TD
    A["User Cluster<br/>(Control Plane)"] -->|Create Pod + PVC| B[Virtual Kubelet Provider]

    B --> C{"Is Virtual Disk PVC?<br/>storageClass: virtual-disk-*"}
    C -->|Yes| D[StorageClass Auto-Creation]
    D --> E[Create Mock PV]
    E --> F[PVC Bound → Allow Scheduling]

    B --> G["Execution Cluster<br/>(Workload Runs Here)"]
    F --> H[Submit Pod to Execution Cluster]
    H --> I["Transform StorageClass<br/>virtual-disk-* → real-disk-*"]
    I --> J[Create Real PVC]
    J --> K[CSI Driver Supplies Cloud Disk]
    K --> L[Create Real PV]
    L --> M[Pod Mounts Disk Successfully]

    N[Status Sync Controller] -->|Watch Real PV| O[Update Mock PV Status]
    O --> P["User Sees PVC as 'Bound'"]

    style A fill:#1a3a5c,color:#fff
    style B fill:#4a2c1a,color:#fff
    style G fill:#1a4a3a,color:#fff
    style N fill:#4a2a2a,color:#fff`
      },
      {
        type: 'text',
        content: `## Mock PV Mechanism

To bypass scheduler's PVC binding check, we create a **Mock PV** in the User Cluster:`
      },
      {
        type: 'code',
        language: 'yaml',
        content: `apiVersion: v1
kind: PersistentVolume
metadata:
  name: user-pvc-mock-a1b2c3
  annotations:
    mock-pv: "true"
    source-pvc: "default/user-pvc"
spec:
  capacity:
    storage: 30Gi
  accessModes: [ReadWriteOnce]
  claimRef:
    namespace: default
    name: user-pvc
  persistentVolumeReclaimPolicy: Delete
  storageClassName: virtual-disk-essd-pl1
  volumeMode: Filesystem
  persistentVolumeSource:
    csi:
      driver: mock.csi.example.com  # Special driver, doesn't mount
      volumeHandle: user-pvc-mock-a1b2c3
      volumeAttributes:
        mock: "true"`
      },
      {
        type: 'table',
        content: `| Feature | Description |
|---------|-------------|
| Special CSI Driver | \`mock.csi.example.com\` only for identification, performs no operations |
| Annotation Marking | \`mock-pv: "true"\` prevents misuse or cleanup |
| Status Placeholder | Makes PVC status become Bound, passing scheduler check |`
      },
      {
        type: 'text',
        content: `**Result**: Scheduler believes storage is ready, allows Pod scheduling to VK node.

## Two-Phase Provisioning Flow

### Phase One: Control Plane (User Cluster)

1. User creates PVC with \`storageClassName: virtual-disk-essd-pl1\`
2. Controller detects virtual SC prefix, auto-creates corresponding StorageClass (if not exists)
3. Creates Mock PV, binds PVC → \`kubectl get pvc\` shows Bound

### Phase Two: Execution Plane (Execution Cluster)

1. VK Provider submits Pod to execution cluster
2. StorageClass mapping: \`virtual-disk-essd-pl1\` → \`real-disk-essd-pl1\`
3. Creates real PVC, triggers CSI Driver to provision cloud disk
4. CSI creates real PV and binds
5. Pod successfully mounts disk

## Lifecycle Management`
      },
      {
        type: 'mermaid',
        content: `flowchart TD
    A["Create PVC<br/>storageClass: virtual-disk-*"] --> B{SC Exists?}
    B -- No --> C[Auto-create SC]
    C --> D[Create Mock PV]
    B -- Yes --> D
    D --> E[PVC Bound]
    E --> F[Create Pod]
    F --> G["Map SC → real-disk-*"]
    G --> H[Create Real PVC in Execution Cluster]
    H --> I[CSI Supplies Disk]
    I --> J[Pod Mounts Successfully]`
      },
      {
        type: 'text',
        content: `## Compatibility & Limitations

**Fully compatible with Kubernetes native syntax**:`
      },
      {
        type: 'code',
        language: 'yaml',
        content: `volumes:
  - name: data
    persistentVolumeClaim:
      claimName: my-pvc  # No modification needed`
      },
      {
        type: 'text',
        content: `**Limitations**:
- Only supports \`volumeBindingMode: WaitForFirstConsumer\`
- Doesn't support \`reclaimPolicy: Retain\` (prevents resource leaks)
- Volume expansion not supported (can be extended later)

## Summary & Benefits`
      },
      {
        type: 'table',
        content: `| Capability | Description |
|-----------|-------------|
| User Transparency | Uses native PVC/Pod syntax, no new API to learn |
| Scheduler Compatible | Mock PV tricks scheduler, seamless integration |
| Resource Efficient | On-demand provisioning, no pre-creation waste |
| Security Isolation | Tenant-level resource isolation |
| Auto Cleanup | Cascading deletion ensures no disk residue |`
      }
    ]
  },
  {
    id: 'time-window-scheduling',
    title: 'Time-Window Node Scheduling',
    titleZh: '时间窗口弹性调度',
    subtitle: 'Cron-based Resource Time-sharing',
    description: 'Making expensive GPU nodes available only during specified time windows with automatic pod eviction.',
    tags: ['Kubernetes', 'Scheduling', 'Cost Optimization', 'Virtual Kubelet'],
    readTime: '10 min',
    category: 'alibaba',
    content: [
      {
        type: 'text',
        content: `## The Problem

How to make expensive computing resources (like GPU nodes) available only during specified time periods?

In AI training and big data analysis scenarios, high-performance nodes (like 8x A100) are expensive but often only used during specific periods (like weekdays 9:00-18:00). If nodes stay online continuously, it causes significant waste.

Traditional solutions (like scheduled start/stop) have these problems:`
      },
      {
        type: 'table',
        content: `| Problem Type | Description |
|-------------|-------------|
| State Inconsistency | Network partitions may cause abnormal node states |
| Lack of Declarative Management | Cannot express "resource only available 9:00-18:00" via standard API |
| Incomplete Pod Cleanup | Tasks may still run outside time windows |`
      },
      {
        type: 'text',
        content: `## Overall Architecture

The core is a **TimeWindow Controller** that drives node state via Cron expressions:`
      },
      {
        type: 'mermaid',
        content: `graph TD
    A[User Cluster] -->|Submit Workload| B[Virtual Kubelet Provider]

    B --> C{"Time-Based Mode?<br/>Config contains time windows?"}
    C -->|Yes| D[TimeWindow Controller]
    C -->|No| E[Standard VK Logic]

    subgraph TWController["TimeWindow Controller"]
        D --> F[Watch ConfigMap for Time Rules]
        F --> G[Manage Node Ready/NotReady Status]
        G --> H[Evict Pods when NotReady]
        D --> I[Maintain Cron Annotations on Node]
        D --> J[Multi-Timezone Scheduler]
        J --> K[github.com/robfig/cron/v3]
    end

    B --> L{"Current Time in Any Window?<br/>[start, end) - head-inclusive, tail-exclusive"}
    L -->|Yes| M["Node = Ready<br/>Allow Scheduling"]
    L -->|No| N["Node = NotReady<br/>Block Scheduling + Evict Pods"]

    O[External System] --> P["Update ConfigMap<br/>(e.g., change window to 10:00-19:00)"]
    P --> Q["Dynamic Reconfiguration<br/>(Zero Restart)"]
    Q --> B

    style A fill:#1a3a5c,color:#fff
    style B fill:#4a2c1a,color:#fff
    style D fill:#3d2d4a,color:#fff
    style M fill:#1a4a3a,color:#fff
    style N fill:#4a2a2a,color:#fff`
      },
      {
        type: 'text',
        content: `## Time Window Definition

**Format**: Standard Unix Cron expression`
      },
      {
        type: 'code',
        language: 'yaml',
        content: `timeWindows:
  - start: "0 9 * * 1-5"   # Mon-Fri 09:00 UTC
    end:   "0 18 * * 1-5"  # Mon-Fri 18:00 UTC
    timezone: "UTC"
  - start: "0 22 * * 1-5"
    end:   "0 6 * * 2-6"
    timezone: "Asia/Shanghai"`
      },
      {
        type: 'text',
        content: `- **Semantics**: Half-open interval \`[start, end)\` (head-inclusive, tail-exclusive)
- **Multiple Windows**: Node is Ready as long as current time falls within any window

## Node State Management

We abandon Taint/Toleration for more intuitive **Node Ready/NotReady state**:

### State Transition Order

**NotReady → Ready**:
1. Uncordon (allow new Pod scheduling)
2. Set \`Node.Status.Conditions[Ready] = True\`

**Ready → NotReady**:
1. Cordon (block new Pod scheduling)
2. Set \`Node.Status.Conditions[Ready] = False\`
3. Evict non-system namespace Pods

**Advantage**: \`kubectl get nodes\` directly reflects availability, matching user mental model.

## Controller Implementation Details

### Multi-Timezone Scheduler

Create independent Cron scheduler per timezone:`
      },
      {
        type: 'code',
        language: 'go',
        content: `schedulerByTZ := map[string]*cron.Cron{}
for _, rule := range timeWindows {
    loc, _ := time.LoadLocation(rule.TimeZone)
    if schedulerByTZ[rule.TimeZone] == nil {
        schedulerByTZ[rule.TimeZone] = cron.New(cron.WithLocation(loc))
    }
    // Register start/end callbacks
}`
      },
      {
        type: 'text',
        content: `### State Protection Mechanism

- Monitor Node state change events
- If not in time window but node set to Ready → auto force rollback to NotReady
- If in window, allow normal user operations (like manual cordon during maintenance)

### Dynamic Configuration Hot Reload

- Inject time policies via ConfigMap
- Controller watches changes, takes effect without restart
- Triggers \`rebuildCronEntries()\` to rebuild all schedule entries

## Node Annotations & Observability

Controller automatically labels for downstream system identification:`
      },
      {
        type: 'code',
        language: 'yaml',
        content: `apiVersion: v1
kind: Node
metadata:
  annotations:
    scheduling.example.com/is-time-window-node: "true"
    scheduling.example.com/time-window-0: "0 9 * * 1-5, 0 18 * * 1-5, UTC"
    scheduling.example.com/time-window-1: "0 22 * * 1-5, 0 6 * * 2-6, Asia/Shanghai"`
      },
      {
        type: 'text',
        content: `Also exposes Prometheus metrics:
- \`time_window_node_status{node="..."}\` → 1=Active, 0=Inactive
- \`time_window_next_event_timestamp{node="...", type="start|end"}\`

## Security & Limitations`
      },
      {
        type: 'table',
        content: `| Security Measure | Description |
|-----------------|-------------|
| Tenant Isolation | Independent VK instance per tenant |
| Minimal Privilege | Controller only operates nodes with \`tenant-id\` label |
| Compatibility | Only supports Kubernetes v1.16+; all nodes must use UTC time sync |`
      },
      {
        type: 'text',
        content: `**Summary**: This solution implements declarative time-window scheduling through Kubernetes native capabilities, managing thousands of virtual nodes in production. Core logic is reusable for any VK or elastic scheduling scenario.`
      }
    ]
  },
  // ==================== AMAZON ARTICLES ====================
  {
    id: 'platform-leviathan-overview',
    title: 'Platform Leviathan: Self-Healing GPU Infrastructure',
    titleZh: 'Platform Leviathan：自愈式 GPU 基礎設施',
    subtitle: 'Building Autonomous AIOps for Massive-Scale AI Training',
    description: 'How we built a self-healing infrastructure that automatically detects, diagnoses, and remediates GPU failures, reducing MTTR by ~90%.',
    tags: ['AIOps', 'Airflow', 'Kubernetes', 'GPU Infrastructure', 'Self-Healing'],
    readTime: '10 min',
    category: 'amazon',
    content: [
      {
        type: 'text',
        content: `## The Challenge

When you're running a massive GPU fleet for training foundation models like Amazon Nova, **every minute of downtime costs real money**. GPUs sitting idle don't just waste electricity—they delay science.

The problem we faced:
- **Manual troubleshooting** took ~10 hours per incident
- **No visibility** into which specific GPU was failing
- **Circular dependencies** in termination workflows caused cascading failures
- **Reactive firefighting** instead of proactive prevention`
      },
      {
        type: 'mermaid',
        content: `graph LR
    subgraph Problem["The Problem: Manual Firefighting"]
        A[GPU Failure] --> B[Alert Fires]
        B --> C[Engineer Wakes Up]
        C --> D[Manual SSH & Debug]
        D --> E[10+ Hours Later...]
        E --> F[Maybe Fixed?]
    end

    subgraph Solution["The Solution: Self-Healing"]
        G[GPU Failure] --> H[Auto-Detection]
        H --> I[Automated Diagnosis]
        I --> J[Auto-Remediation]
        J --> K[~1 Hour Total]
    end

    style A fill:#4a2a2a,color:#fff
    style F fill:#4a2a2a,color:#fff
    style G fill:#1a4a3a,color:#fff
    style K fill:#1a4a3a,color:#fff`
      },
      {
        type: 'text',
        content: `## Architecture: The Leviathan Pipeline

Platform Leviathan is built on three pillars:

### 1. Continuous Health Monitoring
We instrumented every GPU node with DCGM (Data Center GPU Manager) exporters, streaming metrics to Prometheus. Custom Airflow DAGs run periodic health checks across the entire fleet.

### 2. Intelligent Fault Isolation
When anomalies are detected, our "Divide-and-Conquer" algorithm systematically isolates the faulty component—down to the specific GPU serial number.

### 3. Automated Remediation
Once identified, the system automatically:
- Cordons the node (prevents new workloads)
- Gracefully drains running jobs
- Attempts DCGM reset
- If reset fails, marks for hardware replacement`
      },
      {
        type: 'mermaid',
        content: `flowchart TD
    subgraph Monitor["1. Continuous Monitoring"]
        DCGM[DCGM Exporter] --> Prom[Prometheus]
        Prom --> Alert[AlertManager]
        DAG[Airflow Health DAG] --> Check[Periodic Checks]
    end

    subgraph Detect["2. Fault Detection"]
        Alert --> Classify{Classify Fault}
        Check --> Classify
        Classify -->|GPU Error| GPU_Fault[GPU Fault Handler]
        Classify -->|Network| Net_Fault[Network Handler]
        Classify -->|Memory| Mem_Fault[Memory Handler]
    end

    subgraph Remediate["3. Auto-Remediation"]
        GPU_Fault --> Cordon[Cordon Node]
        Cordon --> Drain[Drain Workloads]
        Drain --> Reset{DCGM Reset}
        Reset -->|Success| Uncordon[Uncordon & Resume]
        Reset -->|Fail| Blocklist[Add to Blocklist]
        Blocklist --> Ticket[Auto-Create HW Ticket]
    end

    style DCGM fill:#1a3a5c,color:#fff
    style Prom fill:#1a3a5c,color:#fff
    style Classify fill:#4a2c1a,color:#fff
    style Uncordon fill:#1a4a3a,color:#fff
    style Blocklist fill:#4a2a2a,color:#fff`
      },
      {
        type: 'text',
        content: `## Key Engineering Decisions

### Why Airflow for Orchestration?

We evaluated several options:`
      },
      {
        type: 'table',
        content: `| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Kubernetes CronJobs | Native K8s, simple | No DAG dependencies, poor visibility | ❌ |
| AWS Step Functions | Managed, scalable | Vendor lock-in, limited debugging | ❌ |
| Apache Airflow | DAG support, great UI, mature | Self-hosted complexity | ✅ |
| Temporal | Modern, type-safe | Less mature ecosystem | ❌ |`
      },
      {
        type: 'text',
        content: `**Airflow won** because:
- Native DAG support for complex parent-child dependencies
- Excellent observability (UI shows exactly where failures occur)
- Rich operator ecosystem (K8s, AWS, custom)
- Battle-tested at scale

### GPU Serial Number Labeling

A critical innovation was **dynamic node labeling** with GPU serial numbers. This sounds simple but was transformative:`
      },
      {
        type: 'code',
        language: 'yaml',
        content: `apiVersion: v1
kind: Node
metadata:
  name: gpu-node-42
  labels:
    nvidia.com/gpu-0-serial: "GPU-abc123"
    nvidia.com/gpu-1-serial: "GPU-def456"
    nvidia.com/gpu-2-serial: "GPU-ghi789"
    # ... up to 8 GPUs per node
    platform.amazon.com/health-status: "healthy"`
      },
      {
        type: 'text',
        content: `This enabled:
- **Precise fault attribution**: Know exactly which physical GPU failed
- **Historical tracking**: Build failure patterns per serial number
- **Smart scheduling**: Avoid placing critical workloads on "flaky" GPUs
- **Vendor RMA**: Automatic hardware replacement tickets with serial numbers

## Results

The impact was significant:`
      },
      {
        type: 'table',
        content: `| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Mean Time to Detect | ~2 hours | ~5 minutes | 96% faster |
| Mean Time to Resolve | ~10 hours | ~1 hour | ~90% reduction |
| Manual Interventions | ~50/week | ~5/week | 90% reduction |
| GPU Utilization | ~70% | ~92% | +22 percentage points |`
      },
      {
        type: 'text',
        content: `## Lessons Learned

1. **Observability is not optional**: You can't fix what you can't see. Invest heavily in metrics and logging.

2. **Graceful degradation matters**: Always have a fallback. If auto-remediation fails, alert humans—don't make things worse.

3. **Hardware fails in patterns**: Track serial numbers. Some GPUs are just cursed.

4. **Automation builds trust slowly**: Start with alerts-only mode, graduate to auto-remediation as confidence grows.`
      }
    ]
  },
  {
    id: 'gpu-lifecycle-airflow',
    title: 'GPU Lifecycle Management with Airflow DAGs',
    titleZh: 'Airflow DAG 驅動的 GPU 生命週期管理',
    subtitle: 'Orchestrating Complex Workflows for GPU Fleet Operations',
    description: 'Deep dive into the Airflow DAG architecture that powers GPU provisioning, health checks, and decommissioning at scale.',
    tags: ['Airflow', 'DAG', 'GPU', 'Automation', 'Infrastructure'],
    readTime: '8 min',
    category: 'amazon',
    content: [
      {
        type: 'text',
        content: `## The Complexity of GPU Lifecycle

Managing GPU nodes isn't like managing regular compute. GPUs have:
- **Long provisioning times** (driver installation, CUDA setup)
- **Complex health requirements** (ECC errors, thermal throttling, NVLink status)
- **Expensive failures** (a single bad GPU can tank a multi-day training job)
- **Interdependent workflows** (you can't decommission while jobs are running)

We needed an orchestration layer that could handle this complexity with **visibility** and **reliability**.`
      },
      {
        type: 'mermaid',
        content: `graph TD
    subgraph Provision["Provisioning DAG"]
        P1[Request New Node] --> P2[Wait for Instance]
        P2 --> P3[Install Drivers]
        P3 --> P4[Configure DCGM]
        P4 --> P5[Run Burn-in Tests]
        P5 --> P6{Tests Pass?}
        P6 -->|Yes| P7[Add to Cluster]
        P6 -->|No| P8[Return to Pool]
    end

    subgraph Health["Health Check DAG"]
        H1[Scheduled Trigger] --> H2[Query DCGM Metrics]
        H2 --> H3[Check ECC Errors]
        H3 --> H4[Check Thermal Status]
        H4 --> H5[Check NVLink]
        H5 --> H6{All Healthy?}
        H6 -->|Yes| H7[Update Label: Healthy]
        H6 -->|No| H8[Trigger Remediation]
    end

    subgraph Decom["Decommission DAG"]
        D1[Decom Request] --> D2[Cordon Node]
        D2 --> D3[Wait for Jobs]
        D3 --> D4[Drain Pods]
        D4 --> D5[Remove from Cluster]
        D5 --> D6[Release Instance]
    end

    P7 --> H1
    H8 --> D1

    style P1 fill:#1a3a5c,color:#fff
    style P7 fill:#1a4a3a,color:#fff
    style P8 fill:#4a2a2a,color:#fff
    style H1 fill:#4a2c1a,color:#fff
    style D6 fill:#3d2d4a,color:#fff`
      },
      {
        type: 'text',
        content: `## DAG Design Patterns

### Pattern 1: Parent-Child Dependencies

The biggest challenge was **circular termination loops**. Consider:
- Job A depends on Node X
- Decommissioning Node X requires terminating Job A
- But Job A's termination triggers a restart... on Node X

Our solution: **Parent-Child DAG Structure**`
      },
      {
        type: 'mermaid',
        content: `flowchart TD
    subgraph Parent["Parent DAG: Orchestrator"]
        T1[Receive Decom Request] --> T2[Lock Node in DB]
        T2 --> T3[Trigger Child DAG]
        T3 --> T4[Wait for Child]
        T4 --> T5[Release Lock]
        T5 --> T6[Update State]
    end

    subgraph Child["Child DAG: Executor"]
        C1[Check Running Jobs] --> C2{Jobs Running?}
        C2 -->|Yes| C3[Graceful Terminate]
        C3 --> C4[Wait with Timeout]
        C4 --> C2
        C2 -->|No| C5[Safe to Proceed]
        C5 --> C6[Execute Decom Steps]
    end

    T3 -.-> C1
    C6 -.-> T4

    style T1 fill:#1a3a5c,color:#fff
    style T2 fill:#4a2c1a,color:#fff
    style C5 fill:#1a4a3a,color:#fff
    style C6 fill:#1a4a3a,color:#fff`
      },
      {
        type: 'text',
        content: `### Pattern 2: Idempotent Operations

Every step must be safely re-runnable. If a DAG fails midway and retries, it shouldn't cause duplicate actions.`
      },
      {
        type: 'code',
        language: 'python',
        content: `# Bad: Not idempotent
def add_node_to_cluster(node_id):
    cluster.add_node(node_id)  # Fails if already exists!

# Good: Idempotent
def add_node_to_cluster(node_id):
    if not cluster.has_node(node_id):
        cluster.add_node(node_id)
    # Always succeeds, regardless of current state`
      },
      {
        type: 'text',
        content: `### Pattern 3: Graceful Timeouts

Long-running operations need bounded waits:`
      },
      {
        type: 'code',
        language: 'python',
        content: `from airflow.sensors.base import BaseSensorOperator

class GpuDrainSensor(BaseSensorOperator):
    """Wait for GPU node to drain, with timeout."""

    def __init__(self, node_id, timeout_hours=4, **kwargs):
        super().__init__(**kwargs)
        self.node_id = node_id
        self.timeout = timedelta(hours=timeout_hours)

    def poke(self, context):
        running_pods = k8s_client.list_pods_on_node(self.node_id)
        if not running_pods:
            return True  # Drained!

        # Check timeout
        if datetime.now() - context['execution_date'] > self.timeout:
            self.force_evict(running_pods)
            return True

        return False  # Keep waiting`
      },
      {
        type: 'text',
        content: `## Monitoring & Observability

Airflow's built-in UI was good but not enough. We added:

### Custom Metrics to Prometheus
- DAG success/failure rates
- Task duration distributions
- Queue depth and latency

### Slack Integration
Critical failures trigger immediate alerts with context:`
      },
      {
        type: 'code',
        language: 'python',
        content: `def on_failure_callback(context):
    task = context['task_instance']
    slack.send(
        channel="#gpu-ops",
        text=f"""
🚨 *DAG Failure*
• DAG: {task.dag_id}
• Task: {task.task_id}
• Node: {context['params'].get('node_id')}
• Error: {context['exception']}
• Logs: {task.log_url}
        """
    )`
      },
      {
        type: 'text',
        content: `## Impact

This DAG architecture delivered:
- **Multi-million dollar savings** through optimized resource reclamation
- **Zero circular termination loops** (previously ~5/week)
- **Full auditability**: Every GPU lifecycle event is tracked
- **Self-service operations**: Other teams can trigger DAGs without deep infra knowledge

The key insight: **Treat infrastructure operations as software**. Version control your DAGs, test them, monitor them, and iterate.`
      }
    ]
  }
]

export function getDeepDiveArticle(id: string): DeepDiveArticle | undefined {
  return deepDiveArticles.find(article => article.id === id)
}

export function getDeepDivesByCategory(category: string): DeepDiveArticle[] {
  return deepDiveArticles.filter(article => article.category === category)
}
