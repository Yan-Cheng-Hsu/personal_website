import { Media,  MediaSource, MediaType, MediaState } from "react-chrono/dist/models/TimelineMediaModel"; 
import { TimelineItemModel } from "react-chrono/dist/models/TimelineItemModel";
export const timelineData: TimelineItemModel[] = [
  {
    title: `Jul 2025`,
    cardTitle: `Infrastructure Software Engineer II @Alibaba Cloud | AnalyticDB Org - AI Training Platform`,
    cardSubtitle: `Project Nexus: Cross-Cluster AI Training Infrastructure for Unitree G1-D Robot`,
    cardDetailedText:`Tech Stack: Kubernetes, Virtual Kubelet, Terraform, Ray, DCGM, Prometheus, Grafana, eBPF, Golang`,
    url: `/work_exp`,
    media: {
        type: "IMAGE",
        source: {
          url: `/alibaba_logo.svg`
        }
      }
  },
  {
    title: `Dec 2024`,
    cardTitle: `Co-Author on Amazon Nova Technical Report`,
    cardSubtitle: `"The Amazon Nova family of models: Technical report and model card"`,
    cardDetailedText:`Tech Stack: LLM/LVM Training, GPU Infrastructure, Distributed Systems`,
    url: `/work_exp`,
    media: {
        type: "IMAGE",
        source: {
          url: `/pics/amazon_icon.png`
        }
      }
  },
  {
    title: `Oct 2023`,
    cardTitle: `Software Dev Engineer @Amazon | AGI Org - High Performance Computing`,
    cardSubtitle: `Platform Leviathan: NVIDIA A100s/H100s Infrastructure for Amazon NOVA`,
    cardDetailedText:`Tech Stack: AWS EKS, DynamoDB, EC2, GPU Optimization, Python, TypeScript`,
    url: `/work_exp`,
    media: {
        type: "IMAGE",
        source: {
          url: `/pics/amazon_icon.png`
        }
      }
  }, 
  {
    title: `Oct 2023`,
    cardTitle: `Published on IEEE Conference APSIPA ASC 2023`,
    cardSubtitle: `"On the Optimal Self-Supervised Multi-Fault Detector for Temperature Sensor Data"`,
    cardDetailedText:`Tech Stack: Python, Time-Series Transformers, Articial General Intelligence`,
    url: `/work_exp`,
    media: {
        type: "IMAGE",
        source: {
          url: `/pics/tst_so.png`
        }
      }
  }, 
  {
    title: `Apr 2023`,
    cardTitle: `Published My Multiple Page Portfolio on Azure Service`,
    cardSubtitle: `My Next.js Website from Scratch`,
    cardDetailedText:`Tech Stack: Typescript/CSS/HTML, Next.js, Azure VM, DNS`,
    url: `/projects`,
    media: {
        type: "IMAGE",
        source: {
          url: `/pics/personal_webv2_system_design.png`
        }
      }
  }, 
  {
    title: `Feb 2023`,
    cardTitle: `Full-Stack Developer @University of California San Diego`,
    cardSubtitle: `Full-Stack Project: Comcom Website - Online Commendline Tools`,
    cardDetailedText:`Tech Stack: Python, Flask, Django, Javascript/CSS/HTML, Node.js, React.js, Restful APIs, Linux Shell Scripts, Docker, Docker-Compose, Nginx, AWS EC2`,
    url: `/work_exp`,
    media: {
        type: "IMAGE",
        source: {
          url: `/pics/comcom_system_overview.png`
        }
      }
  }, 
  {
    title: `Feb 2023`,
    cardTitle: `Visiting Scholar @Swartz Center for Computational Neuroscience at University of California San Diego`,
    cardSubtitle: `PhysioNet 2023`,
    cardDetailedText:`Tech Stack: Python, Matlab, EEGLab, Tensorflow, Pytorch`,
    url: `https://sccn.ucsd.edu/labinfo/index.php`,
    media: {
        type: "IMAGE",
        source: {
          url: `/pics/sccn_icon.png`
        }
      }
  }, 
  {
    title: `Jan 2023`,
    cardTitle: `Earned a Master's Degree in Computer Science @University of California San Diego`,
    cardSubtitle: `Master of Science in Computer Science with a specializaiton in Artificial Intelligence and Machine Learning`,
    cardDetailedText:`Course Taken: Recommender Sys&Web Mining, Probabilistic Reason&Learning, Computer Vision, Graduate Networked Systems, Convex Optimization Algorithms, Statistic Natural Language Processing, Digital Product Management, Database System Implementation, Computer Architecture, Principles of Programming Languages`,
    url: `/ucsdGraduateCert.pdf`,
    media: {
        type: "IMAGE",
        source: {
          url: `/pics/ucsdGraduateCert.png`
        }
      }
  },  
  {
    title: `Sep 2022`,
    cardTitle: `Software Dev Engineer Intern @Amazon | Alexa Org (Return Offered)`,
    cardSubtitle: `Full-Stack Project: SensAI Self-Service Onboarding Platform`,
    cardDetailedText:`Tech Stack: Secure AI/ML Platform, Typescript, Node.js, Javascript/CSS/HTML,
    React.js, Git, VersionSet, CI/CD, Pipeline, AWS-CDK, AWS-SDK`,
    url: `/work_exp`,
    media: {
        type: "IMAGE",
        source: {
          url: `/pics/confidential.png`
        }
      }
  },  
  {
    title: `Mar 2022`,
    cardTitle: `Published My Single Page Porfolio on AWS Service`,
    cardSubtitle: `My Personal Website From Scratch`,
    cardDetailedText:`Tech Stack: Javascript/CSS/HTML, AWS EC2, ACM, Cloudfront, Route 53, S3`,
    url: `https://www.bill-yan-cheng-hsu.com`,
    media: {
        type: "IMAGE",
        source: {
          url: `/pics/personal_webv1_system_design.png`
        }
      }
  },  
  {
    title: `Jul 2021`,
    cardTitle: ` Software Engineer Intern @Wiwynn Inc (Acer's Child Company)`,
    cardSubtitle: `Prometheus Infrastructure Testing Data Analysis and Software Toolkit Development`,
    cardDetailedText:`Tech Stack: Python, SQL, Git, CI/CD, Python Unit
    Testing, Prometheus, Large Scale Database, Temporal Data Analysis`,
    url: `/work_exp`,
    media: {
        type: "IMAGE",
        source: {
          url: `/pics/wiwynn_systemoverview.png`
        }
      }
  },  
  {
    title: `Oct 2020`,
    cardTitle: `Publication on International Journal Sensors as 1st Aurthor`,
    cardSubtitle: `“Generalized Deep Neural Network Model for Cuffless
    Blood Pressure Estimation with Photoplethysmogram Signal Only.” Sensors 20, no. 19: 5668.`,
    cardDetailedText:`Tech Stack: Python, Keras, Tensorflow, Pytorch, CUDA, Algorithms, Statistics`,
    url: 'https://www.mdpi.com/1424-8220/20/19/5668',
    media: {
        type: "IMAGE",
        source: {
          url: `/pics/publication_system_overview.png`
        }
      }
  },
  {
    title: `September 2019`,
    cardTitle: `Deep Learning Application Researcher @Machine Learning and Biometric Recognition Lab at National Central University`,
    cardSubtitle: `Worked on Deep Learning Algorithm Development and Applications on Wearable Devices`,
    cardDetailedText:`Tech Stack: Python, Java, Keras, Tensorflow, Linux, Ubuntu, Android Applications`,
    url: 'https://www.honhai.com/en-us/rd-and-technology/institute',
    media: {
        type: "IMAGE",
        source: {
          url: `/pics/ppg.png`
        }
      }
  },
] as TimelineItemModel[];
  