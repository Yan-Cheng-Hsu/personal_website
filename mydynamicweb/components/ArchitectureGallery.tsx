import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import styles from '@/styles/Landing.module.css'

// SVG Diagrams for each view
function OverviewDiagram() {
  return (
    <svg viewBox="0 0 700 480" style={{ width: '100%', height: 'auto' }}>
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
        <linearGradient id="gPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b59b6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#9b59b6" stopOpacity="0.05" />
        </linearGradient>
        <marker id="arrOrange" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#ff6b35" />
        </marker>
        <marker id="arrBlue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#4a9eff" />
        </marker>
        <marker id="arrPurple" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#9b59b6" />
        </marker>
        <marker id="arrGreen" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#10b981" />
        </marker>
      </defs>

      {/* Title */}
      <text x="350" y="20" textAnchor="middle" fill="#888" fontSize="11" fontWeight="500">K8S ON K8S: RECURSIVE VIRTUALIZATION ARCHITECTURE</text>

      {/* ========== L1: User/Tenant Clusters ========== */}
      <text x="55" y="50" fill="#4a9eff" fontSize="9" fontWeight="600">L1</text>
      <rect x="70" y="35" width="560" height="50" rx="8" fill="none" stroke="#4a9eff" strokeWidth="1" strokeDasharray="4" />
      <text x="350" y="52" textAnchor="middle" fill="#4a9eff" fontSize="9" fontWeight="600">ACK FRONTEND (User Clusters)</text>

      {/* Tenant boxes */}
      {['Unitree G1', 'LLM Training', 'Multi-modal'].map((name, i) => (
        <g key={i}>
          <rect x={100 + i * 180} y={58} width={140} height={22} rx="4" fill="url(#gBlue)" stroke="#4a9eff" strokeWidth="1" />
          <text x={170 + i * 180} y={73} textAnchor="middle" fill="#4a9eff" fontSize="8" fontWeight="500">{name}</text>
        </g>
      ))}

      {/* VK Layer 1 Arrow */}
      <line x1="350" y1="85" x2="350" y2="105" stroke="#4a9eff" strokeWidth="2" markerEnd="url(#arrBlue)" />
      <text x="385" y="100" fill="#4a9eff" fontSize="7">VK Layer 1</text>

      {/* ========== L2: CPU Cluster (The Brain) ========== */}
      <text x="55" y="125" fill="#9b59b6" fontSize="9" fontWeight="600">L2</text>
      <rect x="70" y="110" width="560" height="115" rx="10" fill="#1a1a1a" stroke="#9b59b6" strokeWidth="2" />
      <text x="350" y="128" textAnchor="middle" fill="#9b59b6" fontSize="10" fontWeight="700">CPU CLUSTER - Control Plane (The Brain)</text>

      {/* Master components row 1 */}
      <rect x="90" y="138" width="100" height="35" rx="5" fill="url(#gPurple)" stroke="#9b59b6" strokeWidth="1" />
      <text x="140" y="153" textAnchor="middle" fill="#9b59b6" fontSize="8" fontWeight="600">Master API</text>
      <text x="140" y="165" textAnchor="middle" fill="#666" fontSize="7">Server</text>

      <rect x="200" y="138" width="100" height="35" rx="5" fill="url(#gPurple)" stroke="#9b59b6" strokeWidth="1" />
      <text x="250" y="153" textAnchor="middle" fill="#9b59b6" fontSize="8" fontWeight="600">Ray Head</text>
      <text x="250" y="165" textAnchor="middle" fill="#666" fontSize="7">Job Controller</text>

      {/* Internal CLB - Key component */}
      <rect x="310" y="138" width="110" height="35" rx="5" fill="#2a1a2a" stroke="#ff6b35" strokeWidth="2" />
      <text x="365" y="153" textAnchor="middle" fill="#ff6b35" fontSize="8" fontWeight="700">Internal CLB</text>
      <text x="365" y="165" textAnchor="middle" fill="#f7c531" fontSize="7">VPC Endpoint</text>

      <rect x="430" y="138" width="100" height="35" rx="5" fill="url(#gPurple)" stroke="#9b59b6" strokeWidth="1" />
      <text x="480" y="153" textAnchor="middle" fill="#9b59b6" fontSize="8" fontWeight="600">Virtual Node</text>
      <text x="480" y="165" textAnchor="middle" fill="#666" fontSize="7">GPU Pool Target</text>

      <rect x="540" y="138" width="80" height="35" rx="5" fill="url(#gPurple)" stroke="#9b59b6" strokeWidth="1" />
      <text x="580" y="153" textAnchor="middle" fill="#9b59b6" fontSize="8" fontWeight="600">Billing</text>
      <text x="580" y="165" textAnchor="middle" fill="#666" fontSize="7">Quota</text>

      {/* VK Layer 2 modules */}
      <text x="350" y="188" textAnchor="middle" fill="#ff6b35" fontSize="8" fontWeight="600">VK LAYER 2 INJECTION MODULES</text>
      {['Identity Mesh', 'Storage Orchestrator', 'TimeWindow Scheduler'].map((name, i) => (
        <g key={i}>
          <rect x={100 + i * 175} y={195} width={155} height={24} rx="4" fill="#2a2a2a" stroke="#ff6b35" strokeOpacity="0.6" />
          <text x={177 + i * 175} y={211} textAnchor="middle" fill="#f7c531" fontSize="8" fontWeight="500">{name}</text>
        </g>
      ))}

      {/* VK Layer 2 Arrows - one for each GPU cluster */}
      <line x1="177" y1="219" x2="177" y2="260" stroke="#ff6b35" strokeWidth="1.5" markerEnd="url(#arrOrange)" />
      <line x1="352" y1="219" x2="352" y2="260" stroke="#ff6b35" strokeWidth="1.5" markerEnd="url(#arrOrange)" />
      <line x1="527" y1="219" x2="527" y2="260" stroke="#ff6b35" strokeWidth="1.5" markerEnd="url(#arrOrange)" />
      <text x="560" y="245" fill="#ff6b35" fontSize="7">VK Layer 2</text>

      {/* ========== L3: GPU Clusters (The Muscle) ========== */}
      <text x="55" y="285" fill="#10b981" fontSize="9" fontWeight="600">L3</text>
      <rect x="70" y="270" width="560" height="100" rx="10" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5" />
      <text x="350" y="288" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="700">GPU CLUSTERS - Data Plane (The Muscle)</text>

      {/* GPU Cluster boxes */}
      {['GPU Pool A', 'GPU Pool B', 'GPU Pool C'].map((name, i) => (
        <g key={i}>
          <rect x={90 + i * 185} y={298} width={165} height={60} rx="6" fill="url(#gGreen)" stroke="#10b981" strokeWidth="1" />
          <text x={172 + i * 185} y={318} textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="600">{name}</text>
          <text x={172 + i * 185} y={335} textAnchor="middle" fill="#888" fontSize="7">Ray Worker Pods</text>
          <text x={172 + i * 185} y={350} textAnchor="middle" fill="#666" fontSize="6">Same VPC</text>
        </g>
      ))}

      {/* Feedback arrows from EACH GPU cluster back to CLB */}
      <path d="M 130 298 Q 100 250 365 173" fill="none" stroke="#ff6b35" strokeWidth="1" strokeDasharray="3" markerEnd="url(#arrOrange)" />
      <path d="M 310 298 Q 310 250 365 173" fill="none" stroke="#ff6b35" strokeWidth="1" strokeDasharray="3" markerEnd="url(#arrOrange)" />
      <path d="M 490 298 Q 520 250 365 173" fill="none" stroke="#ff6b35" strokeWidth="1" strokeDasharray="3" markerEnd="url(#arrOrange)" />
      <text x="580" y="275" fill="#ff6b35" fontSize="6">↑ All traffic via CLB</text>

      {/* Stats bar */}
      <rect x="120" y="385" width="460" height="55" rx="8" fill="#1a1a1a" stroke="#333" />
      <text x="350" y="405" textAnchor="middle" fill="#888" fontSize="8">KEY ACHIEVEMENTS</text>

      <text x="200" y="425" textAnchor="middle" fill="#ff6b35" fontSize="12" fontWeight="700">40%</text>
      <text x="200" y="437" textAnchor="middle" fill="#666" fontSize="7">Cost Reduction</text>

      <text x="350" y="425" textAnchor="middle" fill="#ff6b35" fontSize="12" fontWeight="700">25x</text>
      <text x="350" y="437" textAnchor="middle" fill="#666" fontSize="7">Capacity Scale</text>

      <text x="500" y="425" textAnchor="middle" fill="#ff6b35" fontSize="12" fontWeight="700">Zero</text>
      <text x="500" y="437" textAnchor="middle" fill="#666" fontSize="7">Downtime Rotation</text>
    </svg>
  )
}

