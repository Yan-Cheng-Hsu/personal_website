import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Landing.module.css'
import homeStyles from '@/styles/Home.module.css'
import HeroSection from '@/components/HeroSection'
import ImpactSection from '@/components/ImpactSection'
import ValueProposition from '@/components/ValueProposition'
import SkillsMatrix from '@/components/SkillsMatrix'
import ArchitectureGallery from '@/components/ArchitectureGallery'
import Testimonials from '@/components/Testimonials'
import ScheduleSection from '@/components/ScheduleSection'
import Analytics from '@/components/Analytics'
import ThemeToggle from '@/components/ThemeToggle'
import Image from 'next/image'
import { scholarProfile } from '@/data/scholar'

export default function Index() {
  return (
    <>
      <Head>
        <title>Bill Hsu | SDE/SRE/MLE @ Alibaba Cloud | GPU Infrastructure Expert</title>
        <meta
          name="description"
          content="Yan-Cheng (Bill) Hsu - Infrastructure Software Engineer specializing in AI Platforms & Kubernetes. Architected Cross-Cluster systems for massive-scale GPU fleets, delivering multi-million dollar savings. Ex-Amazon AGI, UCSD MS CS."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Yan-Cheng (Bill) Hsu" />
        <meta
          name="keywords"
          content="SDE, SRE, MLE, Software Engineer, Site Reliability Engineer, Machine Learning Engineer, GPU Infrastructure, AI Training, Kubernetes, Cross-Cluster Architecture, Amazon AGI, Alibaba Cloud, Bill Hsu"
        />
        <meta property="og:title" content="Bill Hsu | SDE/SRE/MLE & GPU Infrastructure Expert" />
        <meta
          property="og:description"
          content="Building Cross-Cluster infrastructure that powers next-gen AI. Architected systems for massive-scale GPU fleets with multi-million dollar impact."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bill-yc-hsu.com" />
        <meta property="og:image" content="https://bill-yc-hsu.com/pics/resume_photo.jpg" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://bill-yc-hsu.com/pics/resume_photo.jpg" />
        <link rel="canonical" href="https://bill-yc-hsu.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Analytics />
      <ThemeToggle />

      {/* Floating Navigation */}
      <nav className={homeStyles.navbar}>
        <div className={homeStyles.navContainer}>
          <Link href="/" className={homeStyles.navLogo}>
            <span>Bill Hsu</span>
          </Link>

          <div className={homeStyles.navLinks}>
            <Link href="/deep-dive" className={homeStyles.techBlogBtn}>
              📚 Tech Blogs
            </Link>
            <Link href="#schedule" className={homeStyles.scheduleBtn}>
              📅 Schedule Call
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <HeroSection />
        <ImpactSection />
        <ValueProposition />
        <SkillsMatrix />
        <ArchitectureGallery />
        <Testimonials />
        <ScheduleSection />
      </main>

      <footer className={homeStyles.footer}>
        <div>
          <p>&copy; {new Date().getFullYear()} Yan-Cheng (Bill) Hsu. All rights reserved.</p>
          <p style={{ fontSize: '0.9rem', marginTop: '1rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="https://www.linkedin.com/in/yan-cheng-hsu/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Image src="/brands/linkedin.png" alt="LinkedIn" width={20} height={20} />
              LinkedIn
            </Link>
            <span style={{ opacity: 0.5 }}>•</span>
            <Link href="https://github.com/Yan-Cheng-Hsu" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Image src="/brands/github.png" alt="GitHub" width={20} height={20} />
              GitHub
            </Link>
            <span style={{ opacity: 0.5 }}>•</span>
            <Link href={scholarProfile.scholarUrl} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Image src="/pics/googlescholar_icon.png" alt="Google Scholar" width={20} height={20} />
              Scholar ({scholarProfile.totalCitations}+ citations)
            </Link>
            <span style={{ opacity: 0.5 }}>•</span>
            <Link href="mailto:bill.ych.jobs@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ✉️ Email
            </Link>
          </p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>
            Built with Next.js • Deployed on Vercel •
            <Link href="/about_me" style={{ opacity: 0.6, textDecoration: 'underline', marginLeft: '0.5rem' }}>
              View Detailed Portfolio →
            </Link>
          </p>
        </div>
      </footer>
    </>
  )
}
