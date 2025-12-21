// ============================================
// Deep Dive Data Structure
// ============================================

export interface ContentBlock {
  type: 'text' | 'mermaid' | 'code' | 'table'
  content: string
  language?: string
}

export interface SystemArchitecture {
  title: string
  subtitle: string
  overview: string
  keyComponents: string[]
  diagram: ContentBlock
}

export interface CaseStudyMeta {
  id: string
  title: string
  subtitle: string
  docPath: string  // Path to markdown file relative to docs folder
  tags: string[]
  readTime: string
}

export interface DeepDiveSection {
  id: 'alibaba' | 'amazon'
  company: string
  tagline: string
  systemArchitecture: SystemArchitecture
  caseStudies: CaseStudyMeta[]
}

// ============================================
// Cloud Provider A Section
// ============================================

const alibabaSection: DeepDiveSection = {
  id: 'alibaba',
  company: 'Global Cloud Provider',
  tagline: 'Cross-Cluster AI Training Infrastructure',
  systemArchitecture: {
    title: 'K8s on K8s: Recursive Virtualization Architecture',
    subtitle: 'Two-Layer Virtual Kubelet for Multi-Cluster GPU Pooling',
    overview: `> **Note**: Due to confidentiality agreements, specific implementation details have been abstracted. The patterns described represent general industry practices.

When building large-scale AI SaaS platforms, we faced a critical business challenge: **customers were paying for expensive on-demand container instances, while our reserved GPU clusters sat underutilized**.

The root cause? Kubernetes wasn't designed for cross-cluster resource pooling. Each cluster was an isolated island.

Our solution: A **two-layer Virtual Kubelet architecture** that presents multiple GPU clusters as a single, unified resource pool to users. This enables:
- Transparent routing of workloads to reserved instances first
- Centralized billing and quota management
- Seamless failover between clusters

The architecture achieves **significant cost reduction** by maximizing reserved instance utilization before falling back to on-demand resources.`,
    keyComponents: [
      'L1: Managed K8s Frontend (User-facing Kubernetes)',
      'L2: CPU Cluster (Control Plane / The Brain)',
      'L3: GPU Clusters (Data Plane / The Muscle)',
      'Internal Load Balancer for cross-cluster networking',
      'VK Layer 2 Injection Modules'
    ],
    diagram: {
      type: 'mermaid',
      content: `graph TD
    subgraph L1["L1: User-Facing Layer"]
        User[User Workloads]
    end

    subgraph L2["L2: Control Plane"]
        CP[Orchestration Components]
    end

    subgraph L3["L3: Data Plane"]
        GPU[GPU Resource Pools]
    end

    L1 --- L2
    L2 --- L3

    style L1 fill:#2563eb,stroke:#3b82f6,color:#fff
    style L2 fill:#7c3aed,stroke:#8b5cf6,color:#fff
    style L3 fill:#059669,stroke:#10b981,color:#fff
    style User fill:#1e40af,stroke:#3b82f6,color:#fff
    style CP fill:#5b21b6,stroke:#8b5cf6,color:#fff
    style GPU fill:#047857,stroke:#10b981,color:#fff`
    }
    /* Original detailed diagram:
    content: \`graph TD
    subgraph L1["L1: Managed K8s Frontend"]
        User[User Workloads]
    end

    subgraph L2["L2: CPU Cluster (Brain)"]
        API[Master API Server]
        Ray[Ray Head Controller]
        LB[Internal LB]
        VN[Virtual Node]
        Bill[Billing & Quota]
    end

    subgraph L3["L3: GPU Clusters (Muscle)"]
        GPU1[GPU Pool A]
        GPU2[GPU Pool B]
        GPU3[GPU Pool C]
    end

    User -->|VK Layer 1| API
    API --> Ray
    Ray --> LB
    VN -->|VK Layer 2| GPU1
    VN -->|VK Layer 2| GPU2
    VN -->|VK Layer 2| GPU3
    GPU1 -.->|Traffic via LB| LB
    GPU2 -.->|Traffic via LB| LB
    GPU3 -.->|Traffic via LB| LB

    style LB fill:#ff6b35,stroke:#ff6b35,color:#fff
    style L2 fill:#1a1a2e,stroke:#9b59b6
    style L3 fill:#1a2e1a,stroke:#10b981\`
    */
  },
  caseStudies: [
    {
      id: 'recursive-virtualization',
      title: 'K8s on K8s: Recursive Virtualization',
      subtitle: 'Virtual Kubelet-based Ray Resource Pooling Architecture',
      docPath: 'alibaba_cloud/case-1.md',
      tags: ['Kubernetes', 'Virtual Kubelet', 'Multi-Cluster', 'Ray'],
      readTime: '15 min'
    },
    {
      id: 'time-window-scheduling',
      title: 'Time-Window Node Scheduling',
      subtitle: 'Cron-Driven GPU Pool Time-Sharing Architecture',
      docPath: 'alibaba_cloud/case-2.md',
      tags: ['Kubernetes', 'Scheduling', 'FinOps', 'Cron'],
      readTime: '12 min'
    },
    {
      id: 'mock-pv-storage',
      title: 'Mock PV: Cross-Cluster Storage',
      subtitle: 'Two-Phase Provisioning for Storage Virtualization',
      docPath: 'alibaba_cloud/case-3.md',
      tags: ['Kubernetes', 'Storage', 'CSI', 'PVC'],
      readTime: '12 min'
    }
  ]
}

