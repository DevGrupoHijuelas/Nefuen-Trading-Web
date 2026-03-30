import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useTranslation } from '../i18n/LanguageContext'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const sectionStyle = (bg: string): React.CSSProperties => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: bg,
  padding: '80px 5%',
})

const autoSection = (bg: string): React.CSSProperties => ({
  minHeight: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: bg,
  padding: '80px 5%',
})

const wireframeBox: React.CSSProperties = {
  border: '2px dashed #ccc',
  borderRadius: 12,
  padding: '60px 40px',
  maxWidth: 900,
  width: '100%',
  textAlign: 'center',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontWeight: 600,
  letterSpacing: '0.12em',
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  color: '#d4812a',
  marginBottom: 12,
}

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
  fontWeight: 800,
  color: '#2d3a2d',
  textTransform: 'uppercase',
  margin: '0 0 16px 0',
  lineHeight: 1,
}

const subtitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '1.1rem',
  color: '#999',
  maxWidth: 500,
  margin: '0 auto',
}

const infoGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: 20,
  marginTop: 40,
  width: '100%',
}

const infoCard: React.CSSProperties = {
  border: '1.5px dashed #ccc',
  borderRadius: 10,
  padding: '24px 16px',
  textAlign: 'center',
  background: '#fafafa',
}

const infoLabel: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontWeight: 700,
  fontSize: '0.75rem',
  color: '#d4812a',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  margin: '0 0 8px 0',
}

const infoValue: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  color: '#666',
  margin: 0,
  wordBreak: 'break-word',
}

const formContainer: React.CSSProperties = {
  marginTop: 30,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  maxWidth: 500,
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
}

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  padding: '12px 16px',
  border: '1.5px dashed #ccc',
  borderRadius: 8,
  background: '#fafafa',
  outline: 'none',
  color: '#333',
  width: '100%',
  boxSizing: 'border-box',
}

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: 120,
  resize: 'vertical',
}

const submitButton: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontWeight: 700,
  fontSize: '0.9rem',
  letterSpacing: '0.08em',
  color: '#fff',
  background: '#d4812a',
  border: 'none',
  borderRadius: 8,
  padding: '14px 40px',
  textTransform: 'uppercase',
  cursor: 'pointer',
  alignSelf: 'center',
}

const recipientNote: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.8rem',
  color: '#bbb',
  marginTop: 12,
  textAlign: 'center',
}

export default function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Failed')

      setStatus('success')
      setForm({ name: '', email: '', company: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="page-container" style={{ overflow: 'auto', height: '100vh' }}>
      <Navbar />

      {/* Contact Info */}
      <section style={sectionStyle('#fff')}>
        <div style={wireframeBox}>
          <p style={labelStyle}>{t('contact.label')}</p>
          <h2 style={titleStyle}>{t('contact.subtitle')}</h2>
          <p style={subtitleStyle}>{t('contact.body')}</p>
          <div style={infoGrid}>
            <div style={infoCard}>
              <p style={infoLabel}>Email</p>
              <p style={infoValue}>
                <a href={`mailto:${t('contact.email')}`} style={{ color: '#d4812a', textDecoration: 'none' }}>
                  {t('contact.email')}
                </a>
              </p>
            </div>
            <div style={infoCard}>
              <p style={infoLabel}>{t('contact.addressLabel')}</p>
              <p style={infoValue}>{t('contact.address')}</p>
            </div>
            <div style={infoCard}>
              <p style={infoLabel}>Website</p>
              <p style={infoValue}>
                <a href={`https://${t('contact.website')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#d4812a', textDecoration: 'none' }}>
                  {t('contact.website')}
                </a>
              </p>
            </div>
            <div style={infoCard}>
              <p style={infoLabel}>{t('contact.social')}</p>
              <p style={infoValue}>
                <a href="https://www.linkedin.com/company/nefuentrading" target="_blank" rel="noopener noreferrer" style={{ color: '#d4812a', textDecoration: 'none' }}>
                  Nefuen Trading
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section style={autoSection('#f8f8f8')}>
        <div style={wireframeBox}>
          <p style={labelStyle}>{t('contact.form.label')}</p>
          <h2 style={{ ...titleStyle, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>{t('contact.form.title')}</h2>

          {status === 'success' ? (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
              <p style={{ fontSize: '2.5rem', margin: '0 0 16px 0' }}>&#10003;</p>
              <p style={{ ...titleStyle, fontSize: '1.3rem', color: '#2d7a2d' }}>
                {t('contact.form.success')}
              </p>
              <p style={{ ...subtitleStyle, marginTop: 8 }}>
                {t('contact.form.successDetail')}
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                style={{ ...submitButton, marginTop: 24, background: '#666' }}
              >
                {t('contact.form.sendAnother')}
              </button>
            </div>
          ) : (
            <form style={formContainer} onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder={t('contact.form.name')}
                style={inputStyle}
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t('contact.form.email')}
                style={inputStyle}
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="company"
                placeholder={t('contact.form.company')}
                style={inputStyle}
                value={form.company}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder={t('contact.form.message')}
                style={textareaStyle}
                value={form.message}
                onChange={handleChange}
                required
              />

              {status === 'error' && (
                <p style={{ color: '#c0392b', fontFamily: 'var(--font-body)', fontSize: '0.9rem', margin: 0 }}>
                  {t('contact.form.error')}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  ...submitButton,
                  opacity: status === 'sending' ? 0.6 : 1,
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
              </button>
            </form>
          )}

          <p style={recipientNote}>
            {t('contact.form.recipients')}
          </p>
        </div>
      </section>
    </div>
  )
}
