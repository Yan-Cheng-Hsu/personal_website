import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { deepDiveSections, ContentBlock } from '@/data/deepDive'
import styles from '@/styles/DeepDive.module.css'
import homeStyles from '@/styles/Home.module.css'
import ThemeToggle from '@/components/ThemeToggle'

const Mermaid = dynamic(() => import('@/components/Mermaid'), { ssr: false })

function renderDiagram(block: ContentBlock) {
  if (block.type === 'mermaid') {
    return (
      <div className={styles.mermaidBlock}>
        <Mermaid chart={block.content} />
      </div>
    )
  }
  return null
}

export default function DeepDiveIndex() {
  return (
    <>
      <Head>
        <title>Technical Deep Dives | Bill Hsu</title>
        <meta
          name="description"
          content="In-depth technical articles on cross-cluster Kubernetes architecture, GPU infrastructure, identity management, and more."
        />
      </Head>

      <ThemeToggle />

      <nav className={homeStyles.navbar}>
        <div className={homeStyles.navContainer}>
          <Link href="/" className={homeStyles.navLogo}>
            <span>Bill Hsu</span>
          </Link>
          <div className={homeStyles.navLinks}>
            <Link href="/#architecture" className={homeStyles.navLink}>
              Back to Portfolio
            </Link>
          </div>
        </div>
      </nav>

      <main className={styles.container}>
        <header className={styles.header}>
          <span className={styles.label}>Technical Documentation</span>
          <h1 className={styles.title}>Deep Dives</h1>
          <p className={styles.subtitle}>
            Detailed technical write-ups on the systems I&apos;ve built.
            <br />
            Architecture decisions, trade-offs, and implementation details.
          </p>
        </header>

        {deepDiveSections.map((section) => (
          <section key={section.id} id={section.id} className={styles.companySection}>
            {/* Company Header */}
            <div className={styles.companySectionHeader}>
              <span className={styles.companyLogo}>
                {section.id === 'alibaba' ? '☁️' : '📦'}
              </span>
              <h2 className={styles.companySectionTitle}>{section.company}</h2>
              <p className={styles.companySectionDesc}>{section.tagline}</p>
            </div>

            {/* System Architecture - Inline Display */}
            <div className={styles.systemOverview}>
              <div className={styles.overviewHeader}>
                <span className={styles.overviewBadge}>
                  {section.id === 'alibaba' ? '🏗️ System Architecture' : '⚡ AIOps Platform'}
                </span>
                <h3 className={styles.overviewTitle}>{section.systemArchitecture.title}</h3>
                <p className={styles.overviewSubtitle}>{section.systemArchitecture.subtitle}</p>
              </div>

              <div
                className={styles.overviewText}
                dangerouslySetInnerHTML={{
                  __html: section.systemArchitecture.overview
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/^- (.*$)/gm, '<li>$1</li>')
                    .replace(/((?:<li>.*<\/li>\n?)+)/gm, '<ul>$1</ul>')
                }}
              />

              {/* Architecture Diagram */}
              {renderDiagram(section.systemArchitecture.diagram)}

              {/* Key Components */}
              <div className={styles.keyComponents}>
                <h4>Key Components</h4>
                <div className={styles.componentTags}>
                  {section.systemArchitecture.keyComponents.map((component, idx) => (
                    <span key={idx} className={styles.componentTag}>
                      {component}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Case Studies */}
            {section.caseStudies.length > 0 && (
              <div className={styles.subSection}>
                <h3 className={styles.subSectionTitle}>
                  <span className={styles.sectionIcon}>🔧</span>
                  Case Studies
                </h3>
                <div className={styles.grid}>
                  {section.caseStudies.map((caseStudy) => (
                    <Link
                      key={caseStudy.id}
                      href={`/deep-dive/${section.id}/${caseStudy.id}`}
                      className={styles.card}
                    >
                      <div className={styles.cardHeader}>
                        <span className={styles.readTime}>{caseStudy.readTime}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{caseStudy.title}</h3>
                      <p className={styles.cardSubtitle}>{caseStudy.subtitle}</p>
                      <div className={styles.tags}>
                        {caseStudy.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                      <span className={styles.readMore}>Read Case Study →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}
      </main>
    </>
  )
}
