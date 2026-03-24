import { useEffect, useRef } from 'react'

const FRAME_DIR = '/frames/9e698adde712007667f82f37aeac5688'

function frameSrc(index: number): string {
  const num = String(index + 1).padStart(3, '0')
  return `${FRAME_DIR}/ffout${num}.gif`
}

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

  return (
    <div className="frame-sequence-container">
      <img
        ref={imgRef}
        src={frameSrc(0)}
        alt="Animation frame"
        className="frame-sequence-img"
        draggable={false}
      />
      <div className="frame-progress-bar">
        <div
          className="frame-progress-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      {frameIndex === totalFrames - 1 && (
        <div className="frame-scroll-hint">Scroll to continue ↓</div>
      )}
    </div>
  )
}
