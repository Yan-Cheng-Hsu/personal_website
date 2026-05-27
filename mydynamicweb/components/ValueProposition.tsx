import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from '@/styles/Landing.module.css'

const offerings = [
  {
    icon: '🏗️',
    title: 'Cross-Cluster Architecture Expert',
    description: 'Designed Dual-Layer Virtual Kubelet for massive-scale heterogeneous GPU fleets',
    details: [
      'Unified Resource Orchestration across clusters',
      'Federated Identity Mesh with secure AuthN/AuthZ',
      'Hybrid Network Fabric for low-latency communication',
      '25x capacity scaling for humanoid-robotics training'
    ]
  },
  {
    icon: '💰',
    title: 'Massive Cost Savings',
    description: 'Proven track record of multi-million dollar optimizations',
    details: [
      'Multi-million dollar annual savings at Amazon AGI',
      '40% cost reduction at Alibaba Cloud',
      'Migration from Serverless to Reserved instances',
      'Thousands of scaling requests handled efficiently'
    ]
  },
  {
    icon: '🤖',
    title: 'Multi-Agent Systems & LLM Agent Architecture',
    description: 'Authored RCAgent — a trust-first multi-agent kernel for distributed-systems incident triage',
    details: [
      'Supervisor-Worker architecture with a 4-Gate Hallucination Defense',
      'New-skill gating via pass^3 ≥ 80% (Anthropic τ-bench consistency metric)',
      'Meta-Tool over a hierarchical skill tree — avg 6 of 200+ tools per call',
      '~40% auto-healing on confirmed-cause incidents'
    ]
  },
  {
    icon: '🔐',
    title: 'Security & Reliability at Scale',
    description: 'Enterprise-grade security for AI/ML infrastructure',
    details: [
      'Novel credential injection via Service Accounts',
      'Automated token rotation for Cross-Cluster auth',
      'Secure Enclave telemetry with DCGM metrics',
      'Significant engineer-hours saved monthly via automation'
    ]
  }
]

export default function ValueProposition() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <section className={styles.valueSection} ref={ref}>
      <motion.h2
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        What I Bring to Your Team
      </motion.h2>

      <div className={styles.valueGrid}>
        {offerings.map((offer, index) => (
          <motion.div
            key={index}
            className={styles.valueCard}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,112,243,0.2)' }}
          >
            <div className={styles.valueIcon}>{offer.icon}</div>
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <ul className={styles.valueDetails}>
              {offer.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}