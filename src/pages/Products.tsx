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
  maxWidth: 1000,
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

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: 20,
  marginTop: 40,
  width: '100%',
}

const cardStyle: React.CSSProperties = {
  border: '1.5px dashed #ccc',
  borderRadius: 10,
  padding: '32px 20px',
  textAlign: 'center',
  background: '#fafafa',
}

const cardTitle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontWeight: 700,
  fontSize: '1rem',
  color: '#2d3a2d',
  margin: '0 0 6px 0',
}

const cardSub: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.85rem',
  color: '#999',
  margin: 0,
}

const listItem: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  color: '#666',
  lineHeight: 1.7,
  padding: '12px 0',
  borderBottom: '1px dashed #ddd',
  textAlign: 'left',
}

const marketCard: React.CSSProperties = {
  border: '1.5px dashed #ccc',
  borderRadius: 10,
  padding: '24px 20px',
  textAlign: 'center',
  background: '#fafafa',
}

const marketRegion: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontWeight: 700,
  fontSize: '0.95rem',
  color: '#2d3a2d',
  margin: '0 0 6px 0',
  textTransform: 'uppercase',
}

const marketCountries: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.85rem',
  color: '#999',
  margin: 0,
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

const productKeys = [
  'inshell',
  'shelled',
  'blanched',
  'roasted',
  'paste',
  'cocoa',
  'praline',
  'dragees',
] as const

const packagingKeys = ['maxibags', 'ventilated', 'boxes', 'labeling'] as const

const markets = [
  { region: 'Europe', key: 'europe' },
  { region: 'South America', key: 'southamerica' },
  { region: 'Asia', key: 'asia' },
  { region: 'Oceania', key: 'oceania' },
] as const

export default function Products() {
  const { t } = useTranslation()

  return (
    <div className="page-container" style={{ overflow: 'auto', height: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={sectionStyle('#fff')}>
        <div style={wireframeBox}>
          <p style={labelStyle}>{t('products.hero.label')}</p>
          <h2 style={titleStyle}>{t('products.hero.title')}</h2>
          <p style={subtitleStyle}>{t('products.hero.subtitle')}</p>
        </div>
      </section>

      {/* Products Grid */}
      <section style={autoSection('#f8f8f8')}>
        <div style={{ ...wireframeBox, maxWidth: 1100 }}>
          <p style={labelStyle}>{t('products.grid.label')}</p>
          <h2 style={titleStyle}>{t('products.grid.title')}</h2>
          <p style={subtitleStyle}>{t('products.grid.subtitle')}</p>
          <div style={gridStyle}>
            {productKeys.map((key) => (
              <div key={key} style={cardStyle}>
                <p style={cardTitle}>{t(`products.item.${key}.name`)}</p>
                <p style={cardSub}>{t(`products.item.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging */}
      <section style={autoSection('#fff')}>
        <div style={wireframeBox}>
          <p style={labelStyle}>{t('products.packaging.label')}</p>
          <h2 style={titleStyle}>{t('products.packaging.title')}</h2>
          <div style={{ marginTop: 20 }}>
            {packagingKeys.map((key) => (
              <div key={key} style={listItem}>
                {t(`products.packaging.${key}`)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section style={autoSection('#f8f8f8')}>
        <div style={wireframeBox}>
          <p style={labelStyle}>{t('products.markets.label')}</p>
          <h2 style={titleStyle}>{t('products.markets.title')}</h2>
          <div style={{ ...gridStyle, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
            {markets.map(({ region, key }) => (
              <div key={key} style={marketCard}>
                <p style={marketRegion}>{region}</p>
                <p style={marketCountries}>{t(`products.markets.${key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={autoSection('#fff')}>
        <div style={wireframeBox}>
          <p style={labelStyle}>{t('products.cert.label')}</p>
          <h2 style={titleStyle}>{t('products.cert.title')}</h2>
          <p style={bodyText}>{t('products.cert.subtitle')}</p>
        </div>
      </section>

      {/* CTA Contact */}
      <section style={sectionStyle('#f8f8f8')}>
        <div style={wireframeBox}>
          <p style={labelStyle}>{t('products.cta.label')}</p>
          <h2 style={titleStyle}>{t('products.cta.title')}</h2>
          <p style={subtitleStyle}>{t('products.cta.subtitle')}</p>
          <Link to="/contact" style={ctaButton}>{t('products.cta.button')}</Link>
        </div>
      </section>
    </div>
  )
}
