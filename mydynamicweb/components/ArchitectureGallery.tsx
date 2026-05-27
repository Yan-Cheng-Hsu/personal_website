import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import styles from '@/styles/Landing.module.css'

// SVG Diagrams for each view (Simplified)
function OverviewDiagram() {
  return (
    <svg viewBox="0 0 700 440" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="gBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a9eff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4a9eff" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.04" />
        </linearGradient>
        <marker id="arrDown" markerWidth="9" markerHeight="7" refX="4.5" refY="6" orient="auto">
          <polygon points="0 0, 9 0, 4.5 7" fill="#10b981" />
        </marker>
      </defs>

      <text x="350" y="20" textAnchor="middle" fill="#888" fontSize="11" fontWeight="500">HETEROGENEOUS COMPUTE PLATFORM — RECURSIVE K8s-ON-K8s FOUNDATION</text>

      {/* Apps row label */}
      <text x="350" y="48" textAnchor="middle" fill="#7aa2d4" fontSize="10" fontWeight="600">0 → 1 SaaS PRODUCTS · run on the platform</text>

      {/* App A: Dev Workstations */}
      <rect x="70" y="58" width="270" height="72" rx="12" fill="url(#gBlue)" stroke="#4a9eff" strokeWidth="2" />
      <text x="205" y="90" textAnchor="middle" fill="#4a9eff" fontSize="13" fontWeight="700">AI Dev Workstations</text>
      <text x="205" y="112" textAnchor="middle" fill="#7aa2d4" fontSize="9">interactive · dual-plane networking</text>

      {/* App B: Scheduler */}
      <rect x="360" y="58" width="270" height="72" rx="12" fill="url(#gBlue)" stroke="#4a9eff" strokeWidth="2" />
      <text x="495" y="88" textAnchor="middle" fill="#4a9eff" fontSize="12" fontWeight="700">Distributed Training &amp; Sim Scheduler</text>
      <text x="495" y="112" textAnchor="middle" fill="#7aa2d4" fontSize="9">mixed CPU/GPU job dispatch</text>

      {/* Arrows down to foundation */}
      <line x1="205" y1="130" x2="205" y2="176" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrDown)" />
      <line x1="495" y1="130" x2="495" y2="176" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrDown)" />
      <text x="350" y="160" textAnchor="middle" fill="#666" fontSize="9">runs on</text>

      {/* Foundation box */}
      <rect x="50" y="182" width="600" height="208" rx="12" fill="url(#gGreen)" stroke="#10b981" strokeWidth="2" />
      <text x="350" y="208" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="700">HETEROGENEOUS COMPUTE PLATFORM — THE FOUNDATION</text>

      {/* Foundation sub-elements */}
      <rect x="75" y="222" width="550" height="44" rx="8" fill="#10241c" stroke="#10b981" strokeOpacity="0.5" />
      <text x="350" y="242" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="600">Recursive K8s-on-K8s</text>
      <text x="350" y="258" textAnchor="middle" fill="#888" fontSize="9">virtual-node-on-virtual-node</text>

      <rect x="75" y="274" width="550" height="44" rx="8" fill="#10241c" stroke="#10b981" strokeOpacity="0.5" />
      <text x="350" y="294" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="600">Cross-Cluster Identity Mesh</text>
      <text x="350" y="310" textAnchor="middle" fill="#888" fontSize="9">app-layer routing · per-pod secrets-mount · no static credentials</text>

      <rect x="75" y="326" width="550" height="48" rx="8" fill="#10241c" stroke="#10b981" strokeOpacity="0.5" />
      <text x="350" y="347" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="600">Unified Compute Substrate</text>
      <text x="350" y="363" textAnchor="middle" fill="#888" fontSize="9">dedicated GPU pools + serverless CPU pools across multiple clusters</text>

      {/* Stats bar */}
      <rect x="150" y="404" width="400" height="28" rx="8" fill="#1a1a1a" stroke="#333" />
      <text x="350" y="422" textAnchor="middle" fill="#888" fontSize="9">Unified substrate · ~40% TCO reduction · 25x capacity scaling</text>
    </svg>
  )
}

