import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { deepDiveArticles, DeepDiveArticle, ContentBlock } from '@/data/deepDive'
import styles from '@/styles/DeepDive.module.css'
import homeStyles from '@/styles/Home.module.css'
import ThemeToggle from '@/components/ThemeToggle'

const Mermaid = dynamic(() => import('@/components/Mermaid'), { ssr: false })

interface Props {
  article: DeepDiveArticle
}

function renderContent(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'text':
      return (
        <div
          key={index}
          className={styles.textBlock}
          dangerouslySetInnerHTML={{
            __html: block.content
              .replace(/^## (.*$)/gm, '<h2>$1</h2>')
              .replace(/^### (.*$)/gm, '<h3>$1</h3>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/`([^`]+)`/g, '<code>$1</code>')
              .replace(/\n\n/g, '</p><p>')
              .replace(/^- (.*$)/gm, '<li>$1</li>')
              .replace(/((?:<li>.*<\/li>\n?)+)/gm, '<ul>$1</ul>')
          }}
        />
      )
    case 'mermaid':
      return (
        <div key={index} className={styles.mermaidBlock}>
          <Mermaid chart={block.content} />
        </div>
      )
    case 'code':
      return (
        <div key={index} className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeLanguage}>{block.language || 'code'}</span>
          </div>
          <pre>
            <code>{block.content}</code>
          </pre>
        </div>
      )
    case 'table':
      const lines = block.content.trim().split('\n')
      const headers = lines[0].split('|').filter(cell => cell.trim())
      const rows = lines.slice(2).map(line =>
        line.split('|').filter(cell => cell.trim())
      )
      return (
        <div key={index} className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {headers.map((header, i) => (
                  <th key={i}>{header.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} dangerouslySetInnerHTML={{
                      __html: cell.trim().replace(/`([^`]+)`/g, '<code>$1</code>')
                    }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return null
  }
}

export default function DeepDivePage({ article }: Props) {
  return (
    <>
      <Head>
        <title>{`${article.title} | Bill Hsu`}</title>
        <meta name="description" content={article.description} />
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
              <span className={styles.readTime}>{article.readTime} read</span>
              <span className={styles.category}>
                {article.category === 'alibaba' ? 'Alibaba Cloud' : article.category}
              </span>
            </div>
            <h1 className={styles.articleTitle}>{article.title}</h1>
            <p className={styles.articleSubtitle}>{article.subtitle}</p>
            <div className={styles.tags}>
              {article.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </header>

          <div className={styles.articleContent}>
            {article.content.map((block, index) => renderContent(block, index))}
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
  const paths = deepDiveArticles.map((article) => ({
    params: { slug: article.id },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const article = deepDiveArticles.find((a) => a.id === params?.slug)
  if (!article) {
    return { notFound: true }
  }
  return { props: { article } }
}
