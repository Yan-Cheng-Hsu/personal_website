export interface Experience {
  id: string
  company: string
  companyUrl: string
  organization: string
  organizationUrl?: string
  position: string
  startDate: string
  endDate: string
  location: string
  projects: {
    title: string
    url?: string
    bullets: string[]
  }[]
  image: string
}

export const experiences: Experience[] = [
  {
    id: 'alibaba',
    company: 'Alibaba Cloud',
    companyUrl: 'https://www.alibabacloud.com/',
    organization: 'AnalyticDB Org, AI Training Platform',
    organizationUrl: 'https://www.alibabacloud.com/product/analyticdb-for-postgresql',
    position: 'Infrastructure Software Engineer II (Official: SRE II)',
    startDate: 'Jul. 2025',
    endDate: 'present',
    location: 'Sunnyvale, CA',
    projects: [
      {
        title: 'Cross-Cluster AI Training Infrastructure for Unitree G1-D',
        url: 'https://www.alibabacloud.com/',
        bullets: [
          'Designed Dual-Layer Virtual Kubelet architecture orchestrating massive-scale heterogeneous GPU fleet; enabled Serverless-to-Reserved migration achieving ~40% TCO reduction and 25x capacity scaling for Unitree G1 humanoid robots.',
          'Engineered Federated Identity Mesh enabling cross-cluster AuthN/AuthZ via external Secret injection; resolved split-brain identity challenges with Custom Controllers implementing automated token rotation.',
          'Automated VPC provisioning via Terraform (Security Groups, CLB ACLs) to bypass CoreDNS isolation; rearchitected Ray service discovery for low-latency cross-boundary communication.',
          'Built Kubernetes Controller with telemetry pipeline (DCGM metrics, kernel traces); implemented reconciliation loop triggering automated cordon/drain for faulty GPU nodes.'
        ]
      }
    ],
    image: '/alibaba_logo.svg'
  },
  {
    id: 'amazon-agi',
    company: 'Amazon.com LLC',
    companyUrl: 'https://www.amazon.com/',
    organization: 'AGI Org, High Performance Computing',
    organizationUrl: 'https://www.amazon.com/b?node=21576558011',
    position: 'Software Development Engineer',
    startDate: 'Oct. 2023',
    endDate: 'Jul. 2025',
    location: 'Seattle, WA',
    projects: [
      {
        title: 'Platform Leviathan: NVIDIA A100/H100 Infrastructure for Amazon NOVA',
        url: 'https://www.amazon.com/b?node=21576558011',
        bullets: [
          'GPU Lifecycle & Blocklisting: Architected scalable tracking system handling thousands of concurrent scaling requests; designed parent-child DAG in Apache Airflow; eliminated circular termination loops, delivering multi-million dollar annualized savings.',
          'Automated Reliability Orchestrator: Designed fault identification workflow for large-scale GPU clusters using divide-and-conquer with dynamic K8s node labeling; reduced troubleshooting time by ~90% per incident.',
          'API & Monitoring: Built customer-facing API/CLI (Lambda, Smithy); optimized DynamoDB O(N) → O(log N), improving query response latency by over 70%.'
        ]
      }
    ],
    image: '/pics/amazon_icon.png'
  },
  {
    id: 'ucsd-fullstack',
    company: 'University of California San Diego',
    companyUrl: 'https://ucsd.edu/',
    organization: 'Computer Science Department',
    organizationUrl: 'https://cse.ucsd.edu/',
    position: 'Full-Stack Developer',
    startDate: 'Feb. 2023',
    endDate: 'Jun. 2023',
    location: 'San Diego, CA',
    projects: [
      {
        title: 'Comcom Website: Command Line Tools on The Web',
        url: 'https://github.com/Yan-Cheng-Hsu/ComCom-Project',
        bullets: [
          'Developed, packaged, and deployed a decoupled web application on AWS EC2, using Linux shell scripts and Docker images.',
          'Built a multi-threaded backend with a SQL database and file-sharing system using Flask and Django with RESTful APIs.',
          'Built the frontend with React.js and Node.js, integrating event, state, and proxy management.'
        ]
      }
    ],
    image: '/pics/comcom_system_overview.png'
  },
  {
    id: 'amazon-alexa',
    company: 'Amazon.com LLC',
    companyUrl: 'https://www.amazon.com/',
    organization: 'Alexa Org',
    organizationUrl: 'https://www.amazon.com/b?node=21576558011',
    position: 'Software Dev Engineer Intern',
    startDate: 'Jun. 2022',
    endDate: 'Sep. 2022',
    location: 'Seattle, WA',
    projects: [
      {
        title: 'Alexa Secure AI Platform: Sensai Self-Service Onboarding Platform',
        bullets: [
          'Created and launched a decoupled web application on AWS Lambda and Cloudfront for secure onboarding.',
          'Developed Auto-Verification, Canaries, Access Control, and Monitoring modules using AWS-CDK/SDK, drastically reducing app/API integration time.',
          'Refined the existing webUI to augment the self-service capabilities of the onboarding system.'
        ]
      }
    ],
    image: '/pics/confidential.png'
  },
  {
    id: 'wiwynn',
    company: 'Wiwynn Inc (Acer\'s Child Company)',
    companyUrl: 'https://www.wiwynn.com/',
    organization: '',
    position: 'Software Dev Engineer Intern',
    startDate: 'Jul. 2021',
    endDate: 'Aug. 2021',
    location: 'Taipei, Taiwan',
    projects: [
      {
        title: 'Prometheus Infrastructure Testing Data Analysis and Software Toolkit Development',
        bullets: [
          'Established a prototype data pipeline for production line testing data analysis.',
          'Developed three comprehensive Python packages for efficient data collection, alignment, and analysis.',
          'Streamlined the scope of production line performance enhancement by approximately 66%.'
        ]
      }
    ],
    image: '/pics/wiwynn_systemoverview.png'
  },
  {
    id: 'ncu-research',
    company: 'Machine Learning and Biometric Recognition Lab',
    companyUrl: 'https://www.honhai.com/en-us/rd-and-technology/institute',
    organization: 'National Central University',
    organizationUrl: 'https://en.csie.ncu.edu.tw/',
    position: 'Deep Learning Research Assistant',
    startDate: 'Dec. 2020',
    endDate: 'Oct. 2021',
    location: 'Taoyuan, Taiwan',
    projects: [
      {
        title: 'Deep Neural Network Predictor for Blood Pressure Estimation',
        url: 'https://github.com/Yan-Cheng-Hsu/Blood-Pressure-Estimation-Model',
        bullets: [
          'Designed and implemented a deep learning model with a novel physiological feature selection algorithm.',
          'Enhanced accuracy by ~1.8x and expanded data incorporation by ~6x, achieving MAE of 2.73 mmHg across 2.5M+ cardiac cycles.',
          'Published this work in Sensors 20 international journal.'
        ]
      }
    ],
    image: '/pics/publication_system_overview.png'
  }
]