// LLM Training Platform Architecture (Simplified)
function AmazonDiagram() {
  return (
    <svg viewBox="0 0 700 420" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="gAmazon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9900" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ff9900" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gPurple2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b59b6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#9b59b6" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gGreen3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <text x="350" y="25" textAnchor="middle" fill="#888" fontSize="12" fontWeight="500">LLM TRAINING PLATFORM ARCHITECTURE</text>

      {/* User Interface Layer */}
      <rect x="220" y="50" width="260" height="70" rx="12" fill="url(#gAmazon)" stroke="#ff9900" strokeWidth="2" />
      <text x="350" y="80" textAnchor="middle" fill="#ff9900" fontSize="14" fontWeight="700">User Interface</text>
      <text x="350" y="100" textAnchor="middle" fill="#f7c531" fontSize="10">CLI / API Clients</text>

      {/* Platform Services Layer */}
      <rect x="120" y="150" width="460" height="90" rx="12" fill="url(#gPurple2)" stroke="#9b59b6" strokeWidth="2" />
      <text x="350" y="180" textAnchor="middle" fill="#9b59b6" fontSize="14" fontWeight="700">Platform Services</text>
      <text x="350" y="205" textAnchor="middle" fill="#b8a9c9" fontSize="10">API Layer • Orchestration • Automation</text>
      <text x="350" y="225" textAnchor="middle" fill="#666" fontSize="9">Health Checks • Fault Isolation • Remediation</text>

      {/* Data Layer */}
      <rect x="420" y="270" width="200" height="70" rx="12" fill="#1a1a2e" stroke="#4a9eff" strokeWidth="2" />
      <text x="520" y="300" textAnchor="middle" fill="#4a9eff" fontSize="12" fontWeight="700">Data Layer</text>
      <text x="520" y="320" textAnchor="middle" fill="#7aa2d4" fontSize="9">Persistent Storage</text>

      {/* Infrastructure Layer */}
      <rect x="80" y="270" width="300" height="70" rx="12" fill="url(#gGreen3)" stroke="#10b981" strokeWidth="2" />
      <text x="230" y="300" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="700">Infrastructure</text>
      <text x="230" y="320" textAnchor="middle" fill="#6ee7b7" fontSize="9">GPU Clusters • Training Jobs</text>

      {/* Stats bar */}
      <rect x="170" y="365" width="360" height="45" rx="8" fill="#1a1a1a" stroke="#333" />
      <text x="350" y="393" textAnchor="middle" fill="#888" fontSize="10">Automated fault detection • Multi-million dollar savings • Rapid fault remediation</text>
    </svg>
  )
}