// ============================================
// Tech Company B Section
// ============================================

const amazonSection: DeepDiveSection = {
  id: 'amazon',
  company: 'Tier-1 Tech Company',
  tagline: 'LLM Training Platform for Foundation Models',
  systemArchitecture: {
    title: 'LLM Training Platform Architecture',
    subtitle: 'Internal Tools for Large-Scale GPU Fleet Management',
    overview: `> **Note**: Due to confidentiality agreements, specific implementation details have been abstracted. The patterns described represent general industry practices.

We operate an **LLM Training Platform** managing **thousands of GPUs** distributed across multiple managed Kubernetes clusters. As the Internal Tools Team, we handle Health Checks, Node Remediation, and operational automation—primarily serving Scientists and ML researchers.

The platform provides:
- **Airflow DAGs** for orchestrating Health Checks, Fault Isolation, and Node Remediation
- **RESTful APIs** via Serverless Functions for cluster info and job management
- **CLI Tools** for scientists to submit jobs and query status
- **Persistent Layer** tracking GPU serial numbers, node status, and job history

Result: **Multi-million dollar annual savings** through automated fault detection and reduced GPU idle time.`,
    keyComponents: [
      'Managed K8s Clusters (Thousands of GPUs)',
      'Airflow DAGs for Health Check & Remediation',
      'Serverless Functions (RESTful APIs)',
      'Relational Database for Job/Node/Cluster metadata',
      'GitOps-based CI/CD'
    ],
    diagram: {
      type: 'mermaid',
      content: `graph TD
    subgraph Client["User Interface"]
        CLI[CLI / API Client]
    end

    subgraph Platform["Platform Services"]
        API[API Layer]
        Orch[Orchestration Layer]
    end

    subgraph Data["Data Layer"]
        DB[Persistent Storage]
    end

    subgraph Infra["Infrastructure"]
        K8s[GPU Clusters]
    end

    Client --- Platform
    Platform --- Data
    Platform --- Infra

    style Client fill:#f59e0b,stroke:#fbbf24,color:#000
    style Platform fill:#7c3aed,stroke:#8b5cf6,color:#fff
    style Data fill:#2563eb,stroke:#3b82f6,color:#fff
    style Infra fill:#059669,stroke:#10b981,color:#fff
    style CLI fill:#d97706,stroke:#fbbf24,color:#fff
    style API fill:#5b21b6,stroke:#8b5cf6,color:#fff
    style Orch fill:#5b21b6,stroke:#8b5cf6,color:#fff
    style DB fill:#1e40af,stroke:#3b82f6,color:#fff
    style K8s fill:#047857,stroke:#10b981,color:#fff`
    }
  },
  caseStudies: [
    {
      id: 'gpu-health-check',
      title: 'Stateful GPU Health Check System',
      subtitle: 'Stopping Silicon Decay with Hardware Fingerprint Tracking',
      docPath: 'amazon/case-1.md',
      tags: ['GPU', 'Airflow', 'NoSQL DB', 'FinOps'],
      readTime: '12 min'
    },
    {
      id: 'divergence-test',
      title: 'Training Fault Isolation System',
      subtitle: 'Binary Search-Based GPU Fault Detection',
      docPath: 'amazon/case-2.md',
      tags: ['Airflow', 'Kubernetes', 'Binary Search', 'Fault Isolation'],
      readTime: '10 min'
    }
  ]
}

// ============================================
// Exports
// ============================================

export const deepDiveSections: DeepDiveSection[] = [alibabaSection, amazonSection]

export function getSection(id: string): DeepDiveSection | undefined {
  return deepDiveSections.find(section => section.id === id)
}

export function getCaseStudy(sectionId: string, caseStudyId: string): CaseStudyMeta | undefined {
  const section = getSection(sectionId)
  return section?.caseStudies.find(cs => cs.id === caseStudyId)
}

export function getAllCaseStudies(): { section: DeepDiveSection; caseStudy: CaseStudyMeta }[] {
  return deepDiveSections.flatMap(section =>
    section.caseStudies.map(caseStudy => ({ section, caseStudy }))
  )
}
