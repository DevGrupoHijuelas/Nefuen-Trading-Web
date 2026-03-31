import { useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'

const MARKETS_COUNT = 9

export default function MarketsSection() {
  const { t } = useTranslation()
  const trackRef = useRef<HTMLDivElement>(null)
  const namesRef = useRef<HTMLSpanElement[]>([])
  const rafRef = useRef<number>(0)

  const updateVisuals = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const parent = track.parentElement
    if (!parent) return

    const viewportW = parent.clientWidth
    const focusX = viewportW * 0.5

    namesRef.current.forEach((el) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const parentRect = parent.getBoundingClientRect()
      const elCenter = rect.left + rect.width / 2 - parentRect.left
      const offset = elCenter - focusX
      const distance = Math.abs(offset)
      const maxDist = viewportW * 0.55

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

    rafRef.current = requestAnimationFrame(updateVisuals)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(updateVisuals)
    return () => cancelAnimationFrame(rafRef.current)
  }, [updateVisuals])

  // Build the market names — duplicate for seamless loop
  const marketNames = Array.from({ length: MARKETS_COUNT }, (_, i) => t(`markets.${i}`))

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

      {/* Rotating wireframe globe — now CSS animated */}
      <div className="markets-globe markets-globe--spinning" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <ellipse cx="100" cy="100" rx="90" ry="20" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <ellipse cx="100" cy="100" rx="90" ry="50" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <ellipse cx="100" cy="65" rx="72" ry="14" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <ellipse cx="100" cy="135" rx="72" ry="14" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <ellipse cx="100" cy="40" rx="42" ry="8" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <ellipse cx="100" cy="160" rx="42" ry="8" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <ellipse cx="100" cy="100" rx="20" ry="90" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <ellipse cx="100" cy="100" rx="50" ry="90" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <ellipse cx="100" cy="100" rx="75" ry="90" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.4" />
        </svg>
      </div>

      {/* Marquee — infinite auto-scrolling */}
      <div className="markets-marquee">
        <div className="markets-marquee__track" ref={trackRef}>
          {/* First set */}
          {marketNames.map((name, i) => (
            <span
              key={`a-${i}`}
              className="markets-name"
              ref={(el) => { if (el) namesRef.current[i] = el }}
            >
              {name}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {marketNames.map((name, i) => (
            <span
              key={`b-${i}`}
              className="markets-name"
              ref={(el) => { if (el) namesRef.current[MARKETS_COUNT + i] = el }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