// Personal Web: Event-Driven Serverless Architecture
function WebDiagram() {
  return (
    <svg viewBox="0 0 700 450" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="gVercel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.05" />
        </linearGradient>
        <marker id="arrVercel" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#00d4ff" />
        </marker>
      </defs>

      <text x="350" y="25" textAnchor="middle" fill="#888" fontSize="12" fontWeight="500">EVENT-DRIVEN SERVERLESS ARCHITECTURE</text>

      {/* User/Browser */}
      <rect x="50" y="60" width="120" height="80" rx="10" fill="#1a1a1a" stroke="#ff6b35" strokeWidth="2" />
      <text x="110" y="90" textAnchor="middle" fill="#ff6b35" fontSize="11" fontWeight="700">User</text>
      <text x="110" y="110" textAnchor="middle" fill="#888" fontSize="8">Browser</text>
      <text x="110" y="125" textAnchor="middle" fill="#666" fontSize="7">React Hydration</text>

      {/* Arrow to Edge */}
      <line x1="170" y1="100" x2="220" y2="100" stroke="#00d4ff" strokeWidth="2" markerEnd="url(#arrVercel)" />
      <text x="195" y="90" fill="#00d4ff" fontSize="7">HTTPS</text>

      {/* Vercel Edge Network */}
      <rect x="230" y="40" width="240" height="120" rx="12" fill="url(#gVercel)" stroke="#00d4ff" strokeWidth="2" />
      <text x="350" y="65" textAnchor="middle" fill="#00d4ff" fontSize="11" fontWeight="700">Vercel Edge Network</text>

      {/* Edge components */}
      <rect x="250" y="80" width="100" height="35" rx="4" fill="#2a2a2a" stroke="#00d4ff" strokeOpacity="0.5" />
      <text x="300" y="102" textAnchor="middle" fill="#888" fontSize="8">Next.js SSR</text>

      <rect x="360" y="80" width="100" height="35" rx="4" fill="#2a2a2a" stroke="#00d4ff" strokeOpacity="0.5" />
      <text x="410" y="102" textAnchor="middle" fill="#888" fontSize="8">Edge Cache</text>

      <rect x="250" y="120" width="210" height="30" rx="4" fill="#2a2a2a" stroke="#10b981" strokeOpacity="0.5" />
      <text x="355" y="140" textAnchor="middle" fill="#10b981" fontSize="8">ISR (Incremental Static Regeneration)</text>

      {/* Arrow to API Routes */}
      <line x1="350" y1="160" x2="350" y2="200" stroke="#f7c531" strokeWidth="2" markerEnd="url(#arrVercel)" />
      <text x="380" y="185" fill="#f7c531" fontSize="7">API Call</text>

      {/* Serverless Functions */}
      <rect x="230" y="210" width="240" height="100" rx="10" fill="#1a1a1a" stroke="#f7c531" strokeWidth="2" />
      <text x="350" y="235" textAnchor="middle" fill="#f7c531" fontSize="11" fontWeight="700">Serverless Functions</text>

      <rect x="250" y="250" width="100" height="45" rx="4" fill="#2a2a2a" stroke="#f7c531" strokeOpacity="0.4" />
      <text x="300" y="270" textAnchor="middle" fill="#888" fontSize="8">/api/contact</text>
      <text x="300" y="285" textAnchor="middle" fill="#666" fontSize="7">Email Handler</text>

      <rect x="360" y="250" width="100" height="45" rx="4" fill="#2a2a2a" stroke="#f7c531" strokeOpacity="0.4" />
      <text x="410" y="270" textAnchor="middle" fill="#888" fontSize="8">/api/analytics</text>
      <text x="410" y="285" textAnchor="middle" fill="#666" fontSize="7">Event Tracker</text>

      {/* External Services */}
      <text x="580" y="55" fill="#9b59b6" fontSize="10" fontWeight="600">EXTERNAL SERVICES</text>

      {/* Resend */}
      <rect x="520" y="70" width="130" height="55" rx="6" fill="#1a1a1a" stroke="#9b59b6" strokeWidth="1.5" />
      <text x="585" y="95" textAnchor="middle" fill="#9b59b6" fontSize="9" fontWeight="600">Resend</text>
      <text x="585" y="112" textAnchor="middle" fill="#888" fontSize="7">Transactional Email</text>

      {/* Vercel KV */}
      <rect x="520" y="135" width="130" height="55" rx="6" fill="#1a1a1a" stroke="#ff6b35" strokeWidth="1.5" />
      <text x="585" y="160" textAnchor="middle" fill="#ff6b35" fontSize="9" fontWeight="600">Vercel KV</text>
      <text x="585" y="177" textAnchor="middle" fill="#888" fontSize="7">Redis State Store</text>

      {/* Analytics */}
      <rect x="520" y="200" width="130" height="55" rx="6" fill="#1a1a1a" stroke="#10b981" strokeWidth="1.5" />
      <text x="585" y="225" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="600">Analytics</text>
      <text x="585" y="242" textAnchor="middle" fill="#888" fontSize="7">Page Views & Events</text>

      {/* Arrows to services */}
      <line x1="470" y1="260" x2="520" y2="97" stroke="#9b59b6" strokeWidth="1" strokeDasharray="4" />
      <line x1="470" y1="270" x2="520" y2="162" stroke="#ff6b35" strokeWidth="1" strokeDasharray="4" />
      <line x1="470" y1="280" x2="520" y2="225" stroke="#10b981" strokeWidth="1" strokeDasharray="4" />

      {/* CDN/Static Assets */}
      <rect x="50" y="200" width="150" height="110" rx="8" fill="#1a1a1a" stroke="#4a9eff" strokeWidth="1.5" />
      <text x="125" y="225" textAnchor="middle" fill="#4a9eff" fontSize="10" fontWeight="600">Static Assets</text>

      <rect x="65" y="240" width="55" height="30" rx="4" fill="#2a2a2a" stroke="#4a9eff" strokeOpacity="0.3" />
      <text x="92" y="260" textAnchor="middle" fill="#888" fontSize="7">Images</text>

      <rect x="130" y="240" width="55" height="30" rx="4" fill="#2a2a2a" stroke="#4a9eff" strokeOpacity="0.3" />
      <text x="157" y="260" textAnchor="middle" fill="#888" fontSize="7">Fonts</text>

      <rect x="65" y="275" width="120" height="25" rx="4" fill="#2a2a2a" stroke="#4a9eff" strokeOpacity="0.3" />
      <text x="125" y="292" textAnchor="middle" fill="#888" fontSize="7">PDF Resume</text>

      {/* Arrow from CDN */}
      <line x1="200" y1="250" x2="230" y2="250" stroke="#4a9eff" strokeWidth="1" strokeDasharray="4" />

      {/* Key Features */}
      <rect x="50" y="340" width="600" height="95" rx="8" fill="#1a1a1a" stroke="#333" />
      <text x="350" y="365" textAnchor="middle" fill="#ff6b35" fontSize="11" fontWeight="700">Why This Architecture?</text>

      <text x="130" y="390" textAnchor="middle" fill="#00d4ff" fontSize="10" fontWeight="600">Zero Servers</text>
      <text x="130" y="405" textAnchor="middle" fill="#888" fontSize="7">100% serverless</text>
      <text x="130" y="418" textAnchor="middle" fill="#888" fontSize="7">No ops burden</text>

      <text x="280" y="390" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="600">Global Edge</text>
      <text x="280" y="405" textAnchor="middle" fill="#888" fontSize="7">&lt;50ms TTFB</text>
      <text x="280" y="418" textAnchor="middle" fill="#888" fontSize="7">CDN cached</text>

      <text x="430" y="390" textAnchor="middle" fill="#f7c531" fontSize="10" fontWeight="600">Type-Safe</text>
      <text x="430" y="405" textAnchor="middle" fill="#888" fontSize="7">TypeScript</text>
      <text x="430" y="418" textAnchor="middle" fill="#888" fontSize="7">End-to-end</text>

      <text x="570" y="390" textAnchor="middle" fill="#9b59b6" fontSize="10" fontWeight="600">Cost: $0</text>
      <text x="570" y="405" textAnchor="middle" fill="#888" fontSize="7">Hobby tier</text>
      <text x="570" y="418" textAnchor="middle" fill="#888" fontSize="7">scales to pro</text>
    </svg>
  )
}

