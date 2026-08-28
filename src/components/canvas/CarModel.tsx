'use client'

import { useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * CarModel — Loads and renders the GLTF/GLB vehicle asset.
 * 
 * Props:
 * - url: Path to the GLTF model (default: '/models/bmw-m440i.glb')
 * - position: Array of [x, y, z] to place the model on the floor
 * - rotation: Array of [x, y, z] to orient the model
 * - scale: Model scale (adjust depending on the exported asset's units)
 */
export default function CarModel({ 
  url = '/models/bmw-m440i.glb',
  position = [0, -1.0, 0],
  rotation = [0, 0, 0],
  scale = 1
}: { 
  url?: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Load the real GLTF model
  const { scene } = useGLTF(url)

  // Calculate bounding box and apply automatic scaling/centering
  // useMemo ensures we only compute the bounding box once when the scene loads
  const { scale: autoScale, positionOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    // A real BMW M440i is ~4.77 meters long.
    // We assume the longest dimension of the model is the length (Z or X).
    const maxLength = Math.max(size.x, size.z)
    
    // Calculate the scale factor to make the car ~4.7 meters long
    const scaleFactor = 4.7 / maxLength

    // Center the model on X and Z, and calculate the Y offset so the 
    // lowest point (bottom of the tires) sits exactly at local Y = 0.
    const offsetY = -box.min.y * scaleFactor
    const offsetX = -center.x * scaleFactor
    const offsetZ = -center.z * scaleFactor

    // Traverse the scene to enable shadows and update the car paint
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
        
        // Enhance the body paint to a realistic metallic white
        if (child.material && child.material.name === 'carpaint') {
          // Alpine/Mineral White finish
          child.material.color.set('#f2f4f5') 
          child.material.metalness = 0.9
          child.material.roughness = 0.1
          child.material.envMapIntensity = 2.0 // Boosted for cinematic reflections
          child.material.needsUpdate = true
        } else if (child.material && (child.material.name.toLowerCase().includes('glass') || child.material.name.toLowerCase().includes('window'))) {
          child.material.metalness = 1.0
          child.material.roughness = 0.0
          child.material.transparent = true
          child.material.opacity = 0.7
          child.material.envMapIntensity = 3.0
          child.material.needsUpdate = true
        }
      }
    })

    return {
      scale: scaleFactor * scale,
      positionOffset: [offsetX, offsetY, offsetZ] as [number, number, number]
    }
  }, [scene, scale])

  // Subtle idle float and cinematic oscillation with mouse tracking
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      // The group sits at the target position, and we animate it slightly.
      groupRef.current.position.y = position[1] + Math.sin(t * 0.55) * 0.015
      
      // Calculate target rotation based on base rotation + subtle time drift (approx ±8 degrees)
      const targetRotationY = rotation[1] + Math.sin(t * 0.1) * 0.15
      
      // Add a tiny bit of mouse tracking for extra depth
      const mouseX = (state.pointer.x * Math.PI) / 30
      
      // Smoothly interpolate the rotation for cinematic feel
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, 
        targetRotationY + mouseX, 
        0.05
      )
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* We apply the computed scale and offset to the scene itself */}
      <primitive 
        object={scene} 
        scale={autoScale} 
        position={positionOffset} 
      />
    </group>
  )
}

// Preload the model so it starts downloading immediately
useGLTF.preload('/models/bmw-m440i.glb')
