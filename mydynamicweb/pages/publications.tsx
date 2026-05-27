import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import { publications } from '@/data/experience'
import { scholarProfile, patents } from '@/data/scholar'

const statCardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1.5rem 1rem',
  borderRadius: '12px',
  background: 'rgba(74, 158, 255, 0.08)',
  border: '1px solid rgba(74, 158, 255, 0.25)',
  minWidth: '160px',
}

const statValueStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  fontWeight: 700,
  color: '#4a9eff',
  lineHeight: 1.1,
}

const statLabelStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  opacity: 0.75,
  marginTop: '0.4rem',
  textAlign: 'center',
}

export default function Publications() {
  return (
    <Layout
      title="Publications & Research"
      description="Research output of Yan-Cheng (Bill) Hsu — 159+ Google Scholar citations, h-index 2, plus a Mitsubishi Electric patent citing the 2020 cuffless blood-pressure paper."
    >
      <div className={styles.section}>
        <h1 className={styles.sectionTitle}>Publications &amp; Research</h1>

        {/* Research Impact stat row */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            margin: '1.5rem 0 2.5rem',
            justifyContent: 'flex-start',
          }}
        >
          <Link
            href={scholarProfile.scholarUrl}
            target="_blank"
            style={{ ...statCardStyle, textDecoration: 'none', cursor: 'pointer' }}
          >
            <span style={statValueStyle}>{scholarProfile.totalCitations}+</span>
            <span style={statLabelStyle}>Google Scholar Citations</span>
          </Link>
          <div style={statCardStyle}>
            <span style={statValueStyle}>{scholarProfile.hIndex}</span>
            <span style={statLabelStyle}>h-index</span>
          </div>
          {scholarProfile.i10Index !== undefined && (
            <div style={statCardStyle}>
              <span style={statValueStyle}>{scholarProfile.i10Index}</span>
              <span style={statLabelStyle}>i10-index</span>
            </div>
          )}
          <div style={statCardStyle}>
            <span style={statValueStyle}>{publications.length}</span>
            <span style={statLabelStyle}>Peer-Reviewed Papers</span>
          </div>
          <div style={statCardStyle}>
            <span style={statValueStyle}>{patents.length}</span>
            <span style={statLabelStyle}>Industrial Patent Citation{patents.length === 1 ? '' : 's'}</span>
          </div>
        </div>

        <p style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '2rem' }}>
          Last updated {scholarProfile.lastUpdated}.{' '}
          <Link href={scholarProfile.scholarUrl} target="_blank" style={{ color: '#4a9eff' }}>
            View live Google Scholar profile →
          </Link>
        </p>
      </div>

      <div className={styles.section}>
        <h1 className={styles.sectionTitle}>Peer-Reviewed Publications</h1>

        {publications.map((pub) => (
          <div key={pub.id} className={styles.expCard}>
            <div>
              <Link href={pub.url || '#'} target="_blank">
                <Image
                  src={pub.image}
                  alt={pub.title}
                  width={400}
                  height={300}
                  className={styles.logo}
                />
              </Link>
            </div>
            <div className={styles.expContent}>
              <Link href={pub.url || '#'} target="_blank">
                <h3>{pub.title}</h3>
              </Link>
              <h6>
                {pub.authors}
                <br />
                <em>{pub.venue}</em>, {pub.year}
                {pub.isOral && <strong> (Oral Presentation)</strong>}
              </h6>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', margin: '0.75rem 0' }}>
                {pub.citations !== undefined && (
                  <span
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.25rem 0.7rem',
                      borderRadius: '999px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#10b981',
                      border: '1px solid rgba(16, 185, 129, 0.35)',
                      fontWeight: 600,
                    }}
                  >
                    📚 Cited {pub.citations}+ times
                  </span>
                )}
                {pub.doi && (
                  <Link
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.25rem 0.7rem',
                      borderRadius: '999px',
                      background: 'rgba(74, 158, 255, 0.12)',
                      color: '#4a9eff',
                      border: '1px solid rgba(74, 158, 255, 0.3)',
                      textDecoration: 'none',
                    }}
                  >
                    DOI: {pub.doi}
                  </Link>
                )}
                {pub.arxivUrl && (
                  <Link
                    href={pub.arxivUrl}
                    target="_blank"
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.25rem 0.7rem',
                      borderRadius: '999px',
                      background: 'rgba(155, 89, 182, 0.12)',
                      color: '#9b59b6',
                      border: '1px solid rgba(155, 89, 182, 0.3)',
                      textDecoration: 'none',
                    }}
                  >
                    arXiv
                  </Link>
                )}
              </div>

              <ul>
                {pub.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {pub.url && (
                  <Link href={pub.url} target="_blank" className={styles.linkIcon}>
                    <span>🔗 Read Paper →</span>
                  </Link>
                )}
                {pub.githubUrl && (
                  <Link href={pub.githubUrl} target="_blank" className={styles.linkIcon}>
                    <Image src="/pics/github.png" alt="GitHub" width={25} height={25} />
                    <span>Source Code</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {patents.length > 0 && (
        <div className={styles.section}>
          <h1 className={styles.sectionTitle}>Patents Citing This Work</h1>
          <p style={{ opacity: 0.75, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Industry validation through patent citations of my published research.
          </p>

          {patents.map((patent) => (
            <div key={patent.id} className={styles.expCard}>
              <div className={styles.expContent}>
                <Link href={patent.url} target="_blank">
                  <h3>{patent.title}</h3>
                </Link>
                <h6>
                  <strong>{patent.assignee}</strong> · {patent.number} ({patent.year})
                </h6>
                <p style={{ marginTop: '0.5rem' }}>
                  Cites my 2020 paper{' '}
                  <em>“Generalized DNN Model for Cuffless Blood Pressure Estimation”</em> (Sensors)
                  as prior art for the underlying methodology.
                </p>
                <div style={{ marginTop: '0.5rem' }}>
                  <Link href={patent.url} target="_blank" className={styles.linkIcon}>
                    <span>📜 View Patent on Google Patents →</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}