const architectureViews = [
  {
    id: 'scale',
    label: 'Scale (Cloud)',
    icon: '🌐',
    title: 'Heterogeneous Compute Platform',
    problem: 'Enterprise AI training demands massive GPU fleets, but Kubernetes wasn\'t designed for cross-cluster resource pooling — each cluster is an isolated island.',
    description: 'Built a recursive K8s-on-K8s compute platform (virtual-node-on-virtual-node) unifying dedicated GPU and serverless CPU pools across clusters into one substrate — the foundation two 0→1 SaaS products run on, for a humanoid-robotics training & simulation customer.',
    diagram: OverviewDiagram,
    details: [
      'Recursive K8s-on-K8s presents isolated clusters as one logical compute substrate',
      'Cross-Cluster Identity Mesh: application-layer routing + per-pod secrets-mount, no static credentials',
      'Two 0→1 SaaS products on top: AI dev workstations + distributed training & simulation scheduler'
    ],
    techStack: ['Virtual Kubelet', 'Golang', 'gRPC', 'Kubernetes'],
    deepDiveLink: '/deep-dive#alibaba'
  },
  {
    id: 'efficiency',
    label: 'Efficiency (Platform)',
    icon: '⚡',
    title: 'LLM Training Platform',
    problem: 'Managing thousands of GPUs across Managed K8s clusters with hardware failures causing millions in idle costs and delayed science.',
    description: 'Built internal tools for an LLM training platform—Airflow DAGs for health checks, GPU serial tracking to block faulty hardware, and binary search-based fault isolation for training divergence issues.',
    diagram: AmazonDiagram,
    details: [
      'Stateful GPU tracking prevents circular termination of faulty hardware',
      'Binary search algorithm isolates training divergence faults in minutes vs hours',
      'Multi-million dollar annual savings through automated fault detection'
    ],
    techStack: ['Airflow', 'Kubernetes', 'Serverless', 'NoSQL'],
    deepDiveLink: '/deep-dive#amazon'
  },
  {
    id: 'product',
    label: 'Product (Web)',
    icon: '🛠️',
    title: 'Serverless Product Engineering',
    problem: 'I don\'t just manage servers; I build products. This portfolio is proof.',
    description: 'This site is a fully serverless application—no VMs, no containers, just code that runs at the edge. Architected for speed, resilience, and zero ops burden.',
    diagram: WebDiagram,
    details: [
      'Next.js with ISR for instant page loads (<50ms TTFB)',
      'Type-safe end-to-end: TypeScript from API to UI',
      'Event-driven architecture with Vercel KV and Resend'
    ],
    techStack: ['Next.js', 'TypeScript', 'Vercel', 'Resend'],
    deepDiveLink: null
  }
]

