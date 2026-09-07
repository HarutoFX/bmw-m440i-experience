'use client'

import { memo, Suspense, useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Html,
  MeshReflectorMaterial,
  PerformanceMonitor,
} from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

import { useConfiguratorStore } from '@/lib/store'

import CarModel from './CarModel'
import Preloader from './Preloader'
import { EASE_CURVE } from '@/lib/constants'

// ─── Background slash ────────────────────────────────────────────────────────
// Memoized so it never re-renders when parent state changes.

const BackgroundSlash = memo(function BackgroundSlash() {
  return (
    <group position={[4, 2, -10]} rotation={[0, 0, Math.PI / 5]}>
      {/* Outer glow */}
      <mesh>
        <cylinderGeometry args={[0.6, 0.6, 30, 8]} />
        <meshBasicMaterial
          color="#a0aec0"
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>

      {/* Core glow */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 30, 8]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>

      {/* White center */}
      <mesh>
        <cylinderGeometry args={[0.018, 0.018, 30, 8]} />
        <meshBasicMaterial color="#ffffff" depthWrite={false} />
      </mesh>
    </group>
  )
})

// ─── Responsive car model ────────────────────────────────────────────────────
// Uses useThree instead of a manual window resize listener so R3F's
// already-reactive viewport data drives the configuration.

function ResponsiveCarModel() {
  const { viewport } = useThree()
  const width = viewport.width

  // R3F viewport.width is in Three.js units; translate to approximate pixels
  // by multiplying by the canvas pixel ratio.
  // A simpler, reliable approach is to use the raw size from the renderer:
  const { size } = useThree()
  const pixelWidth = size.width

  const config =
    pixelWidth < 768
      ? { scale: 0.92, position: [0.3, -1.1, 0] as [number, number, number] }
      : pixelWidth < 1024
        ? { scale: 1.12, position: [1, -1.1, 0] as [number, number, number] }
        : { scale: 1.3, position: [1.5, -1.1, 0] as [number, number, number] }

  void width // consumed above via size.width

  return (
    <CarModel
      position={config.position}
      rotation={[0, -Math.PI / 6, 0]}
      scale={config.scale}
    />
  )
}

// ModelLoader removed in favor of Preloader component

// ─── Scroll-Driven Camera Controller ─────────────────────────────────────────

function ScrollCameraController() {
  const activeConfigStep = useConfiguratorStore((state) => state.activeConfigStep)

  useFrame((state, delta) => {
    // 1. Calculate global scroll progress (0 to 1)
    const scrollY = window.scrollY || 0
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0

    // 2. Define cinematic keyframes for Camera Position
    const posHero = new THREE.Vector3(6, 1, 7)
    const posPerformance = new THREE.Vector3(0.5, 0.4, 8.5) // Low angle, straight at the grill
    const posDesign = new THREE.Vector3(-5, 1.2, -6) // Wide rear 3/4
    const posTech = new THREE.Vector3(-3, 3.5, 3) // High angle overlooking hood and interior
    const posConfig = new THREE.Vector3(5.5, 0.5, 4.5) // Front 3/4 view slightly raised
    const posFinal = new THREE.Vector3(4, 0.5, 6) 

    // 3. Define cinematic keyframes for Camera Target (lookAt)
    const targetHero = new THREE.Vector3(0, 0, 0)
    const targetPerformance = new THREE.Vector3(0.5, 0, 2) // Focus on the front grille/badge
    const targetDesign = new THREE.Vector3(0, 0, -2) // Focus on rear tail lights
    const targetTech = new THREE.Vector3(0, 0.5, 0) // Focus on cabin
    const targetConfig = new THREE.Vector3(1.5, -0.2, 0) // Center on the car's actual position
    const targetFinal = new THREE.Vector3(1.5, -0.2, 0) // Slowly pan target

    let targetPos = posHero
    let targetLook = targetHero

    // Interpolate between keyframes strictly based on scroll progress
    if (progress < 0.2) {
      // Hero to Performance
      const p = progress / 0.2
      targetPos = posHero.clone().lerp(posPerformance, p)
      targetLook = targetHero.clone().lerp(targetPerformance, p)
    } else if (progress < 0.4) {
      // Performance to Design
      const p = (progress - 0.2) / 0.2
      targetPos = posPerformance.clone().lerp(posDesign, p)
      targetLook = targetPerformance.clone().lerp(targetDesign, p)
    } else if (progress < 0.6) {
      // Design to Tech
      const p = (progress - 0.4) / 0.2
      targetPos = posDesign.clone().lerp(posTech, p)
      targetLook = targetDesign.clone().lerp(targetTech, p)
    } else if (progress < 0.8) {
      // Tech to Config
      const p = (progress - 0.6) / 0.2
      targetPos = posTech.clone().lerp(posConfig, p)
      targetLook = targetTech.clone().lerp(targetConfig, p)
    } else {
      // Config to Final (Sweeping Orbit)
      const p = Math.min((progress - 0.8) / 0.1, 1)
      const time = state.clock.elapsedTime
      const angle = -0.21 + Math.sin(time * 0.15) * 0.7
      const radius = 7.16
      
      const orbitPos = new THREE.Vector3(
        1.5 + Math.cos(angle) * radius,
        0.5 + Math.sin(time * 0.25) * 0.2,
        Math.sin(angle) * radius
      )
      
      targetPos = posConfig.clone().lerp(orbitPos, p)
      targetLook = targetConfig.clone()
    }

    // 4. Smoothly damp the camera position and lookAt
    state.camera.position.lerp(targetPos, 0.05)
    
    // We need to keep track of a smooth lookAt vector
    // A simple way is to use a dummy object or just damp a local vector
    if (!state.camera.userData.currentLookAt) {
      state.camera.userData.currentLookAt = targetHero.clone()
    }
    state.camera.userData.currentLookAt.lerp(targetLook, 0.05)
    state.camera.lookAt(state.camera.userData.currentLookAt)
  })

  return null
}

