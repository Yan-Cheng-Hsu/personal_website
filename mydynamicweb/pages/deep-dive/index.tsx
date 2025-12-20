import Head from 'next/head'
import Link from 'next/link'
import { deepDiveArticles } from '@/data/deepDive'
import styles from '@/styles/DeepDive.module.css'
import homeStyles from '@/styles/Home.module.css'
import ThemeToggle from '@/components/ThemeToggle'

export default function DeepDiveIndex() {
  // Alibaba articles
  const alibabaFeatured = deepDiveArticles.find(a => a.id === 'k8s-on-k8s-architecture')
  const alibabaSubModules = deepDiveArticles.filter(a =>
    a.category === 'alibaba' && a.id !== 'k8s-on-k8s-architecture'
  )

  // Amazon articles
  const amazonFeatured = deepDiveArticles.find(a => a.id === 'platform-leviathan-overview')
  const amazonSubModules = deepDiveArticles.filter(a =>
    a.category === 'amazon' && a.id !== 'platform-leviathan-overview'
  )

  return (
    <>
      <Head>
        <title>Technical Deep Dives | Bill Hsu</title>
        <meta
          name="description"
          content="In-depth technical articles on cross-cluster Kubernetes architecture, identity management, storage scheduling, and more."
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

        {/* ==================== ALIBABA CLOUD SECTION ==================== */}
        <section className={styles.companySection}>
          <div className={styles.companySectionHeader}>
            <span className={styles.companyLogo}>☁️</span>
            <h2 className={styles.companySectionTitle}>Alibaba Cloud</h2>
            <p className={styles.companySectionDesc}>Cross-Cluster AI Training Infrastructure</p>
          </div>

          {/* Alibaba Featured */}
          {alibabaFeatured && (
            <div className={styles.featuredSection}>
              <Link href={`/deep-dive/${alibabaFeatured.id}`} className={styles.featuredCard}>
                <div className={styles.featuredBadge}>
                  <span>🏗️ System Architecture</span>
                </div>
                <h2 className={styles.featuredTitle}>{alibabaFeatured.title}</h2>
                <p className={styles.featuredSubtitle}>{alibabaFeatured.subtitle}</p>
                <p className={styles.featuredDesc}>{alibabaFeatured.description}</p>
                <div className={styles.featuredMeta}>
                  <span className={styles.readTime}>{alibabaFeatured.readTime} read</span>
                  <span className={styles.featuredCta}>Read Architecture Overview →</span>
                </div>
              </Link>
            </div>
          )}

          {/* Alibaba Sub-modules */}
          {alibabaSubModules.length > 0 && (
            <div className={styles.subSection}>
              <h3 className={styles.subSectionTitle}>
                <span className={styles.sectionIcon}>🔧</span>
                Implementation Details
              </h3>
              <div className={styles.grid}>
                {alibabaSubModules.map((article) => (
                  <Link
                    key={article.id}
                    href={`/deep-dive/${article.id}`}
                    className={styles.card}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.readTime}>{article.readTime}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{article.title}</h3>
                    <p className={styles.cardSubtitle}>{article.subtitle}</p>
                    <p className={styles.cardDesc}>{article.description}</p>
                    <div className={styles.tags}>
                      {article.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                    <span className={styles.readMore}>Read Deep Dive →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ==================== AMAZON SECTION ==================== */}
        <section className={styles.companySection}>
          <div className={styles.companySectionHeader}>
            <span className={styles.companyLogo}>📦</span>
            <h2 className={styles.companySectionTitle}>Amazon AGI</h2>
            <p className={styles.companySectionDesc}>Self-Healing GPU Infrastructure for Foundation Models</p>
          </div>

          {/* Amazon Featured */}
          {amazonFeatured && (
            <div className={styles.featuredSection}>
              <Link href={`/deep-dive/${amazonFeatured.id}`} className={`${styles.featuredCard} ${styles.amazonFeatured}`}>
                <div className={styles.featuredBadge}>
                  <span>⚡ AIOps Platform</span>
                </div>
                <h2 className={styles.featuredTitle}>{amazonFeatured.title}</h2>
                <p className={styles.featuredSubtitle}>{amazonFeatured.subtitle}</p>
                <p className={styles.featuredDesc}>{amazonFeatured.description}</p>
                <div className={styles.featuredMeta}>
                  <span className={styles.readTime}>{amazonFeatured.readTime} read</span>
                  <span className={styles.featuredCta}>Read Platform Overview →</span>
                </div>
              </Link>
            </div>
          )}

          {/* Amazon Sub-modules */}
          {amazonSubModules.length > 0 && (
            <div className={styles.subSection}>
              <h3 className={styles.subSectionTitle}>
                <span className={styles.sectionIcon}>🔧</span>
                Implementation Details
              </h3>
              <div className={styles.grid}>
                {amazonSubModules.map((article) => (
                  <Link
                    key={article.id}
                    href={`/deep-dive/${article.id}`}
                    className={styles.card}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.readTime}>{article.readTime}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{article.title}</h3>
                    <p className={styles.cardSubtitle}>{article.subtitle}</p>
                    <p className={styles.cardDesc}>{article.description}</p>
                    <div className={styles.tags}>
                      {article.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                    <span className={styles.readMore}>Read Deep Dive →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