export default function ArchitectureGallery() {
  const [activeTab, setActiveTab] = useState(0)
  const currentView = architectureViews[activeTab]
  const DiagramComponent = currentView.diagram

  return (
    <section className={styles.gallerySection} id="architecture">
      <div className={styles.impactContainer}>
        <div className={styles.archHeader}>
          <span className={styles.archLabel}>System Architecture Spotlight</span>
          <h2 className={styles.archTitle}>
            Built for Massive-Scale GPU Infrastructure
          </h2>
          <p className={styles.archSubtitle}>
            From a recursive K8s-on-K8s compute platform to the 0→1 SaaS products and multi-agent systems built on top.
            <br />
            Distributed-systems engineering across cloud, platform, and product.
          </p>
        </div>

        <div className={styles.galleryWrapper}>
          {/* Tabs */}
          <div className={styles.galleryTabs}>
            {architectureViews.map((view, index) => (
              <button
                key={view.id}
                onClick={() => setActiveTab(index)}
                className={`${styles.tabButton} ${activeTab === index ? styles.activeTab : ''}`}
              >
                <span className={styles.tabIcon}>{view.icon}</span>
                {view.label}
                {activeTab === index && (
                  <motion.div
                    className={styles.activeTabLine}
                    layoutId="activeTabLine"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className={styles.galleryContent}>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.galleryGrid}
              >
                {/* Visual Side */}
                <div className={styles.galleryVisual}>
                  <div className={styles.imageFrame}>
                    <DiagramComponent />
                  </div>
                  {currentView.id !== 'product' && (
                    <p className={styles.ndaDisclaimer}>
                      <em>Architecture simplified for confidentiality. Patterns represent general industry practices.</em>
                    </p>
                  )}
                </div>

                {/* Narrative Side */}
                <div className={styles.galleryInfo}>
                  <h3 className={styles.projectTitle}>{currentView.title}</h3>

                  {currentView.problem && (
                    <p className={styles.problemStatement}>
                      <strong>The Challenge:</strong> {currentView.problem}
                    </p>
                  )}

                  <p className={styles.projectDesc}>{currentView.description}</p>

                  <div className={styles.featureList}>
                    <h4>Key Engineering Decisions:</h4>
                    <ul>
                      {currentView.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.techStackBadges}>
                    {currentView.techStack.map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </div>

                  {currentView.deepDiveLink && (
                    <Link href={currentView.deepDiveLink} className={styles.deepDiveLink}>
                      Technical Deep Dive →
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
