import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import dynamic from 'next/dynamic'
import { timelineData } from '../utils/constants'

const Chrono = dynamic(
  () => import('react-chrono').then((mod) => mod.Chrono),
  { ssr: false }
)

export default function AboutMe() {
  return (
    <Layout
      title="About Me"
      description="About Yan-Cheng (Bill) Hsu - Infrastructure Software Engineer at Alibaba Cloud specializing in AI Training Platform and GPU Infrastructure. MS in CS from UC San Diego."
    >
      <div className={styles.section}>
        <h1 className={styles.sectionTitle}>About Me</h1>

        <div className={styles.aboutGrid}>
          <div className={styles.aboutImage}>
            <Image
              className={styles.logo}
              src="/pics/selfy_2.jpeg"
              alt="Bill Hsu"
              width={400}
              height={535}
              priority
            />
            <div className={styles.resumeButton}>
              <Link
                href="/cv_25Q4.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button type="button" className={styles.btnPrimary}>
                  View My Resume (SRE/SDE/Infra)
                </button>
              </Link>
            </div>
          </div>

          <div className={styles.aboutContent}>
            <h4>Message for Recruiters & Hiring Managers</h4>

            <p>
              I am Yan-Cheng (Bill) Hsu, an Infrastructure Software Engineer II at Alibaba Cloud,
              specializing in AI Training Platform resource management. With a Master&apos;s
              degree from UC San Diego, I bring deep expertise in building and managing
              large-scale GPU infrastructure for AI/ML workloads.
            </p>

            <p>
              At Alibaba Cloud, I architect cross-cluster AI training infrastructure for
              cutting-edge robotics (Unitree G1-D), designing systems that centralize
              massive-scale heterogeneous GPU fleets with ~40% TCO reduction and 25x capacity scaling. My work on Federated
              Identity Mesh and AIOps observability demonstrates my ability to solve
              complex distributed systems challenges.
            </p>

            <p>
              Previously at Amazon AGI Org, I built the GPU infrastructure powering Amazon
              NOVA, architecting systems that delivered multi-million dollar annual savings and reduced
              troubleshooting time by ~90% per incident. I&apos;m a co-author
              on the Amazon Nova technical report.
            </p>

            <p>
              My research includes publications in Sensors journal and IEEE APSIPA ASC 2023
              on deep learning and time series transformers. I combine strong systems
              engineering skills with AI/ML expertise to build reliable, cost-effective
              infrastructure at scale.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h1 className={styles.sectionTitle}>Career Timeline</h1>

        <div className={styles.timelineContainer}>
          <Chrono
            items={timelineData}
            mode="VERTICAL_ALTERNATING"
            slideShow
            slideItemDuration={1500}
            slideShowType="reveal"
            theme={{
              primary: '#ff6b35',
              secondary: '#1a1a1a',
              cardBgColor: '#2a2a2a',
              titleColor: '#ff6b35',
              titleColorActive: '#ff6b35',
            }}
            mediaSettings={{
              align: 'right',
            }}
            fontSizes={{
              cardSubtitle: '0.9rem',
              cardText: '0.8rem',
              cardTitle: '1.1rem',
              title: '1rem',
            }}
          />
        </div>
      </div>
    </Layout>
  )
}
