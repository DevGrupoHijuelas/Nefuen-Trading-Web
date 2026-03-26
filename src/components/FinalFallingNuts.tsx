import { useState, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Hazelnut from './Hazelnut'
import { cameraProgress } from './Scene'

export default function FinalFallingNuts() {
  const [hazelnuts, setHazelnuts] = useState<{ id: number; position: [number, number, number]; rotation: [number, number, number]; angVel: [number, number, number] }[]>([])
  const hasStarted = useRef(false)
  const spawnCount = useRef(0)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    let isActive = true

    const spawnBatch = (count: number) => {
      const nuts = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + Math.random() + i,
        position: [(Math.random() - 0.5) * 8, 8 + Math.random() * 10, (Math.random() - 0.5) * 8] as [number, number, number],
        rotation: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2] as [number, number, number],
        angVel: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8] as [number, number, number],
      }))
      return nuts
    }

    const spawnLoop = () => {
      if (!isActive) return

      // Only start spawning once camera is actually at the final section
      if (cameraProgress.current > 0.85) {
        if (!hasStarted.current) {
          // First arrival: spawn a small initial batch (not 200 at once)
          hasStarted.current = true
          spawnCount.current = 0
          setHazelnuts(spawnBatch(30))
          spawnCount.current = 30
        } else if (spawnCount.current < 200) {
          // Gradually ramp up
          const batchSize = Math.min(10, 200 - spawnCount.current)
          setHazelnuts(prev => [...prev, ...spawnBatch(batchSize)].slice(-200))
          spawnCount.current += batchSize
        } else {
          // Maintenance: keep a steady trickle
          setHazelnuts(prev => [
            ...prev,
            ...spawnBatch(2)
          ].slice(-200))
        }
      }

      timeout = setTimeout(spawnLoop, hasStarted.current && spawnCount.current < 200 ? 150 : 300)
    }

    const handleVisibility = () => {
      if (document.hidden && timeout) { clearTimeout(timeout); timeout = null }
      else if (!document.hidden && !timeout) spawnLoop()
    }

    document.addEventListener('visibilitychange', handleVisibility)
    spawnLoop()

    return () => {
      isActive = false
      hasStarted.current = false
      spawnCount.current = 0
      if (timeout) clearTimeout(timeout)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  // Clear when leaving the final section
  useFrame(() => {
    if (cameraProgress.current < 0.7 && hazelnuts.length > 0) {
      hasStarted.current = false
      spawnCount.current = 0
      requestAnimationFrame(() => setHazelnuts([]))
    }
  })

  return (
    <>
      {hazelnuts.map((nut) => (
        <Hazelnut
           key={nut.id}
           position={nut.position}
           type="kernel"
           rotation={nut.rotation}
           angularVelocity={nut.angVel}
           mode="finalFalling"
           castShadow={false}
        />
      ))}
    </>
  )
}
