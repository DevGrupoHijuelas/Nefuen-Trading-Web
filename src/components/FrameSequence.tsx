import { useEffect, useRef } from 'react'

const FRAME_DIR = '/frames/9e698adde712007667f82f37aeac5688'

function frameSrc(index: number): string {
  const num = String(index + 1).padStart(3, '0')
  return `${FRAME_DIR}/ffout${num}.gif`
}

const LEFT_ITEMS = [
  {
    label: 'PROCESO 01',
    heading: 'Cosecha\ny Selección',
    body: 'Recolectamos avellanas en su punto óptimo de madurez en los valles del norte de la Patagonia.',
  },
  {
    label: 'PROCESO 03',
    heading: 'Descascarado\ny Calibrado',
    body: 'Clasificación por calibre y peso que garantiza uniformidad para los estándares de exportación.',
  },
]

const RIGHT_ITEMS = [
  {
    label: 'PROCESO 02',
    heading: 'Secado\ny Limpieza',
    body: 'Secado controlado para alcanzar la humedad ideal, seguido de limpieza profunda.',
  },
  {
    label: 'PROCESO 04',
    heading: 'Exportación\nCertificada',
    body: 'Embalaje BRC Food y Global G.A.P., listo para los mercados de Europa, Asia y Norteamérica.',
  },
]

// Left column: item changes at frame 40 (items 1→3)
// Right column: item enters at frame 20, changes at frame 60 (items 2→4)
function getLeftActive(frameIndex: number): number {
  return Math.min(Math.floor(frameIndex / 40), LEFT_ITEMS.length - 1)
}
function getRightActive(frameIndex: number): number {
  if (frameIndex < 20) return -1   // not yet visible (shifted down)
  return Math.min(Math.floor((frameIndex - 20) / 40), RIGHT_ITEMS.length - 1)
}

interface FrameSequenceProps {
  frameIndex: number
  totalFrames: number
}

export default function FrameSequence({ frameIndex, totalFrames }: FrameSequenceProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const cachedRef = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    cachedRef.current = Array.from({ length: totalFrames }, (_, i) => {
      const img = new Image()
      img.src = frameSrc(i)
      return img
    })
  }, [totalFrames])

  useEffect(() => {
    if (imgRef.current) imgRef.current.src = frameSrc(frameIndex)
  }, [frameIndex, totalFrames])

  const progress = totalFrames > 1 ? frameIndex / (totalFrames - 1) : 0
  const isLast = frameIndex === totalFrames - 1

  const leftActive = getLeftActive(frameIndex)
  const rightActive = getRightActive(frameIndex)

  const renderSlider = (items: typeof LEFT_ITEMS, activeIndex: number) => (
    <div className="frame-text-slider">
      {items.map((item, i) => {
        const offset = i - activeIndex
        return (
          <div
            key={item.label}
            className="frame-text-slide"
            style={{ transform: `translateY(${offset * 100}%)` }}
          >
            <p className="frame-text-label">{item.label}</p>
            <h2 className="frame-text-heading">
              {item.heading.split('\n').map((line, j) => (
                <span key={j}>{line}<br /></span>
              ))}
            </h2>
            <p className="frame-text-body">{item.body}</p>
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="frame-fullscreen">
      <img
        ref={imgRef}
        src={frameSrc(0)}
        alt="Animation frame"
        className="frame-sequence-img"
        draggable={false}
      />

      {/* Two side-by-side sliders: left (1→3) and right (2→4) */}
      <div className="frame-sliders-row">
        {renderSlider(LEFT_ITEMS, leftActive)}
        {renderSlider(RIGHT_ITEMS, rightActive)}
      </div>

      <div className="frame-progress-bar">
        <div className="frame-progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>

      {isLast && <div className="frame-scroll-hint">Scroll to continue ↓</div>}
    </div>
  )
}
