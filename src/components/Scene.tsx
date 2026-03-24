import { useState, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Hazelnut from './Hazelnut'
import Floor from './Floor'
import { Environment } from '@react-three/drei'
import { Physics } from '@react-three/rapier'

// Shared progress value — updated by App via window event
let targetProgress = 0
window.addEventListener('section-change', ((e: CustomEvent) => {
  targetProgress = e.detail.progress
}) as EventListener)

// Hero hazelnut position — camera targets this at section 2
const HERO_NUT_POS: [number, number, number] = [2, -0.2, -1]

function CameraRig() {
  const progressRef = useRef(0)

  useFrame((state, delta) => {
    // Smoothly interpolate toward target (silky camera movement)
    progressRef.current += (targetProgress - progressRef.current) * Math.min(delta * 3, 1)
    const progress = progressRef.current

    const isMobile = window.innerWidth < 768

    let angle, radius, y, lookX, lookY

    if (progress < 0.333) {
      const t = progress / 0.333
      const ease = t * t * (3 - 2 * t)
      angle = THREE.MathUtils.lerp(0, Math.PI * 0.5, ease)
      radius = THREE.MathUtils.lerp(15, isMobile ? 12 : 8, ease)
      y = THREE.MathUtils.lerp(5, 2, ease)
      lookX = THREE.MathUtils.lerp(0, isMobile ? 0 : 3, ease)
      lookY = THREE.MathUtils.lerp(0, isMobile ? 2 : 0, ease)
    } else if (progress < 0.666) {
      // Section 2: Cinematic close-up on the hero hazelnut (basketball-style)
      const t = (progress - 0.333) / 0.333
      const ease = t * t * (3 - 2 * t)

      // Start from section 1 end (orbit at π/2, radius 8)
      const startAngle = Math.PI * 0.5
      const startRadius = isMobile ? 12 : 8
      const startX = Math.sin(startAngle) * startRadius
      const startZ = Math.cos(startAngle) * startRadius
      const startY = 2

      // End: offset from hero nut — camera to its left, slightly above
      const endX = HERO_NUT_POS[0] - (isMobile ? 1.5 : 2.2)
      const endZ = HERO_NUT_POS[2] + (isMobile ? 1.5 : 2)
      const endY = HERO_NUT_POS[1] + (isMobile ? 0.6 : 0.4)

      state.camera.position.set(
        THREE.MathUtils.lerp(startX, endX, ease),
        THREE.MathUtils.lerp(startY, endY, ease),
        THREE.MathUtils.lerp(startZ, endZ, ease)
      )

      // LookAt transitions from pile center → hero nut
      const lx = THREE.MathUtils.lerp(isMobile ? 0 : 3, HERO_NUT_POS[0] + 0.3, ease)
      const ly = THREE.MathUtils.lerp(isMobile ? 2 : 0, HERO_NUT_POS[1] + 0.1, ease)
      const lz = THREE.MathUtils.lerp(0, HERO_NUT_POS[2], ease)
      state.camera.lookAt(lx, ly, lz)
      return
    } else {
      const t = (progress - 0.666) / 0.334
      const ease = t * t * (3 - 2 * t)
      angle = THREE.MathUtils.lerp(Math.PI, Math.PI * 1.5, ease)
      radius = THREE.MathUtils.lerp(isMobile ? 10 : 6, isMobile ? 16 : 14, ease)
      y = THREE.MathUtils.lerp(1, 8, ease)
      lookX = THREE.MathUtils.lerp(isMobile ? 0 : -3, 0, ease)
      lookY = THREE.MathUtils.lerp(isMobile ? 2 : 0, 0, ease)
    }

    state.camera.position.x = Math.sin(angle) * radius
    state.camera.position.z = Math.cos(angle) * radius
    state.camera.position.y = y

    state.camera.lookAt(lookX, lookY, 0)
  })
  return null
}

// Controls visibility of falling hazelnuts — hides them during section 2
function FallingNutsGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)
  const progressRef = useRef(0)

  useFrame((_, delta) => {
    progressRef.current += (targetProgress - progressRef.current) * Math.min(delta * 3, 1)
    if (groupRef.current) {
      // Hide during section 2 (progress 0.35–0.65)
      groupRef.current.visible = progressRef.current < 0.35 || progressRef.current > 0.65
    }
  })

  return <group ref={groupRef}>{children}</group>
}

// Controls visibility of hero hazelnut — only shows during section 2
function HeroNutGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)
  const progressRef = useRef(0)

  useFrame((_, delta) => {
    progressRef.current += (targetProgress - progressRef.current) * Math.min(delta * 3, 1)
    if (groupRef.current) {
      // Show during section 2 (progress 0.25–0.7)
      groupRef.current.visible = progressRef.current > 0.25 && progressRef.current < 0.7
    }
  })

  return <group ref={groupRef} visible={false}>{children}</group>
}

export default function Scene() {
  const [hazelnuts, setHazelnuts] = useState<{ id: number; position: [number, number, number]; type: 'kernel' | 'inshell'; rotation: [number, number, number]; angVel: [number, number, number] }[]>([])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null

    const spawnNut = () => {
      setHazelnuts((prev) => {
        const typeMix: 'kernel' | 'inshell' = 'inshell'
        return [
          ...prev,
          {
            id: Date.now(),
            position: [(Math.random() - 0.5) * 4, 10 + Math.random() * 2, (Math.random() - 0.5) * 4] as [number, number, number],
            type: typeMix,
            rotation: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2] as [number, number, number],
            angVel: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8] as [number, number, number],
          }
        ].slice(-100)
      })
    }

    const startInterval = () => {
      if (!interval) interval = setInterval(spawnNut, 400)
    }

    const stopInterval = () => {
      if (interval) { clearInterval(interval); interval = null }
    }

    const handleVisibility = () => {
      if (document.hidden) stopInterval()
      else startInterval()
    }

    document.addEventListener('visibilitychange', handleVisibility)
    startInterval()

    return () => {
      stopInterval()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <>
      <CameraRig />
      <color attach="background" args={['#ffffff']} />
      <fog attach="fog" args={['#ffffff', 10, 40]} />

      <directionalLight
        position={[4, 10, 2]}
        intensity={2.8}
      />

      <Environment preset="studio" />

      <Physics>
        <Floor />

        {/* Hero hazelnut — fixed, larger, only visible during section 2 */}
        <HeroNutGroup>
          <Hazelnut
            position={HERO_NUT_POS}
            type="inshell"
            rotation={[0.3, 0.8, -0.1]}
            fixed
            scaleOverride={0.6}
          />
        </HeroNutGroup>

        {/* Falling hazelnuts — hidden during section 2 */}
        <FallingNutsGroup>
          {hazelnuts.map((nut) => (
            <Hazelnut key={nut.id} position={nut.position} type={nut.type} rotation={nut.rotation} angularVelocity={nut.angVel} />
          ))}
        </FallingNutsGroup>
      </Physics>
    </>
  )
}
