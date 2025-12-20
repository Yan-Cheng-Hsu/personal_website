import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import styles from '@/styles/Landing.module.css'

// SVG Diagrams for each view
function OverviewDiagram() {
  return (
    <svg viewBox="0 0 700 450" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="gOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f7c531" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a9eff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4a9eff" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
        </linearGradient>
        <marker id="arrOrange" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#ff6b35" />
        </marker>
        <marker id="arrBlue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#4a9eff" />
        </marker>
      </defs>

      {/* Title */}
      <text x="350" y="25" textAnchor="middle" fill="#888" fontSize="12" fontWeight="500">FEDERATED CONTROL PLANE ARCHITECTURE</text>

      {/* User Clusters Row */}
      <text x="350" y="55" textAnchor="middle" fill="#4a9eff" fontSize="10" fontWeight="600">TENANT CLUSTERS</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={80 + i * 150} y={65} width={120} height={55} rx="6" fill="url(#gBlue)" stroke="#4a9eff" strokeWidth="1.5" />
          <text x={140 + i * 150} y={88} textAnchor="middle" fill="#4a9eff" fontSize="10" fontWeight="600">Tenant {String.fromCharCode(65 + i)}</text>
          <text x={140 + i * 150} y={105} textAnchor="middle" fill="#666" fontSize="8">{['AI Training', 'LLM Tuning', 'Robotics', 'Multi-modal'][i]}</text>
        </g>
      ))}

      {/* Arrows from tenants to VK */}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={140 + i * 150} y1={120} x2={350} y2={160} stroke="#4a9eff" strokeWidth="1.5" markerEnd="url(#arrBlue)" />
      ))}

      {/* VK Control Plane */}
      <rect x="100" y="170" width="500" height="80" rx="10" fill="#1a1a1a" stroke="#ff6b35" strokeWidth="2" />
      <text x="350" y="195" textAnchor="middle" fill="#ff6b35" fontSize="12" fontWeight="700">VIRTUAL KUBELET SCHEDULING LAYER</text>

      {/* VK Modules */}
      {['Identity Mesh', 'Storage Orchestrator', 'TimeWindow Scheduler'].map((name, i) => (
        <g key={i}>
          <rect x={130 + i * 160} y={205} width={130} height={35} rx="5" fill="#2a2a2a" stroke="#ff6b35" strokeOpacity="0.4" />
          <text x={195 + i * 160} y={227} textAnchor="middle" fill="#f7c531" fontSize="9" fontWeight="600">{name}</text>
        </g>
      ))}

      {/* Arrows from VK to GPU clusters */}
      {[0, 1, 2].map((i) => (
        <line key={i} x1={200 + i * 150} y1={250} x2={200 + i * 150} y2={290} stroke="#ff6b35" strokeWidth="1.5" markerEnd="url(#arrOrange)" />
      ))}

      {/* GPU Clusters Row */}
      <text x="350" y="310" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="600">BACKEND GPU CLUSTERS</text>
      {['US-West', 'US-East', 'AP-Southeast'].map((region, i) => (
        <g key={i}>
          <rect x={80 + i * 200} y={320} width={160} height={70} rx="8" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="5" />
          <text x={160 + i * 200} y={340} textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="600">{region}</text>
          <rect x={95 + i * 200} y={350} width={55} height={30} rx="4" fill="url(#gGreen)" stroke="#10b981" />
          <text x={122 + i * 200} y={370} textAnchor="middle" fill="#888" fontSize="8">A100×2k</text>
          <rect x={160 + i * 200} y={350} width={55} height={30} rx="4" fill="url(#gGreen)" stroke="#10b981" />
          <text x={187 + i * 200} y={370} textAnchor="middle" fill="#888" fontSize="8">H100×1.5k</text>
        </g>
      ))}

      {/* Region isolation markers */}
      <text x="255" y="365" textAnchor="middle" fill="#ff4444" fontSize="14">✕</text>
      <text x="455" y="365" textAnchor="middle" fill="#ff4444" fontSize="14">✕</text>

      {/* Stats */}
      <g>
        <rect x="150" y="405" width="400" height="35" rx="6" fill="#1a1a1a" stroke="#333" />
        <text x="250" y="427" textAnchor="middle" fill="#ff6b35" fontSize="11" fontWeight="700">Massive-Scale</text>
        <text x="250" y="438" textAnchor="middle" fill="#666" fontSize="8">GPU Fleet</text>
        <text x="350" y="427" textAnchor="middle" fill="#ff6b35" fontSize="14" fontWeight="700">40%</text>
        <text x="350" y="438" textAnchor="middle" fill="#666" fontSize="8">Cost Reduction</text>
        <text x="450" y="427" textAnchor="middle" fill="#ff6b35" fontSize="14" fontWeight="700">25x</text>
        <text x="450" y="438" textAnchor="middle" fill="#666" fontSize="8">Scale Capacity</text>
      </g>
    </svg>
  )
}

