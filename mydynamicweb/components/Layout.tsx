import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

interface LayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{`${title} | Bill Hsu`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Yan-Cheng (Bill) Hsu" />
        <meta name="keywords" content="Bill Hsu, SDE, SRE, MLE, Software Engineer, Site Reliability Engineer, Machine Learning Engineer, Alibaba Cloud, Amazon, GPU Infrastructure, AI Training" />
        <meta property="og:title" content={`${title} | Bill Hsu`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bill-yc-hsu.com" />
        <meta property="og:image" content="https://bill-yc-hsu.com/pics/resume_photo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://bill-yc-hsu.com/pics/resume_photo.jpg" />
        <link rel="icon" href="/logo.ico" />
      </Head>

      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.navLogo}>
            <Image
              src="/pics/logo.png"
              alt="Bill Hsu Logo"
              width={40}
              height={40}
              priority
            />
            <span>Bill Hsu</span>
          </Link>

          <div className={styles.navLinks}>
            <Link href="/about_me">About</Link>
            <Link href="/work_exp">Experience</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/publications">Publications</Link>
            <Link href="/contacts">Contact</Link>
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Yan-Cheng (Bill) Hsu. All rights reserved.</p>
      </footer>
    </>
  )
}
