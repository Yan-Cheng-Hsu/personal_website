import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from '@/styles/Landing.module.css'
import Link from 'next/link'
import Image from 'next/image'

const roles = [
  "Built a Heterogeneous Compute Platform for Multi-Cluster AI Training 🚀",
  "Shipped Two 0→1 SaaS Products on a Recursive K8s Platform 🛠️",
  "Authored a Trust-First Multi-Agent RCA Kernel 🤖",
  "Delivered Multi-Million Dollar GPU-Fleet Savings at Amazon AGI 💰",
  "25x Capacity Scaling at ~40% TCO Reduction 📈",
  "Cited 159+ times on Google Scholar — incl. industrial patent citation 📚"
]

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length)
        setIsVisible(true)
      }, 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.hero}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.heroContent}
      >
        <div className={styles.availability}>
          <span className={styles.statusDot}></span>
          Available for Senior/Staff SDE | MLE Roles | GPU/AI Infrastructure Specialist
        </div>

        <div className={styles.heroProfile}>
          <motion.div
            className={styles.profileImageWrapper}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/pics/resume_photo.jpg"
              alt="Bill Hsu"
              width={180}
              height={180}
              className={styles.profileImage}
              priority
            />
          </motion.div>
        </div>

        <h1 className={styles.heroTitle}>
          Hi, I'm <span className={styles.highlight}>Bill Hsu</span>
        </h1>

        <div className={styles.roleContainer}>
          <motion.p
            className={styles.currentRole}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {roles[currentRole]}
          </motion.p>
        </div>

        <p className={styles.heroSubtitle}>
          Infrastructure Software Engineer II @ Alibaba Cloud | Ex-Amazon AGI
          <br />
          Building the infrastructure that powers next-gen AI
        </p>

        <div className={styles.heroCTA}>
          <Link href="https://www.linkedin.com/in/yan-cheng-hsu/" className={styles.linkedinBtn} target="_blank">
            <Image
              src="/brands/linkedin.png"
              alt="LinkedIn"
              width={24}
              height={24}
              style={{ marginRight: '0.5rem' }}
            />
            Connect on LinkedIn
          </Link>
          <Link href="#schedule" className={styles.primaryBtn}>
            📅 Schedule a Call
          </Link>
          <Link href="/cv_26Q2.pdf" className={styles.secondaryBtn} target="_blank">
            📄 Download Resume
          </Link>
        </div>

        <div className={styles.scrollIndicator}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ↓ See My Impact ↓
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}