export interface Publication {
  id: string
  title: string
  authors: string
  venue: string
  year: number
  url?: string
  githubUrl?: string
  image: string
  bullets: string[]
  isOral?: boolean
}

export const publications: Publication[] = [
  {
    id: 'sensors-bp',
    title: 'Generalized Deep Neural Network Model for Cuffless Blood Pressure Estimation with Photoplethysmogram Signal Only',
    authors: 'Hsu, Yan-Cheng; Li, Yung-Hui; Chang, Ching-Chun; Harfiya, Latifa N.',
    venue: 'Sensors 20, no. 19: 5668',
    year: 2020,
    url: 'https://www.mdpi.com/1424-8220/20/19/5668',
    githubUrl: 'https://github.com/Yan-Cheng-Hsu/Blood-Pressure-Estimation-Model',
    image: '/pics/publication_system_overview.png',
    bullets: [
      'Developed a deep-neural-network model for estimating blood pressure with a novel statistical feature selection method.',
      'Achieved cutting-edge performance satisfying both AAMI and BHS standards for blood pressure measurement devices.'
    ]
  },
  {
    id: 'apsipa-tst',
    title: 'On the Optimal Self-Supervised Multi-Fault Detector for Temperature Sensor Data',
    authors: 'Latifa N.; Hsu, Yan-Cheng; Li, Y.H.; Wang, J.C.',
    venue: 'APSIPA ASC 2023',
    year: 2023,
    url: 'https://ieeexplore.ieee.org/document/10317578',
    image: '/pics/tst_so.png',
    bullets: [
      'Implemented self-supervised time series transformers, securing state-of-the-art performance on diverse temporal datasets.',
      'Presented findings orally at the IEEE APSIPA ASC 2023 conference.'
    ],
    isOral: true
  },
  {
    id: 'amazon-nova',
    title: 'The Amazon Nova Family of Models: Technical Report and Model Card',
    authors: 'Amazon AGI et al. (including Hsu, Yan-Cheng)',
    venue: 'Amazon Technical Report',
    year: 2024,
    url: 'https://www.amazon.com/b?node=21576558011',
    image: '/pics/amazon_icon.png',
    bullets: [
      'Contributed to the GPU infrastructure and HPC systems that enabled training of the Amazon Nova family of foundation models.',
      'Part of the High Performance Computing team that built Platform Leviathan for NVIDIA A100/H100 GPU management.'
    ]
  }
]
