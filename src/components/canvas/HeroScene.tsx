'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Html,
  MeshReflectorMaterial,
  OrbitControls,
} from '@react-three/drei'

import CarModel from './CarModel'

type ViewportType =
  | 'mobile'
  | 'tablet'
  | 'desktop'

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
        shadows
        dpr={[1, 1.75]}
      >
        {/* Background */}

        <color
          attach="background"
          args={['#050505']}
        />

        <fog
          attach="fog"
          args={['#050505', 14, 35]}
        />

        {/* Ambient */}

        <ambientLight
          color="#1a0505"
          intensity={0.5}
        />

        <hemisphereLight
          color="#291010"
          groundColor="#050505"
          intensity={0.35}
        />

        {/* Main Key Light */}

        <directionalLight
          position={[5, 6, 8]}
          color="#ffffff"
          intensity={2.6}
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

        {/* Roof highlight */}

        <spotLight
          position={[0, 8, 3]}
          angle={0.6}
          penumbra={0.9}
          intensity={2}
          color="#e8edff"
          castShadow
        />

        {/* Front fill */}

        <directionalLight
          position={[-5, 3, 7]}
          color="#ffffff"
          intensity={0.55}
        />

        {/* Main red rim */}

        <directionalLight
          position={[-6, 4, -3]}
          color="#ff0000"
          intensity={2.6}
        />

        {/* Rear red accent */}

        <directionalLight
          position={[-2, 2, -7]}
          color="#D71920"
          intensity={1}
        />

        {/* Atmospheric red light */}

        <pointLight
          position={[-4, 2, -4]}
          color="#D71920"
          intensity={1.2}
          distance={18}
          decay={2}
        />

        {/* Underbody red glow */}

        <pointLight
          position={[1.5, -0.7, 0]}
          color="#D71920"
          intensity={2.5}
          distance={5}
          decay={2}
        />

        {/* Front grille highlight */}

        <pointLight
          position={[3, 1, 1]}
          color="#ffffff"
          intensity={1.2}
          distance={5}
          decay={2}
        />

        {/* Background light slash */}

        <BackgroundSlash />

        {/* Vehicle */}

        <Suspense fallback={<ModelLoader />}>
          <Environment
            preset="studio"
            environmentIntensity={0.3}
          />

          <ResponsiveCarModel />
        </Suspense>

        {/* Ground shadow */}

        <ContactShadows
          position={[1.5, -1.1, 0]}
          opacity={0.9}
          scale={14}
          blur={2}
          far={3}
          color="#000000"
        />

        {/* Reflective floor */}

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

        {/* Controls */}

        <OrbitControls
          enablePan={false}
          enableZoom
          enableDamping
          dampingFactor={0.05}
          minDistance={4}
          maxDistance={12}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.05}
          target={[-0.5, -0.2, 0]}
        />
      </Canvas>
    </div>
  )
}

function ModelLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />

        <span className="text-white/60 text-xs tracking-widest uppercase">
          Loading M440i
        </span>
      </div>
    </Html>
  )
}

function BackgroundSlash() {
  return (
    <group
      position={[4, 2, -10]}
      rotation={[0, 0, Math.PI / 5]}
    >
      {/* Outer glow */}

      <mesh>
        <cylinderGeometry
          args={[0.6, 0.6, 30, 8]}
        />

        <meshBasicMaterial
          color="#D71920"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>

      {/* Red core */}

      <mesh>
        <cylinderGeometry
          args={[0.15, 0.15, 30, 8]}
        />

        <meshBasicMaterial
          color="#ff0000"
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </mesh>

      {/* White center */}

      <mesh>
        <cylinderGeometry
          args={[0.018, 0.018, 30, 8]}
        />

        <meshBasicMaterial
          color="#ffffff"
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function ResponsiveCarModel() {
  const [viewport, setViewport] =
    useState<ViewportType>('desktop')

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth

      if (width < 768) {
        setViewport('mobile')
      } else if (width < 1024) {
        setViewport('tablet')
      } else {
        setViewport('desktop')
      }
    }

    updateViewport()

    window.addEventListener(
      'resize',
      updateViewport
    )

    return () => {
      window.removeEventListener(
        'resize',
        updateViewport
      )
    }
  }, [])

  const config = {
    mobile: {
      scale: 0.92,
      position: [0.3, -1.1, 0] as [
        number,
        number,
        number
      ],
    },

    tablet: {
      scale: 1.12,
      position: [1, -1.1, 0] as [
        number,
        number,
        number
      ],
    },

    desktop: {
      scale: 1.3,
      position: [1.5, -1.1, 0] as [
        number,
        number,
        number
      ],
    },
  }

  const current = config[viewport]

  return (
    <CarModel
      position={current.position}
      rotation={[0, -Math.PI / 6, 0]}
      scale={current.scale}
    />
  )
}