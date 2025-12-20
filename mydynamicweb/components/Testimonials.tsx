import { motion } from 'framer-motion'
import styles from '@/styles/Landing.module.css'

const testimonial = {
  quotes: [
    "Mr. Hsu possesses a rare combination of expertise in GPU cluster management, distributed systems, and Kubernetes orchestration that is essential for building the next generation of AI training platforms.",
    "His most significant contribution has been the design and implementation of our Dual-Layer Virtual Kubelet architecture, a groundbreaking system that enables centralized orchestration of a massive-scale heterogeneous GPU fleet across multiple clusters—achieving ~40% TCO reduction while expanding training capacity by 25x."
  ],
  author: "Panfeng Zhou",
  title: "Senior Staff Engineer",
  company: "Alibaba Cloud",
  credential: "20+ years in database & distributed systems • Led team that set TPC-C world record",
  linkedIn: "https://www.linkedin.com/in/panfeng-zhou-a16a934/"
}

export default function Testimonials() {
  return (
    <section className={styles.testimonialsSection}>
      <motion.h2
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        What People Say About My Work
      </motion.h2>

      <div className={styles.testimonialsContainer}>
        <motion.div
          className={styles.testimonialCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.quoteIcon}>"</div>
          <div className={styles.testimonialQuote}>
            {testimonial.quotes.map((quote, index) => (
              <p key={index} style={{ marginBottom: index < testimonial.quotes.length - 1 ? '1rem' : 0 }}>
                {quote}
              </p>
            ))}
          </div>
          <div className={styles.testimonialAuthor}>
            <a
              href={testimonial.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.authorLink}
            >
              <strong>{testimonial.author}</strong>
            </a>
            <span>{testimonial.title}, {testimonial.company}</span>
            <span className={styles.testimonialCredential}>
              {testimonial.credential}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}