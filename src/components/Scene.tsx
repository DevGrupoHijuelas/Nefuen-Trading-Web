import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Hazelnut from './Hazelnut'
import Floor from './Floor'
import HeroFallingNuts from './HeroFallingNuts'
import GalleryFallingNuts from './GalleryFallingNuts'
import { Environment } from '@react-three/drei'
import { Physics } from '@react-three/rapier'

// Shared progress value — updated by App via window event
export let targetProgress = 0
export const cameraProgress = { current: 0 }
window.addEventListener('section-change', ((e: CustomEvent) => {
  targetProgress = e.detail.progress
}) as EventListener)

function CameraRig() {
  const progressRef = useRef(0)

  useFrame((state, delta) => {
    // Smoothly interpolate toward target (silky camera movement)
    progressRef.current += (targetProgress - progressRef.current) * Math.min(delta * 3, 1)
    cameraProgress.current = progressRef.current
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
      lookY = THREE.MathUtils.lerp(0, 0, ease)
    } else if (progress < 0.666) {
      const t = (progress - 0.333) / 0.333
      const ease = t * t * (3 - 2 * t)
      angle = THREE.MathUtils.lerp(Math.PI * 0.5, Math.PI, ease)
      radius = THREE.MathUtils.lerp(isMobile ? 12 : 8, isMobile ? 10 : 6, ease)
      y = THREE.MathUtils.lerp(2, 1, ease)
      lookX = THREE.MathUtils.lerp(isMobile ? 0 : 3, isMobile ? 0 : -3, ease)
      lookY = THREE.MathUtils.lerp(0, 0, ease)
    } else {
      const t = (progress - 0.666) / 0.334
      const ease = t * t * (3 - 2 * t)
      angle = THREE.MathUtils.lerp(Math.PI, Math.PI * 1.5, ease)
      radius = THREE.MathUtils.lerp(isMobile ? 10 : 6, isMobile ? 16 : 14, ease)
      y = THREE.MathUtils.lerp(1, 8, ease)
      lookX = THREE.MathUtils.lerp(isMobile ? 0 : -3, 0, ease)
      lookY = THREE.MathUtils.lerp(0, 0, ease)
    }

    state.camera.position.x = Math.sin(angle) * radius
    state.camera.position.z = Math.cos(angle) * radius
    state.camera.position.y = y

    state.camera.lookAt(lookX, lookY, 0)
  })
  return null
}

const FINAL_NUTS = Array.from({ length: 55 }, (_, i) => {
  // Final camera looks down from y=8 at origin. Nuts need to be on the XZ plane near y=0.
  const angle = Math.random() * Math.PI * 2
  const radius = 1 + Math.random() * 6
  const targetX = Math.cos(angle) * radius
  const targetZ = Math.sin(angle) * radius
  const targetY = -1 + Math.random() * 2  // Slight vertical variation

  // Start positions: fly in from far off-screen on the XZ plane  
  const startAngle = angle + (Math.random() - 0.5) * 0.5
  const startRadius = 25 + Math.random() * 15
  const startX = Math.cos(startAngle) * startRadius
  const startZ = Math.sin(startAngle) * startRadius
  const startY = -3 + Math.random() * 6

  return {
    id: i,
    type: Math.random() > 0.5 ? 'kernel' : 'inshell',
    target: [targetX, targetY, targetZ],
    start: [startX, startY, startZ],
    rotOffset: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
    rotSpeed: [(Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4]
  }
})

export default function Scene({ onLoaded }: { onLoaded?: () => void }) {
  useEffect(() => {
    if (onLoaded) onLoaded()
  }, [onLoaded])

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

      <Hazelnut position={[0, 0, 0]} isHero={true} type="inshell" />
      {FINAL_NUTS.map((nut) => (
        <Hazelnut 
          key={`final-${nut.id}`} 
          isFinalHero={true} 
          type={nut.type as 'kernel' | 'inshell'} 
          position={nut.start as [number,number,number]} 
          targetPosition={nut.target as [number,number,number]}
          rotOffset={nut.rotOffset as [number,number,number]}
          rotSpeed={nut.rotSpeed as [number,number,number]}
        />
      ))}
      <Physics>
        <Floor />
        <HeroFallingNuts />
        <GalleryFallingNuts />
      </Physics>
    </>
  )
}
