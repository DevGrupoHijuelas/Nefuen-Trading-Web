import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useTranslation } from '../i18n/LanguageContext'

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

const bodyText: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  color: '#666',
  lineHeight: 1.7,
  maxWidth: 700,
  margin: '20px auto 0',
  textAlign: 'left',
}

const teamGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  gap: 20,
  marginTop: 40,
  width: '100%',
}

const teamCard: React.CSSProperties = {
  border: '1.5px dashed #ccc',
  borderRadius: 10,
  padding: '28px 16px',
  textAlign: 'center',
  background: '#fafafa',
}

const teamName: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontWeight: 700,
  fontSize: '0.95rem',
  color: '#2d3a2d',
  margin: '0 0 4px 0',
}

const teamRole: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.8rem',
  color: '#999',
  margin: 0,
}

const subSectionBox: React.CSSProperties = {
  border: '1.5px dashed #d4812a',
  borderRadius: 10,
  padding: '28px 24px',
  marginTop: 30,
  textAlign: 'left',
  background: '#fdf8f3',
}

const ctaButton: React.CSSProperties = {
  display: 'inline-block',
  marginTop: 24,
  padding: '14px 40px',
  fontFamily: 'var(--font-heading)',
  fontWeight: 700,
  fontSize: '0.9rem',
  letterSpacing: '0.08em',
  color: '#fff',
  background: '#d4812a',
  border: 'none',
  borderRadius: 8,
  textDecoration: 'none',
  textTransform: 'uppercase',
  cursor: 'pointer',
}

const teamMembers = [0, 1, 2, 3, 4, 5, 6] as const

export default function AboutUs() {
  const { t } = useTranslation()

  return (
    <div className="page-container" style={{ overflow: 'auto', height: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={sectionStyle('#fff')}>
        <div style={wireframeBox}>
          <p style={labelStyle}>{t('aboutus.hero.label')}</p>
          <h2 style={titleStyle}>{t('aboutus.hero.title')}</h2>
          <p style={subtitleStyle}>{t('aboutus.hero.subtitle')}</p>
        </div>
      </section>

      {/* Our Story */}
      <section style={autoSection('#f8f8f8')}>
        <div style={wireframeBox}>
          <p style={labelStyle}>{t('aboutus.story.label')}</p>
          <h2 style={titleStyle}>{t('aboutus.story.title')}</h2>
          <p style={bodyText}>{t('aboutus.story.subtitle')}</p>
        </div>
      </section>

      {/* Mission */}
      <section style={autoSection('#fff')}>
        <div style={wireframeBox}>
          <p style={labelStyle}>{t('aboutus.mission.label')}</p>
          <h2 style={titleStyle}>{t('aboutus.mission.title')}</h2>
          <p style={bodyText}>{t('aboutus.mission.subtitle')}</p>
        </div>
      </section>

      {/* Vision */}
      <section style={autoSection('#f8f8f8')}>
        <div style={wireframeBox}>
          <p style={labelStyle}>{t('aboutus.vision.label')}</p>
          <h2 style={titleStyle}>{t('aboutus.vision.title')}</h2>
          <p style={bodyText}>{t('aboutus.vision.subtitle')}</p>
        </div>
      </section>

      {/* Team */}
      <section style={autoSection('#fff')}>
        <div style={{ ...wireframeBox, maxWidth: 1000 }}>
          <p style={labelStyle}>{t('aboutus.team.label')}</p>
          <h2 style={titleStyle}>{t('aboutus.team.title')}</h2>
          <p style={subtitleStyle}>{t('aboutus.team.subtitle')}</p>
          <div style={teamGrid}>
            {teamMembers.map((i) => (
              <div key={i} style={teamCard}>
                <p style={teamName}>{t(`aboutus.team.members.${i}.name`)}</p>
                <p style={teamRole}>{t(`aboutus.team.members.${i}.role`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grupo Hijuelas */}
      <section style={autoSection('#f8f8f8')}>
        <div style={wireframeBox}>
          <p style={labelStyle}>{t('aboutus.grupo.label')}</p>
          <h2 style={titleStyle}>{t('aboutus.grupo.title')}</h2>
          <p style={bodyText}>{t('aboutus.grupo.subtitle')}</p>
          <div style={subSectionBox}>
            <p style={{ ...labelStyle, marginBottom: 8 }}>{t('aboutus.grupo.genetics.label')}</p>
            <p style={{ ...bodyText, margin: 0, maxWidth: 'none' }}>{t('aboutus.grupo.genetics.text')}</p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={autoSection('#fff')}>
        <div style={wireframeBox}>
          <p style={labelStyle}>{t('aboutus.cert.label')}</p>
          <h2 style={titleStyle}>{t('aboutus.cert.title')}</h2>
          <p style={bodyText}>{t('aboutus.cert.subtitle')}</p>
          <div style={{ ...subSectionBox, background: '#f5f9f5' }}>
            <p style={{ ...bodyText, margin: 0, maxWidth: 'none' }}>
              <strong style={{ color: '#2d3a2d' }}>BRCGS: </strong>
              {t('aboutus.cert.brcgs')}
            </p>
          </div>
          <div style={{ ...subSectionBox, background: '#f5f9f5' }}>
            <p style={{ ...bodyText, margin: 0, maxWidth: 'none' }}>
              <strong style={{ color: '#2d3a2d' }}>SMETA: </strong>
              {t('aboutus.cert.smeta')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={sectionStyle('#f8f8f8')}>
        <div style={wireframeBox}>
          <p style={labelStyle}>{t('aboutus.cta.label')}</p>
          <h2 style={titleStyle}>{t('aboutus.cta.title')}</h2>
          <p style={subtitleStyle}>{t('aboutus.cta.subtitle')}</p>
          <Link to="/contact" style={ctaButton}>{t('aboutus.cta.button')}</Link>
        </div>
      </section>
    </div>
  )
}
