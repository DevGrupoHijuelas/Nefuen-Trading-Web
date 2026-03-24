import { useEffect, useRef } from 'react'

const FRAME_DIR = '/frames/9e698adde712007667f82f37aeac5688'

function frameSrc(index: number): string {
  const num = String(index + 1).padStart(3, '0')
  return `${FRAME_DIR}/ffout${num}.gif`
}

interface TextItem {
  label: string
  heading: string
  body: string
}

const TEXT_ITEMS: TextItem[] = [
  {
    label: 'PROCESO 01',
    heading: 'Cosecha\ny Selección',
    body: 'Recolectamos avellanas en su punto óptimo de madurez en los valles del norte de la Patagonia, seleccionando solo las de mayor calibre.',
  },
  {
    label: 'PROCESO 02',
    heading: 'Secado\ny Limpieza',
    body: 'Un proceso de secado controlado garantiza la humedad ideal para la conservación y el transporte internacional sin pérdida de sabor.',
  },
  {
    label: 'PROCESO 03',
    heading: 'Exportación\nCertificada',
    body: 'Embalaje con estándar BRC Food y Global G.A.P., listo para los mercados más exigentes de Europa, Asia y Norteamérica.',
  },
]

interface FrameSequenceProps {
  frameIndex: number
  totalFrames: number
}

export default function FrameSequence({ frameIndex, totalFrames }: FrameSequenceProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const cachedRef = useRef<HTMLImageElement[]>([])

  // Preload all frames on mount
  useEffect(() => {
    cachedRef.current = Array.from({ length: totalFrames }, (_, i) => {
      const img = new Image()
      img.src = frameSrc(i)
      return img
    })
  }, [totalFrames])

  // Swap src on frameIndex change
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.src = frameSrc(frameIndex)
    }
  }, [frameIndex, totalFrames])

  const progress = totalFrames > 1 ? frameIndex / (totalFrames - 1) : 0

  // Translate the text track upward as progress increases
  // Each text item occupies 100% of the column height
  const trackTranslate = -progress * (TEXT_ITEMS.length - 1) * 100

  const isLast = frameIndex === totalFrames - 1

  return (
    <div className="frame-layout">
      {/* Left column — parallax text gallery */}
      <div className="frame-left-col">
        <div
          className="frame-text-track"
          style={{ transform: `translateY(${trackTranslate}%)` }}
        >
          {TEXT_ITEMS.map((item) => (
            <div key={item.label} className="frame-text-item">
              <p className="frame-text-label">{item.label}</p>
              <h2 className="frame-text-heading">
                {item.heading.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </h2>
              <p className="frame-text-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right column — raw frame animation, no overlay */}
      <div className="frame-right-col">
        <img
          ref={imgRef}
          src={frameSrc(0)}
          alt="Animation frame"
          className="frame-sequence-img"
          draggable={false}
        />
      </div>

      {/* Progress bar */}
      <div className="frame-progress-bar">
        <div className="frame-progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* Scroll hint at last frame */}
      {isLast && (
        <div className="frame-scroll-hint">Scroll to continue ↓</div>
      )}
    </div>
  )
}