// Amazon AGI: LLM Training Platform Architecture
function AmazonDiagram() {
  return (
    <svg viewBox="0 0 700 420" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="gAmazon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9900" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ff9900" stopOpacity="0.05" />
        </linearGradient>
        <marker id="arrAmazon" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#ff9900" />
        </marker>
        <marker id="arrGreen2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#10b981" />
        </marker>
      </defs>

      <text x="350" y="25" textAnchor="middle" fill="#888" fontSize="12" fontWeight="500">LLM TRAINING PLATFORM ARCHITECTURE</text>

      {/* Scientist / CLI */}
      <rect x="50" y="50" width="120" height="70" rx="10" fill="#1a1a1a" stroke="#ff9900" strokeWidth="2" />
      <text x="110" y="80" textAnchor="middle" fill="#ff9900" fontSize="11" fontWeight="700">Scientist</text>
      <text x="110" y="100" textAnchor="middle" fill="#f7c531" fontSize="9">CLI Tool</text>

      {/* Arrow to API */}
      <line x1="170" y1="85" x2="220" y2="85" stroke="#ff9900" strokeWidth="2" markerEnd="url(#arrAmazon)" />

      {/* API Layer */}
      <rect x="230" y="40" width="160" height="90" rx="10" fill="#1a1a1a" stroke="#ff9900" strokeWidth="2" />
      <text x="310" y="65" textAnchor="middle" fill="#ff9900" fontSize="10" fontWeight="700">RESTful APIs</text>
      <rect x="250" y="75" width="120" height="22" rx="4" fill="#2a2a2a" stroke="#ff9900" strokeOpacity="0.5" />
      <text x="310" y="91" textAnchor="middle" fill="#f7c531" fontSize="8">API Gateway</text>
      <rect x="250" y="100" width="120" height="22" rx="4" fill="#2a2a2a" stroke="#ff9900" strokeOpacity="0.5" />
      <text x="310" y="116" textAnchor="middle" fill="#f7c531" fontSize="8">AWS Lambda</text>

      {/* Arrow to Airflow */}
      <line x1="310" y1="130" x2="310" y2="170" stroke="#ff9900" strokeWidth="2" markerEnd="url(#arrAmazon)" />

      {/* Airflow DAGs */}
      <rect x="200" y="180" width="220" height="100" rx="10" fill="url(#gAmazon)" stroke="#ff9900" strokeWidth="2" />
      <text x="310" y="205" textAnchor="middle" fill="#ff9900" fontSize="11" fontWeight="700">Airflow DAGs</text>
      <rect x="220" y="215" width="90" height="25" rx="4" fill="#2a2a2a" stroke="#10b981" />
      <text x="265" y="232" textAnchor="middle" fill="#10b981" fontSize="8">Health Check</text>
      <rect x="320" y="215" width="90" height="25" rx="4" fill="#2a2a2a" stroke="#4a9eff" />
      <text x="365" y="232" textAnchor="middle" fill="#4a9eff" fontSize="8">Divergence Test</text>
      <rect x="220" y="245" width="190" height="25" rx="4" fill="#2a2a2a" stroke="#f7c531" />
      <text x="315" y="262" textAnchor="middle" fill="#f7c531" fontSize="8">Node Remediation</text>

      {/* Arrow to EKS */}
      <line x1="310" y1="280" x2="310" y2="320" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrGreen2)" />

      {/* EKS Clusters */}
      <rect x="180" y="330" width="260" height="70" rx="10" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2" />
      <text x="310" y="355" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="700">AWS EKS Clusters</text>
      <text x="310" y="375" textAnchor="middle" fill="#888" fontSize="9">7,000+ GPUs | Training Jobs</text>
      <text x="310" y="390" textAnchor="middle" fill="#10b981" fontSize="8">H100 / A100 Fleet</text>

      {/* Persistent Layer - Right side */}
      <rect x="480" y="50" width="170" height="180" rx="10" fill="#1a1a1a" stroke="#9b59b6" strokeWidth="2" />
      <text x="565" y="75" textAnchor="middle" fill="#9b59b6" fontSize="10" fontWeight="700">Persistent Layer</text>

      <rect x="500" y="90" width="130" height="35" rx="4" fill="#2a2a2a" stroke="#9b59b6" strokeOpacity="0.5" />
      <text x="565" y="112" textAnchor="middle" fill="#888" fontSize="8">Job Table</text>

      <rect x="500" y="135" width="130" height="35" rx="4" fill="#2a2a2a" stroke="#9b59b6" strokeOpacity="0.5" />
      <text x="565" y="157" textAnchor="middle" fill="#888" fontSize="8">GPU Serial History</text>

      <rect x="500" y="180" width="130" height="35" rx="4" fill="#2a2a2a" stroke="#9b59b6" strokeOpacity="0.5" />
      <text x="565" y="202" textAnchor="middle" fill="#888" fontSize="8">Cluster Metadata</text>

      {/* Arrows to DB */}
      <line x1="390" y1="110" x2="480" y2="110" stroke="#9b59b6" strokeWidth="1" strokeDasharray="4" />
      <line x1="420" y1="230" x2="480" y2="160" stroke="#9b59b6" strokeWidth="1" strokeDasharray="4" />

      {/* Stats bar */}
      <rect x="480" y="260" width="170" height="90" rx="8" fill="#1a1a1a" stroke="#333" />
      <text x="565" y="285" textAnchor="middle" fill="#ff9900" fontSize="10" fontWeight="600">Key Results</text>
      <text x="565" y="308" textAnchor="middle" fill="#10b981" fontSize="9">96% faster fault isolation</text>
      <text x="565" y="328" textAnchor="middle" fill="#f7c531" fontSize="9">$M+ annual savings</text>
      <text x="565" y="343" textAnchor="middle" fill="#888" fontSize="8">Zero circular termination</text>
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
    problem: 'Enterprise AI training demands massive GPU fleets, but Kubernetes wasn\'t designed for cross-cluster orchestration at this scale.',
    description: 'Built a Ray AI SaaS platform on ACK (Alibaba Cloud Kubernetes) with dual-layer Virtual Kubelet architecture. This powers training for customers like Unitree G1 humanoid robots, unifying isolated GPU clusters into one logical pool.',
    diagram: OverviewDiagram,
    details: [
      'Virtual Kubelet presents isolated clusters as a single logical pool',
      'Federated Identity Mesh solves cross-cluster auth with automated token rotation',
      'TimeWindow scheduling shifts workloads to off-peak hours → 40% cost savings'
    ],
    techStack: ['Virtual Kubelet', 'Golang', 'gRPC', 'Kubernetes'],
    deepDiveLink: '/deep-dive#alibaba'
  },
  {
    id: 'efficiency',
    label: 'Efficiency (Amazon)',
    icon: '⚡',
    title: 'LLM Training Platform',
    problem: 'Managing 7,000+ GPUs across EKS clusters with hardware failures causing millions in idle costs and delayed science.',
    description: 'Built internal tools for Amazon AGI\'s LLM training platform—Airflow DAGs for health checks, GPU serial tracking to block faulty hardware, and binary search-based fault isolation for training divergence issues.',
    diagram: AmazonDiagram,
    details: [
      'Stateful GPU tracking prevents circular termination of faulty hardware',
      'Binary search algorithm isolates training divergence faults in minutes vs hours',
      'Multi-million dollar annual savings through automated fault detection'
    ],
    techStack: ['Airflow', 'Kubernetes', 'AWS Lambda', 'DynamoDB'],
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
            From Ray AI SaaS for Unitree robotics to self-healing GPU fleets at Amazon.
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
