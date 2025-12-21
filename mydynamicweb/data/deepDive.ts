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
// Alibaba Cloud Section
// ============================================

const alibabaSection: DeepDiveSection = {
  id: 'alibaba',
  company: 'Alibaba Cloud',
  tagline: 'Cross-Cluster AI Training Infrastructure',
  systemArchitecture: {
    title: 'K8s on K8s: Recursive Virtualization Architecture',
    subtitle: 'Two-Layer Virtual Kubelet for Multi-Cluster GPU Pooling',
    overview: `When building large-scale AI SaaS platforms, we faced a critical business challenge: **customers were paying for expensive ECI (Elastic Container Instances) on-demand, while our reserved GPU clusters sat underutilized**.

The root cause? Kubernetes wasn't designed for cross-cluster resource pooling. Each cluster was an isolated island.

Our solution: A **two-layer Virtual Kubelet architecture** that presents multiple GPU clusters as a single, unified resource pool to users. This enables:
- Transparent routing of workloads to reserved instances first
- Centralized billing and quota management
- Seamless failover between clusters

The architecture achieves **~40% cost reduction** by maximizing reserved instance utilization before falling back to on-demand resources.`,
    keyComponents: [
      'L1: ACK Frontend (User-facing Kubernetes)',
      'L2: CPU Cluster (Control Plane / The Brain)',
      'L3: GPU Clusters (Data Plane / The Muscle)',
      'Internal CLB for cross-cluster networking',
      'VK Layer 2 Injection Modules'
    ],
    diagram: {
      type: 'mermaid',
      content: `graph TD
    subgraph L1["L1: ACK Frontend"]
        User[User Workloads]
    end

    subgraph L2["L2: CPU Cluster (Brain)"]
        API[Master API Server]
        Ray[Ray Head Controller]
        CLB[Internal CLB]
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
    Ray --> CLB
    VN -->|VK Layer 2| GPU1
    VN -->|VK Layer 2| GPU2
    VN -->|VK Layer 2| GPU3
    GPU1 -.->|Traffic via CLB| CLB
    GPU2 -.->|Traffic via CLB| CLB
    GPU3 -.->|Traffic via CLB| CLB

    style CLB fill:#ff6b35,stroke:#ff6b35,color:#fff
    style L2 fill:#1a1a2e,stroke:#9b59b6
    style L3 fill:#1a2e1a,stroke:#10b981`
    }
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
// Amazon Section
// ============================================

const amazonSection: DeepDiveSection = {
  id: 'amazon',
  company: 'Amazon AGI',
  tagline: 'LLM Training Platform for Foundation Models',
  systemArchitecture: {
    title: 'LLM Training Platform Architecture',
    subtitle: 'Internal Tools for 7,000+ GPU Fleet Management',
    overview: `We operate an **LLM Training Platform** managing **7,000+ GPUs** distributed across multiple AWS EKS clusters. As the Internal Tools Team, we handle Health Checks, Node Remediation, and operational automation—primarily serving Scientists and ML researchers.

The platform provides:
- **Airflow DAGs** for orchestrating Health Checks, Divergence Tests, and Node Remediation
- **RESTful APIs** via Lambda + API Gateway for cluster info and job management
- **CLI Tools** for scientists to submit jobs and query status
- **Persistent Layer** tracking GPU serial numbers, node status, and job history

Result: **Multi-million dollar annual savings** through automated fault detection and reduced GPU idle time.`,
    keyComponents: [
      'AWS EKS Clusters (7,000+ GPUs)',
      'Airflow DAGs for Health Check & Remediation',
      'Lambda + API Gateway (RESTful APIs)',
      'RDS for Job/Node/Cluster metadata',
      'Argo Workflow + Helm for CI/CD'
    ],
    diagram: {
      type: 'mermaid',
      content: `graph TD
    subgraph Client["Customer / Scientist"]
        CLI[CLI Tool]
    end

    subgraph API["RESTful APIs"]
        Gateway[API Gateway]
        Lambda[AWS Lambda]
        Gateway --> Lambda
    end

    subgraph Orch["Orchestration"]
        Airflow[Airflow DAGs<br/>Health Check / Remediation]
    end

    subgraph DB["Persistent Layer"]
        Job[(Job Table)]
        Node[(Node Status)]
        Cluster[(Cluster Info)]
    end

    subgraph Infra["Infrastructure"]
        EKS[AWS EKS Clusters<br/>GPU Nodes]
        FSX[FSX Storage]
        S3[S3 Bucket]
    end

    CLI --> Gateway
    Lambda --> DB
    Lambda --> Airflow
    Airflow --> EKS
    EKS --- FSX
    EKS --- S3

    style CLI fill:#ff9900,stroke:#ff9900,color:#fff
    style Airflow fill:#ff9900,stroke:#ff9900,color:#fff
    style EKS fill:#10b981,stroke:#10b981,color:#fff`
    }
  },
  caseStudies: [
    {
      id: 'gpu-health-check',
      title: 'Stateful GPU Health Check System',
      subtitle: 'Stopping Silicon Decay with Hardware Fingerprint Tracking',
      docPath: 'amazon/case-1.md',
      tags: ['GPU', 'Airflow', 'DynamoDB', 'FinOps'],
      readTime: '12 min'
    },
    {
      id: 'divergence-test',
      title: 'Divergence Test DAG',
      subtitle: 'Binary Search-Based AI Training Fault Isolation',
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
