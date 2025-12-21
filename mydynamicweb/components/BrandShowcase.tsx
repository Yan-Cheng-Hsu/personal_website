import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import styles from '@/styles/Landing.module.css'

const brands = [
  {
    name: 'Amazon AGI',
    logo: '/brands/amazon-official.png',
    description: 'Multi-million savings',
    color: '#FF9900',
    isImage: true,
    url: 'https://www.amazon.com'
  },
  {
    name: 'Alibaba Cloud',
    logo: '/brands/alibaba-official.png',
    description: 'Current - SRE II',
    color: '#FF6A00',
    isImage: true,
    url: 'https://www.alibabacloud.com'
  },
  {
    name: 'Amazon Nova',
    logo: '/brands/nova-official.png',
    description: 'Co-Author',
    color: '#9B59B6',
    isImage: true,
    url: 'https://nova.amazon.com'
  },
  {
    name: 'Unitree Robotics',
    logo: '/brands/unitree-text-logo.png',
    description: '25x Scaling for G1-D',
    color: '#333333',
    isImage: true,
    url: 'https://www.unitree.com/G1-D/'
  },
  {
    name: 'UC San Diego',
    logo: '/pics/ucsd_icon.png',
    description: 'M.S. Computer Science',
    color: '#00629B',
    isImage: true,
    url: 'https://ucsd.edu'
  }
]

export default function BrandShowcase() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <section className={styles.brandSection} ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className={styles.brandContainer}
      >
        <h3 className={styles.brandTitle}>Where I've Made Impact</h3>
        <div className={styles.brandGrid}>
          {brands.map((brand, index) => (
            <motion.a
              key={index}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.brandCard}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className={styles.brandLogo}>
                {brand.isImage ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={60}
                    style={{ objectFit: 'contain' }}
                  />
                ) : (
                  <span style={{ fontSize: '3rem' }}>{brand.logo}</span>
                )}
              </div>
              <div className={styles.brandName}>{brand.name}</div>
              <div className={styles.brandDescription}>{brand.description}</div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}