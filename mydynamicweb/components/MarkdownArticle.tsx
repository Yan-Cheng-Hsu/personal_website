import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import dynamic from 'next/dynamic'
import styles from '@/styles/DeepDive.module.css'

const Mermaid = dynamic(() => import('./Mermaid'), { ssr: false })

interface Props {
  content: string
}

interface CodeProps {
  node?: any
  inline?: boolean
  className?: string
  children?: React.ReactNode
}

export default function MarkdownArticle({ content }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Custom code block renderer that handles Mermaid diagrams
  const CodeBlock = ({ node, inline, className, children, ...props }: CodeProps) => {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : ''
    const codeContent = String(children).replace(/\n$/, '')

    // Check if it's a mermaid diagram (either explicitly marked or by content)
    const isMermaid = language === 'mermaid' ||
      (language === '' && (
        codeContent.startsWith('graph ') ||
        codeContent.startsWith('sequenceDiagram') ||
        codeContent.startsWith('stateDiagram') ||
        codeContent.startsWith('flowchart') ||
        codeContent.startsWith('classDiagram') ||
        codeContent.startsWith('erDiagram') ||
        codeContent.startsWith('gantt') ||
        codeContent.startsWith('pie') ||
        codeContent.startsWith('gitGraph')
      ))

    if (!inline && isMermaid) {
      if (!mounted) {
        return <div className={styles.mermaidPlaceholder}>Loading diagram...</div>
      }
      return (
        <div className={styles.mermaidBlock}>
          <Mermaid chart={codeContent} />
        </div>
      )
    }

    if (!inline && language) {
      return (
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeLanguage}>{language}</span>
          </div>
          <pre>
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      )
    }

    // Inline code
    return (
      <code className={styles.inlineCode} {...props}>
        {children}
      </code>
    )
  }

  // Custom table renderer
  const TableComponent = ({ children }: { children: React.ReactNode }) => (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>{children}</table>
    </div>
  )

  return (
    <div className={styles.markdownContent}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: CodeBlock as any,
          table: TableComponent as any,
          h1: ({ children }) => <h1 className={styles.mdH1}>{children}</h1>,
          h2: ({ children }) => <h2 className={styles.mdH2}>{children}</h2>,
          h3: ({ children }) => <h3 className={styles.mdH3}>{children}</h3>,
          h4: ({ children }) => <h4 className={styles.mdH4}>{children}</h4>,
          p: ({ children }) => <p className={styles.mdParagraph}>{children}</p>,
          ul: ({ children }) => <ul className={styles.mdList}>{children}</ul>,
          ol: ({ children }) => <ol className={styles.mdOrderedList}>{children}</ol>,
          li: ({ children }) => <li className={styles.mdListItem}>{children}</li>,
          blockquote: ({ children }) => <blockquote className={styles.mdBlockquote}>{children}</blockquote>,
          a: ({ href, children }) => (
            <a href={href} className={styles.mdLink} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className={styles.mdStrong}>{children}</strong>,
          em: ({ children }) => <em className={styles.mdEmphasis}>{children}</em>,
          hr: () => <hr className={styles.mdHr} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