// Amazon AGI: Self-Healing Pipeline Diagram
function AmazonDiagram() {
  return (
    <svg viewBox="0 0 700 450" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="gAmazon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9900" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ff9900" stopOpacity="0.05" />
        </linearGradient>
        <marker id="arrAmazon" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#ff9900" />
        </marker>
        <marker id="arrRed" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#ff4444" />
        </marker>
        <marker id="arrGreen2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#10b981" />
        </marker>
      </defs>

      <text x="350" y="25" textAnchor="middle" fill="#888" fontSize="12" fontWeight="500">PLATFORM LEVIATHAN: SELF-HEALING PIPELINE</text>

      {/* GPU Fleet - The Chaos */}
      <text x="100" y="55" fill="#ff4444" fontSize="10" fontWeight="600">GPU FLEET (MASSIVE SCALE)</text>
      <rect x="30" y="65" width="180" height="120" rx="8" fill="#1a1a1a" stroke="#ff4444" strokeWidth="1.5" strokeDasharray="4" />

      {/* GPU nodes with issues */}
      {[0, 1, 2].map((row) => (
        [0, 1, 2, 3].map((col) => (
          <g key={`${row}-${col}`}>
            <rect
              x={45 + col * 40}
              y={80 + row * 35}
              width={30}
              height={25}
              rx="3"
              fill={col === 2 && row === 1 ? '#ff4444' : '#2a2a2a'}
              stroke={col === 2 && row === 1 ? '#ff4444' : '#666'}
              strokeOpacity={col === 2 && row === 1 ? 1 : 0.3}
            />
            <text x={60 + col * 40} y={97 + row * 35} textAnchor="middle" fill={col === 2 && row === 1 ? '#fff' : '#888'} fontSize="6">
              {col === 2 && row === 1 ? '✕' : 'GPU'}
            </text>
          </g>
        ))
      ))}
      <text x="120" y="200" textAnchor="middle" fill="#ff4444" fontSize="8">Idle GPUs = $$ Lost</text>

      {/* Arrow from fleet to detection */}
      <line x1="210" y1="125" x2="250" y2="125" stroke="#ff4444" strokeWidth="2" markerEnd="url(#arrRed)" />
      <text x="230" y="115" fill="#ff4444" fontSize="7">Fault</text>

      {/* Detection Layer */}
      <rect x="260" y="70" width="180" height="110" rx="10" fill="#1a1a1a" stroke="#ff9900" strokeWidth="2" />
      <text x="350" y="95" textAnchor="middle" fill="#ff9900" fontSize="11" fontWeight="700">Airflow DAG Orchestrator</text>

      <rect x="280" y="105" width="140" height="25" rx="4" fill="#2a2a2a" stroke="#ff9900" strokeOpacity="0.5" />
      <text x="350" y="122" textAnchor="middle" fill="#f7c531" fontSize="8">Health Check DAG</text>

      <rect x="280" y="135" width="140" height="25" rx="4" fill="#2a2a2a" stroke="#ff9900" strokeOpacity="0.5" />
      <text x="350" y="152" textAnchor="middle" fill="#f7c531" fontSize="8">GPU Serial Labeler</text>

      {/* Arrow to remediation */}
      <line x1="350" y1="180" x2="350" y2="220" stroke="#ff9900" strokeWidth="2" markerEnd="url(#arrAmazon)" />
      <text x="380" y="205" fill="#ff9900" fontSize="7">Detect</text>

      {/* Remediation Engine */}
      <rect x="260" y="230" width="180" height="100" rx="10" fill="url(#gAmazon)" stroke="#ff9900" strokeWidth="2" />
      <text x="350" y="255" textAnchor="middle" fill="#ff9900" fontSize="11" fontWeight="700">Auto-Remediation</text>

      <rect x="280" y="265" width="65" height="50" rx="4" fill="#2a2a2a" stroke="#10b981" />
      <text x="312" y="285" textAnchor="middle" fill="#10b981" fontSize="7">Node</text>
      <text x="312" y="297" textAnchor="middle" fill="#10b981" fontSize="7">Drain</text>
      <text x="312" y="309" textAnchor="middle" fill="#666" fontSize="6">graceful</text>

      <rect x="355" y="265" width="65" height="50" rx="4" fill="#2a2a2a" stroke="#4a9eff" />
      <text x="387" y="285" textAnchor="middle" fill="#4a9eff" fontSize="7">DCGM</text>
      <text x="387" y="297" textAnchor="middle" fill="#4a9eff" fontSize="7">Reset</text>
      <text x="387" y="309" textAnchor="middle" fill="#666" fontSize="6">auto-fix</text>

      {/* Arrow to healthy fleet */}
      <line x1="350" y1="330" x2="350" y2="370" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrGreen2)" />
      <text x="380" y="355" fill="#10b981" fontSize="7">Fix</text>

      {/* Healthy Fleet Result */}
      <rect x="260" y="380" width="180" height="55" rx="8" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="1.5" />
      <text x="350" y="405" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="600">Healthy Fleet</text>
      <text x="350" y="425" textAnchor="middle" fill="#888" fontSize="8">Auto-recovered → Back to training</text>

      {/* Alert/Monitoring Side */}
      <rect x="500" y="70" width="170" height="200" rx="8" fill="#1a1a1a" stroke="#f7c531" strokeWidth="1.5" />
      <text x="585" y="95" textAnchor="middle" fill="#f7c531" fontSize="10" fontWeight="600">Observability</text>

      <rect x="520" y="110" width="130" height="35" rx="4" fill="#2a2a2a" stroke="#f7c531" strokeOpacity="0.4" />
      <text x="585" y="132" textAnchor="middle" fill="#888" fontSize="8">Prometheus Metrics</text>

      <rect x="520" y="155" width="130" height="35" rx="4" fill="#2a2a2a" stroke="#f7c531" strokeOpacity="0.4" />
      <text x="585" y="177" textAnchor="middle" fill="#888" fontSize="8">PagerDuty Alerts</text>

      <rect x="520" y="200" width="130" height="35" rx="4" fill="#2a2a2a" stroke="#f7c531" strokeOpacity="0.4" />
      <text x="585" y="222" textAnchor="middle" fill="#888" fontSize="8">Grafana Dashboard</text>

      {/* Arrows to monitoring */}
      <line x1="440" y1="125" x2="500" y2="125" stroke="#f7c531" strokeWidth="1" strokeDasharray="4" />
      <line x1="440" y1="280" x2="500" y2="200" stroke="#f7c531" strokeWidth="1" strokeDasharray="4" />

      {/* Stats bar */}
      <rect x="100" y="395" width="120" height="45" rx="6" fill="#1a1a1a" stroke="#333" />
      <text x="160" y="417" textAnchor="middle" fill="#ff9900" fontSize="11" fontWeight="700">Multi-Million</text>
      <text x="160" y="433" textAnchor="middle" fill="#666" fontSize="8">Annual Savings</text>

      <rect x="500" y="305" width="170" height="60" rx="6" fill="#1a1a1a" stroke="#10b981" />
      <text x="585" y="328" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="600">Before → After</text>
      <text x="585" y="348" textAnchor="middle" fill="#888" fontSize="8">Hours → Minutes</text>
      <text x="585" y="360" textAnchor="middle" fill="#10b981" fontSize="8">Drastic MTTR reduction</text>
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
    label: 'Scale (Alibaba)',
    icon: '🌐',
    title: 'Federated AI Infrastructure',
    problem: 'We had to train the Unitree G1 Robot, but our compute was scattered across the world in isolated clusters.',
    description: 'I built a "Virtual Bridge"—a Federated Identity Mesh—to trick a massive heterogeneous GPU fleet into acting as one giant brain. Kubernetes wasn\'t designed for this, so I extended it.',
    diagram: OverviewDiagram,
    details: [
      'Virtual Kubelet presents isolated clusters as a single logical pool',
      'Federated Identity Mesh solves cross-cluster auth with automated token rotation',
      'TimeWindow scheduling shifts workloads to off-peak hours → 40% cost savings'
    ],
    techStack: ['Virtual Kubelet', 'Golang', 'gRPC', 'Kubernetes'],
    deepDiveLink: '/deep-dive'
  },
  {
    id: 'efficiency',
    label: 'Efficiency (Amazon)',
    icon: '⚡',
    title: 'Platform Leviathan',
    problem: 'I saw thousands of GPUs sitting idle. That wasn\'t just money lost; it was science delayed.',
    description: 'Amazon\'s AGI compute spend was spiraling. My job was to stop the bleeding. I built automated Airflow DAGs to enforce discipline on a chaotic fleet—turning manual firefighting into automated peace.',
    diagram: AmazonDiagram,
    details: [
      'Built GPU Serial Number Labeler for hardware-level tracking',
      'Automated node remediation: drain → DCGM reset → reintegrate',
      '~90% reduction in troubleshooting time per incident'
    ],
    techStack: ['Airflow', 'Kubernetes', 'DCGM', 'Prometheus'],
    deepDiveLink: null
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
            Architecting the infrastructure behind the Unitree G1 Robot training.
            <br />
            Solving distributed system challenges at the petabyte scale.
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
