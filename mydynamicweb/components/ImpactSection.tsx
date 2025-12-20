import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import CountUp from 'react-countup'
import CostOptimizationModal from './CostOptimizationModal'
import styles from '@/styles/Landing.module.css'

const experiences = [
  {
    name: 'Amazon AGI',
    logo: '/brands/amazon-official.png',
    descriptions: [
      'Multi-million dollar infrastructure savings',
      'Architected Cross-Cluster systems for massive-scale GPU fleets',
      'Built self-healing AIOps drastically reducing MTTR'
    ],
    url: 'https://www.amazon.com',
    color: '#ff6b35',
    hasStrategyModal: true
  },
  {
    name: 'Alibaba Cloud',
    logo: '/brands/alibaba-official.png',
    descriptions: [
      'Current - Infrastructure Software Engineer II',
      'AI Training Platform resource management',
      'Significant cost reduction through optimization'
    ],
    url: 'https://www.alibabacloud.com',
    color: '#f7c531'
  },
  {
    name: 'Amazon Nova',
    logo: '/brands/nova-official.png',
    descriptions: [
      'Co-Author on Amazon Nova Technical Report',
      'Contributed to frontier AI model development',
      'Published Dec 2024'
    ],
    url: 'https://nova.amazon.com',
    color: '#9b59b6'
  },
  {
    name: 'Unitree Robotics',
    logo: '/brands/unitree-text-logo.png',
    descriptions: [
      'Order-of-magnitude scaling for G1 humanoid robot training',
      'GPU infrastructure for reinforcement learning',
      'Cross-cluster orchestration'
    ],
    url: 'https://www.unitree.com/G1-D/',
    color: '#e74c3c'
  },
  {
    name: 'UC San Diego',
    logo: '/pics/ucsd_icon.png',
    descriptions: [
      'M.S. Computer Science (AI/ML focus), 2023',
      'Computational Neuroscience & Machine Learning Research',
      'Full-stack Developer @ UCSD IT'
    ],
    url: 'https://ucsd.edu',
    color: '#3498db'
  }
]

const highlightMetrics = [
  { label: 'Massive-Scale GPU Fleet', icon: '🖥️', color: '#ff6b35' },
  { label: 'Drastic MTTR Reduction', icon: '⚡', color: '#f7c531' },
  { value: 3, suffix: '+', label: 'Publications', icon: '📄', color: '#9b59b6' },
]

export default function ImpactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section className={styles.impactSection} ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className={styles.impactContainer}
      >
        <h2 className={styles.impactTitle}>Where I've Made Impact</h2>

        {/* Highlight Metrics Row */}
        <div className={styles.highlightMetrics}>
          {highlightMetrics.map((metric, index) => (
            <motion.div
              key={index}
              className={styles.highlightMetric}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <span className={styles.highlightIcon}>{metric.icon}</span>
              {metric.value !== undefined ? (
                <span className={styles.highlightValue} style={{ color: metric.color }}>
                  {inView && (
                    <CountUp
                      start={0}
                      end={metric.value}
                      duration={2}
                      suffix={metric.suffix}
                    />
                  )}
                </span>
              ) : null}
              <span className={styles.highlightLabel}>{metric.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Experience Cards */}
        <div className={styles.experienceGrid}>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={styles.experienceCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              style={{ borderLeft: `4px solid ${exp.color}` }}
            >
              <a
                href={exp.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className={styles.experienceHeader}>
                  <div className={styles.experienceLogo}>
                    <Image
                      src={exp.logo}
                      alt={exp.name}
                      width={120}
                      height={60}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <h3 className={styles.experienceName}>{exp.name}</h3>
                </div>

                <ul className={styles.experienceDescriptions}>
                  {exp.descriptions.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </a>

              {exp.hasStrategyModal && (
                <button
                  className={styles.strategyLink}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsModalOpen(true)
                  }}
                >
                  <span>🔍</span>
                  See the optimization strategy
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <CostOptimizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}
