import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { deepDiveSections, DeepDiveSection, CaseStudyMeta } from '@/data/deepDive'
import MarkdownArticle from '@/components/MarkdownArticle'
import styles from '@/styles/DeepDive.module.css'
import homeStyles from '@/styles/Home.module.css'
import ThemeToggle from '@/components/ThemeToggle'

interface Props {
  section: DeepDiveSection
  caseStudy: CaseStudyMeta
  content: string
}

export default function CaseStudyPage({ section, caseStudy, content }: Props) {
  return (
    <>
      <Head>
        <title>{`${caseStudy.title} | ${section.company} | Bill Hsu`}</title>
        <meta name="description" content={caseStudy.subtitle} />
      </Head>

      <ThemeToggle />

      <nav className={homeStyles.navbar}>
        <div className={homeStyles.navContainer}>
          <Link href="/" className={homeStyles.navLogo}>
            <span>Bill Hsu</span>
          </Link>
          <div className={homeStyles.navLinks}>
            <Link href="/deep-dive" className={homeStyles.navLink}>
              All Deep Dives
            </Link>
            <Link href="/#architecture" className={homeStyles.navLink}>
              Portfolio
            </Link>
          </div>
        </div>
      </nav>

      <main className={styles.articleContainer}>
        <article className={styles.article}>
          <header className={styles.articleHeader}>
            <Link href="/deep-dive" className={styles.backLink}>
              ← Back to Deep Dives
            </Link>
            <div className={styles.articleMeta}>
              <span className={styles.readTime}>{caseStudy.readTime} read</span>
              <span className={styles.category}>{section.company}</span>
            </div>
            <h1 className={styles.articleTitle}>{caseStudy.title}</h1>
            <p className={styles.articleSubtitle}>{caseStudy.subtitle}</p>
            <div className={styles.tags}>
              {caseStudy.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </header>

          <div className={styles.articleContent}>
            <MarkdownArticle content={content} />

            {/* Related Case Studies */}
            <section className={styles.section}>
              <h2>Other Case Studies</h2>
              <div className={styles.relatedGrid}>
                {section.caseStudies
                  .filter((cs) => cs.id !== caseStudy.id)
                  .map((cs) => (
                    <Link
                      key={cs.id}
                      href={`/deep-dive/${section.id}/${cs.id}`}
                      className={styles.relatedCard}
                    >
                      <h4>{cs.title}</h4>
                      <p>{cs.subtitle}</p>
                      <span className={styles.readTime}>{cs.readTime}</span>
                    </Link>
                  ))}
              </div>
            </section>
          </div>

          <footer className={styles.articleFooter}>
            <Link href="/deep-dive" className={styles.footerLink}>
              ← View All Deep Dives
            </Link>
            <Link href="/#schedule" className={styles.footerCta}>
              Discuss This Architecture →
            </Link>
          </footer>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = deepDiveSections.flatMap((section) =>
    section.caseStudies.map((cs) => ({
      params: { section: section.id, caseStudy: cs.id },
    }))
  )
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const section = deepDiveSections.find((s) => s.id === params?.section)
  if (!section) {
    return { notFound: true }
  }

  const caseStudy = section.caseStudies.find((cs) => cs.id === params?.caseStudy)
  if (!caseStudy) {
    return { notFound: true }
  }

  // Read the markdown file
  const docsPath = path.join(process.cwd(), '..', 'docs', caseStudy.docPath)
  let content = ''

  try {
    content = fs.readFileSync(docsPath, 'utf-8')
    // Clean up duplicated content (some docs have repeated sections)
    // Find the first occurrence of "## 1. " and cut everything after the second occurrence
    const sections = content.split(/(?=## 摘要 \(Abstract\))/g)
    if (sections.length > 1) {
      content = sections[0] + sections[1]
    }
    // Remove the title (first H1) since we display it in the header
    content = content.replace(/^#[^#\n].*\n+/, '')
    // Also remove any duplicate title that might appear
    content = content.replace(/^#[^#\n].*\n+/, '')
  } catch (error) {
    console.error(`Failed to read markdown file: ${docsPath}`, error)
    content = '# Content not found\n\nThe documentation file could not be loaded.'
  }

  return { props: { section, caseStudy, content } }
}
