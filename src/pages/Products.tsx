import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useTranslation } from '../i18n/LanguageContext'

function ArrowCTA({ label, to, reverse = false }: { label: string; to: string; reverse?: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      to={to}
      className={`product-arrow-cta ${reverse ? 'product-arrow-cta--reverse' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="product-arrow-icon">
        <svg className="product-arrow-brackets" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 8V1H8" className={isHovered ? 'bracket-active' : 'bracket-idle'} />
          <path d="M20 1H27V8" className={isHovered ? 'bracket-active' : 'bracket-idle'} />
          <path d="M1 20V27H8" className={isHovered ? 'bracket-active' : 'bracket-idle'} />
          <path d="M20 27H27V20" className={isHovered ? 'bracket-active' : 'bracket-idle'} />
        </svg>
        <span className="product-arrow-swap">
          <svg
            className={`product-arrow-svg ${isHovered ? 'arrow-out' : 'arrow-visible'}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <svg
            className={`product-arrow-svg ${isHovered ? 'arrow-visible' : 'arrow-in'}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </span>
      <span className={`product-arrow-label ${isHovered ? 'label-shifted' : ''}`}>
        {label}
      </span>
    </Link>
  )
}

function ProductSection({
  title,
  subtitle,
  description,
  reverse = false,
}: {
  title: string
  subtitle: string
  description: string
  reverse?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const { t } = useTranslation()

  return (
    <div className={`product-section ${reverse ? 'product-section--reverse' : ''}`}>
      {/* Image placeholder */}
      <div
        className="product-section__image"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`product-section__image-inner ${isHovered ? 'image-zoomed' : ''}`}>
          <span className="product-section__image-label">{title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="product-section__content">
        <h2
          className={`product-section__title ${isHovered ? 'title-shifted' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {title}
        </h2>
        <h3
          className="product-section__subtitle"
          onMouseEnter={() => setIsHovered(false)}
        >
          {subtitle}
        </h3>
        <p
          className="product-section__desc"
          onMouseEnter={() => setIsHovered(false)}
        >
          {description}
        </p>
        <ArrowCTA label={t('products.cta.button')} to="/contact" reverse={reverse} />
      </div>
    </div>
  )
}

export default function Products() {
  const { t } = useTranslation()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="page-container" style={{ overflow: 'auto', height: '100vh' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="products-hero">
        <div className="products-hero__content">
          <span className="products-hero__label">{t('products.hero.label')}</span>

          {/* Desktop title - staggered lines */}
          <h1 className="products-hero__title">
            <span className="line-reveal">
              <span className={`line-reveal__inner ${isLoaded ? 'revealed' : ''}`}>
                {t('products.hero.title').split(' ').slice(0, 2).join(' ')}
              </span>
            </span>
            <span className="line-reveal">
              <span className={`line-reveal__inner line-reveal__inner--delay1 ${isLoaded ? 'revealed' : ''}`}>
                {t('products.hero.title').split(' ').slice(2).join(' ')}
              </span>
            </span>
          </h1>

          <p className={`products-hero__subtitle ${isLoaded ? 'fade-in-up' : ''}`}>
            {t('products.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Spacer */}
      <div style={{ height: '4rem', background: '#fff' }} />

      {/* Product Sections */}
      <section>
        <ProductSection
          title={t('products.item.inshell.name')}
          subtitle={t('products.grid.label')}
          description={t('products.item.inshell.desc')}
        />
        <ProductSection
          title={t('products.item.shelled.name')}
          subtitle={t('products.grid.label')}
          description={t('products.item.shelled.desc')}
          reverse
        />
        <ProductSection
          title={t('products.item.blanched.name')}
          subtitle={t('products.grid.label')}
          description={t('products.item.blanched.desc')}
        />
        <ProductSection
          title={t('products.item.roasted.name')}
          subtitle={t('products.grid.label')}
          description={t('products.item.roasted.desc')}
          reverse
        />
      </section>

      {/* CTA Section */}
      <section className="products-cta">
        <div className="products-cta__inner">
          <span className="products-cta__label">{t('products.cta.label')}</span>
          <h2 className="products-cta__title">{t('products.cta.title')}</h2>
          <p className="products-cta__subtitle">{t('products.cta.subtitle')}</p>
          <ArrowCTA label={t('products.cta.button')} to="/contact" />
        </div>
      </section>
    </div>
  )
}
