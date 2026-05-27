import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import { projects } from '@/data/projects'

export default function Projects() {
  return (
    <Layout
      title="Projects"
      description="Earlier UCSD coursework projects by Yan-Cheng (Bill) Hsu — web servers, distributed systems, B+ tree indexing, recommender systems, computer vision. For recent production AI infrastructure work, see /deep-dive."
    >
      <div className={styles.section}>
        <h1 className={styles.sectionTitle}>UCSD Coursework Projects</h1>
        <p style={{ opacity: 0.75, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Earlier projects from my graduate coursework at UC San Diego (2021–2023).{' '}
          For recent production AI infrastructure case studies, see{' '}
          <Link href="/deep-dive" style={{ color: '#4a9eff' }}>
            Deep Dives →
          </Link>
        </p>

        {projects.map((project) => (
          <div key={project.id} className={styles.expCard}>
            <div>
              <Link href={project.image} target="_blank">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className={styles.logo}
                />
              </Link>
            </div>
            <div className={styles.expContent}>
              <h3>{project.title}</h3>
              <ul>
                {project.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
              <div className={styles.expMeta}>
                <h6>
                  <strong>Motivation:</strong> {project.motivation}
                </h6>
                <h6>
                  <strong>Date:</strong> {project.date}
                </h6>
              </div>
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className={styles.linkIcon}
                >
                  <Image
                    src="/pics/github.png"
                    alt="GitHub"
                    width={25}
                    height={25}
                  />
                  <span>GitHub</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
