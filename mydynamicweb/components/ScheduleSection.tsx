import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styles from '@/styles/Landing.module.css'

// Calendly URL - change this to your Calendly link
const CALENDLY_URL = 'https://calendly.com/bill-ych-jobs/30min'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ScheduleSection() {
  const [form, setForm] = useState({ email: '', company: '', role: '', message: '' })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Request failed (${res.status})`)
      }
      setStatus('success')
      setForm({ email: '', company: '', role: '', message: '' })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send. Try again or use the calendar.'
      setErrorMsg(message)
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.65rem 0.9rem',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'inherit',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
  }

  return (
    <section id="schedule" className={styles.scheduleSection}>
      <motion.h2
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Let's Build Something Amazing Together
      </motion.h2>

      <div className={styles.scheduleGrid}>
        <div className={styles.scheduleInfo}>
          <h3>Why Schedule a Call?</h3>
          <ul>
            <li>Discuss how I can solve your infrastructure challenges</li>
            <li>Share ideas about scaling AI/ML systems</li>
            <li>Explore potential collaboration opportunities</li>
            <li>Get insights from my experience at scale</li>
          </ul>

          <div className={styles.availability}>
            <h4>My Availability</h4>
            <p>Pacific Time (PST/PDT)</p>
            <p>Mon-Fri: 9 AM - 6 PM</p>
            <p>Response within 24 hours</p>
          </div>

          {/* Quick contact form — sends an email via Resend */}
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              borderRadius: '12px',
              background: 'rgba(74, 158, 255, 0.06)',
              border: '1px solid rgba(74, 158, 255, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <h4 style={{ margin: 0 }}>Or send a quick note</h4>
            <input
              type="email"
              required
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />
            <input
              type="text"
              required
              placeholder="Company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              style={inputStyle}
            />
            <input
              type="text"
              required
              placeholder="Your role (e.g. Hiring Manager, Recruiter)"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={inputStyle}
            />
            <textarea
              placeholder="Anything I should know? (optional)"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              style={{
                padding: '0.7rem 1.2rem',
                borderRadius: '8px',
                border: 'none',
                background: status === 'submitting' ? '#666' : '#0070f3',
                color: 'white',
                fontWeight: 600,
                cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                fontSize: '0.95rem',
              }}
            >
              {status === 'submitting' ? 'Sending…' : '✉️ Send'}
            </button>
            {status === 'success' && (
              <p style={{ color: '#10b981', fontSize: '0.9rem', margin: 0 }}>
                ✅ Got it — I&apos;ll reply within 24 hours.
              </p>
            )}
            {status === 'error' && (
              <p style={{ color: '#ef4444', fontSize: '0.9rem', margin: 0 }}>
                ⚠️ {errorMsg} You can also use the calendar →
              </p>
            )}
          </form>
        </div>

        <motion.div
          className={styles.calendlyContainer}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {/* Calendly inline widget */}
          <div
            className="calendly-inline-widget"
            data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=1a1a2e&text_color=ffffff&primary_color=0070f3`}
            style={{
              minWidth: '320px',
              height: '630px',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
