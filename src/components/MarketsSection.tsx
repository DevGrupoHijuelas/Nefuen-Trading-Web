import { useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'

const MARKETS_COUNT = 9

export default function MarketsSection() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const namesRef = useRef<HTMLSpanElement[]>([])
  const hazelnutRef = useRef<HTMLDivElement>(null)

  const updateVisuals = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const viewportW = container.clientWidth
    const focusX = viewportW * 0.38

    // Rotate hazelnut based on scroll progress
    if (hazelnutRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = container
      const maxScroll = scrollWidth - clientWidth
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0
      const rotation = progress * 360
      hazelnutRef.current.style.transform = `translateX(-50%) rotate(${rotation}deg)`
    }

    namesRef.current.forEach((el) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const elCenter = rect.left + rect.width / 2 - containerRect.left
      const offset = elCenter - focusX
      const distance = Math.abs(offset)
      const maxDist = viewportW * 0.5

      const ratio = Math.min(distance / maxDist, 1)

      const angle = ratio * (Math.PI * 0.45)
      const arcRadius = 150
      const arcY = arcRadius * (1 - Math.cos(angle))

      const opacity = 1 - ratio * 0.85
      const blur = ratio * 6
      const scale = 1 - ratio * 0.25

      el.style.opacity = String(opacity)
      el.style.filter = `blur(${blur}px)`
      el.style.transform = `translateY(${arcY}px) scale(${scale})`
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    updateVisuals()

    container.addEventListener('scroll', updateVisuals, { passive: true })
    window.addEventListener('resize', updateVisuals)

    return () => {
      container.removeEventListener('scroll', updateVisuals)
      window.removeEventListener('resize', updateVisuals)
    }
  }, [updateVisuals])

  // Re-run when section becomes active
  useEffect(() => {
    const observer = new MutationObserver(updateVisuals)
    const container = containerRef.current
    if (container) {
      observer.observe(container, { attributes: true, attributeFilter: ['style'] })
    }
    return () => observer.disconnect()
  }, [updateVisuals])

  return (
    <div className="markets-section">
      {/* Top text */}
      <div className="markets-ui reveal-text">
        <p className="markets-ui__label">{t('transition.label')}</p>
        <h2 className="markets-ui__title">{t('transition.title')}</h2>
        <p className="markets-ui__subtitle">{t('transition.subtitle')}</p>
        <Link to="/products" className="cta-button" style={{ marginTop: '24px', display: 'inline-block', textDecoration: 'none' }}>
          {t('transition.cta')}
        </Link>
      </div>

      {/* Rotating wireframe globe */}
      <div ref={hazelnutRef} className="markets-globe" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* Outer circle */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Equator */}
          <ellipse cx="100" cy="100" rx="90" ry="20" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {/* Latitude lines */}
          <ellipse cx="100" cy="100" rx="90" ry="50" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <ellipse cx="100" cy="65" rx="72" ry="14" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <ellipse cx="100" cy="135" rx="72" ry="14" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <ellipse cx="100" cy="40" rx="42" ry="8" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <ellipse cx="100" cy="160" rx="42" ry="8" fill="none" stroke="currentColor" strokeWidth="0.3" />
          {/* Meridian lines */}
          <ellipse cx="100" cy="100" rx="20" ry="90" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <ellipse cx="100" cy="100" rx="50" ry="90" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <ellipse cx="100" cy="100" rx="75" ry="90" fill="none" stroke="currentColor" strokeWidth="0.3" />
          {/* Vertical axis */}
          <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.4" />
        </svg>
      </div>

      {/* Horizontal scrolling globe wheel */}
      <div className="markets-scroll-container" ref={containerRef}>
        <div className="markets-spacer-left" />
        {Array.from({ length: MARKETS_COUNT }).map((_, i) => (
          <div key={i} className="markets-item">
            <span
              className="markets-name"
              ref={(el) => { if (el) namesRef.current[i] = el }}
            >
              {t(`markets.${i}`)}
            </span>
          </div>
        ))}
        <div className="markets-spacer-right" />
      </div>
    </div>
  )
}
