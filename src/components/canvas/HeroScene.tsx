'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Html, MeshReflectorMaterial, Environment } from '@react-three/drei'
import CarModel from './CarModel'

/**
 * HeroScene — Primary WebGL canvas for the BMW M440i homepage.
 *
 * Cinematic three-point lighting — all lights are Three.js primitives,
 * no async HDR or texture downloads. Renders immediately.
 *
 * Key fix from v1: removed invalid `gl.shadowMap` that was silently
 * corrupting the WebGL renderer. Use the top-level `shadows` prop instead.
 */
export default function HeroScene() {
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
        shadows   // ← boolean enables PCF shadow maps cleanly
        dpr={[1, 2]}
      >
        {/* ── Scene Background & Atmosphere ───────────────────────── */}
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 14, 35]} />

        {/* ── Ambient fallback — keeps nothing fully black ───────── */}
        <ambientLight color="#1a0505" intensity={0.6} />


        {/* ── Hemisphere — sky warm, ground cold ────────────────── */}
        <hemisphereLight
          color="#1a0505"
          groundColor="#050505"
          intensity={0.35}
        />

        {/* ── KEY LIGHT — clean neutral ─────────── */}
        {/*   The main illuminator. Reveals the hood plane, the side */}
        {/*   body, and the rim of the nearest wheel.               */}
        <directionalLight
          position={[4, 4, 10]}
          color="#ffffff"
          intensity={2.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={28}
          shadow-camera-left={-7}
          shadow-camera-right={7}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
          shadow-bias={-0.0004}
        />

        {/* ── ROOF HIGHLIGHT — cool neutral ─────────── */}
        <spotLight
          position={[0, 8, 2]}
          angle={0.6}
          penumbra={1}
          intensity={2.0}
          color="#e6ebff"
          castShadow
        />

        {/* ── FILL LIGHT — soft red, front-left ────────────── */}
        <directionalLight
          position={[-5, 4, 6]}
          color="#ffb8b8"
          intensity={0.4}
        />

        {/* ── RIM LIGHT — performance red, roofline & left side ───── */}
        <directionalLight
          position={[-6, 4, -2]}
          color="#ff0000"
          intensity={3.0}
        />

        {/* ── SECONDARY RIM LIGHT — faint red, rear/right side ───── */}
        <directionalLight
          position={[-2, 1, -6]}
          color="#ff0000"
          intensity={1.0}
        />

        {/* ── ACCENT — deep-red gradient concentrated behind typography ───────── */}
        <pointLight
          position={[-4, 2.0, -4]}
          color="#D71920"
          intensity={1.2}
          distance={18}
          decay={2.2}
        />

        {/* ── Background Neon Slash ───────────────────────────────── */}
        <group position={[4, 2, -10]} rotation={[0, 0, Math.PI / 5]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 30, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.15, 0.15, 30, 8]} />
            <meshBasicMaterial color="#ff0000" transparent opacity={0.6} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.6, 0.6, 30, 8]} />
            <meshBasicMaterial color="#D71920" transparent opacity={0.2} />
          </mesh>
        </group>

        {/* ── Under-car atmosphere — M Red pool on floor ─────── */}
        <pointLight
          position={[1.5, -0.9, 0]}
          color="#D71920"
          intensity={3.0}
          distance={5}
          decay={2.5}
        />

        {/* ── Headlight & Grille fill — sharp bright white ─────── */}
        <pointLight
          position={[2.6, 0.4, 0.5]}
          color="#ffffff"
          intensity={1.5}
          distance={5}
          decay={2}
        />

        {/* ── Car Model ─────────────────────────────────────────── */}
        <Suspense
          fallback={
            <Html center>
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/90 animate-spin" />
                <span className="text-white/60 text-xs tracking-widest uppercase font-medium">
                  Loading Model
                </span>
              </div>
            </Html>
          }
        >
          {/* ── Environment Map — Required for realistic glass reflections ───────── */}
          <Environment preset="studio" environmentIntensity={0.25} />
          <ResponsiveCarModel />
        </Suspense>

        {/* ── Contact shadows — perfectly aligned to floor ────── */}
        <ContactShadows
          position={[1.5, -1.1, 0]}
          opacity={1.0}
          scale={14}
          blur={1.8}
          far={3.0}
          color="#000005"
        />

        {/* ── Studio floor ──────────────────────────────────────── */}
        <mesh
          position={[0, -1.1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={10}
            roughness={0.5}
            depthScale={1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#020202"
            metalness={0.8}
            mirror={0.3}
          />
        </mesh>

        {/* ── Camera controls ───────────────────────────────────── */}
        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={12}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.05} // Lower angle, almost ground level
          autoRotate={false}
          target={[-0.5, -0.2, 0]} // Offset target slightly left to help framing
        />
      </Canvas>
    </div>
  )
}

function ResponsiveCarModel() {
  // We can safely use window here because HeroScene is dynamically imported with ssr: false
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

  // Scale down on smaller screens to prevent cropping
  const scale = isMobile ? 0.95 : isTablet ? 1.15 : 1.32
  
  // Center more on mobile, offset on desktop
  const positionX = isMobile ? 0.5 : isTablet ? 1.0 : 1.5

  return (
    <CarModel 
      position={[positionX, -1.1, 0]} 
      rotation={[0, -Math.PI / 6, 0]} 
      scale={scale} 
    />
  )
}