// ─── Main scene ──────────────────────────────────────────────────────────────

function DynamicLighting() {
  const env = useConfiguratorStore((state) => state.selectedEnvironment)

  if (env === 'city') {
    return (
      <group>
        <ambientLight color="#0a0a1a" intensity={0.2} />
        <directionalLight
          position={[5, 6, 8]}
          color="#ff2a6d"
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00035}
        />
        <directionalLight position={[-6, 4, -3]} color="#05d9e8" intensity={2.0} />
        <pointLight position={[-4, 2, -4]} color="#ff2a6d" intensity={1.5} distance={20} />
        <pointLight position={[1.5, -0.7, 0]} color="#05d9e8" intensity={1.0} distance={10} />
      </group>
    )
  }

  if (env === 'sunset') {
    return (
      <group>
        <ambientLight color="#2a1a1a" intensity={0.4} />
        <directionalLight
          position={[8, 3, 8]}
          color="#ff7b00"
          intensity={2.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00035}
        />
        <directionalLight position={[-6, 4, -3]} color="#7a42f4" intensity={1.2} />
        <pointLight position={[-4, 2, -4]} color="#ff5500" intensity={1.0} distance={20} />
      </group>
    )
  }

  // Default Studio
  return (
    <group>
      <ambientLight color="#1a1a24" intensity={0.5} />
      <hemisphereLight color="#202436" groundColor="#020202" intensity={0.35} />
      <directionalLight
        position={[5, 6, 8]}
        color="#ffffff"
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={7}
        shadow-camera-bottom={-6}
        shadow-bias={-0.00035}
      />
      <spotLight position={[0, 8, 3]} angle={0.6} penumbra={0.9} intensity={1.2} color="#e8edff" castShadow />
      <directionalLight position={[-5, 3, 7]} color="#ffffff" intensity={0.55} />
      <directionalLight position={[-6, 4, -3]} color="#e0e7ff" intensity={1.0} />
      <directionalLight position={[-2, 2, -7]} color="#a0aec0" intensity={0.8} />
      <pointLight position={[-4, 2, -4]} color="#ffffff" intensity={0.8} distance={18} decay={2} />
      <pointLight position={[1.5, -0.7, 0]} color="#e0e7ff" intensity={0.6} distance={5} decay={2} />
      <pointLight position={[3, 1, 1]} color="#ffffff" intensity={1.2} distance={5} decay={2} />
      <BackgroundSlash />
    </group>
  )
}

function EnvironmentController() {
  const env = useConfiguratorStore((state) => state.selectedEnvironment)
  const preset = env === 'city' ? 'night' : env === 'sunset' ? 'sunset' : 'studio'
  const intensity = env === 'city' ? 0.8 : env === 'sunset' ? 0.6 : 0.3
  return <Environment preset={preset} environmentIntensity={intensity} />
}

export default function HeroScene() {
  void EASE_CURVE
  const [dpr, setDpr] = useState(1.5)

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [5.8, 0.8, 6.8],
          fov: 35,
          near: 0.1,
          far: 60,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        shadows="percentage"
        dpr={dpr}
      >
        <color attach="background" args={['#020202']} />
        <fog attach="fog" args={['#020202', 14, 35]} />

        <PerformanceMonitor onIncline={() => setDpr(1.75)} onDecline={() => setDpr(1)} />

        <DynamicLighting />

        <Suspense fallback={<Preloader />}>
          <EnvironmentController />
          <ResponsiveCarModel />
        </Suspense>

        <ContactShadows
          position={[1.5, -1.09, 0]}
          opacity={0.9}
          scale={14}
          blur={2}
          far={3}
          color="#000000"
        />

        <mesh
          position={[0, -1.1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[300, 80]}
            resolution={512}
            mixBlur={1}
            mixStrength={7}
            roughness={0.55}
            depthScale={1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#020202"
            metalness={0.7}
            mirror={0.22}
          />
        </mesh>

        <ScrollCameraController />

        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.5} 
            mipmapBlur 
            intensity={0.4} 
            levels={8}
            opacity={1}
          />
          <Vignette 
            offset={0.3} 
            darkness={0.6} 
            blendFunction={BlendFunction.NORMAL} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}