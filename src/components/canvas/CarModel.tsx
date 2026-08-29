'use client'

import { useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type CarModelProps = {
  url?: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}

export default function CarModel({
  url = '/models/bmw-m440i.glb',
  position = [0, -1, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: CarModelProps) {
  const groupRef = useRef<THREE.Group>(null)

  const { scene } = useGLTF(url)

  const { model, normalizedScale, offset } = useMemo(() => {
    /**
     * Clone the hierarchy.
     *
     * We additionally clone materials below so paint/glass modifications
     * never mutate Drei's cached GLTF instance.
     */
    const clonedScene = scene.clone(true)

    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return

      child.castShadow = true
      child.receiveShadow = true

      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) => material.clone())
      } else {
        child.material = child.material.clone()
      }
    })

    /**
     * Calculate the model's original bounds.
     */
    const box = new THREE.Box3().setFromObject(clonedScene)

    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    /**
     * BMW M440i real-world length ≈ 4.77m.
     *
     * We normalize whichever horizontal axis is longest.
     */
    const longestAxis = Math.max(size.x, size.z)

    const baseScale =
      longestAxis > 0
        ? 4.77 / longestAxis
        : 1

    /**
     * Center the car horizontally.
     *
     * Move the bottom of the model to Y = 0 so
     * positioning remains predictable.
     */
    const offset: [number, number, number] = [
      -center.x,
      -box.min.y,
      -center.z,
    ]

    /**
     * Improve materials after cloning.
     */
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material]

      materials.forEach((material) => {
        const name = material.name.toLowerCase()

        /**
         * BMW body paint.
         */
        if (
          name.includes('carpaint') ||
          name.includes('paint') ||
          name.includes('body')
        ) {
          material.color.set('#f4f5f6')

          if ('metalness' in material) {
            material.metalness = 0.82
          }

          if ('roughness' in material) {
            material.roughness = 0.16
          }

          if ('envMapIntensity' in material) {
            material.envMapIntensity = 1.8
          }

          material.needsUpdate = true
        }

        /**
         * Glass.
         */
        if (
          name.includes('glass') ||
          name.includes('window') ||
          name.includes('windshield')
        ) {
          if ('metalness' in material) {
            material.metalness = 0.05
          }

          if ('roughness' in material) {
            material.roughness = 0.03
          }

          if ('envMapIntensity' in material) {
            material.envMapIntensity = 2
          }

          material.transparent = true
          material.opacity = 0.72
          material.needsUpdate = true
        }
      })
    })

    return {
      model: clonedScene,
      normalizedScale: baseScale,
      offset,
    }
  }, [scene])

  /**
   * Cinematic idle animation.
   */
  useFrame((state, delta) => {
    const group = groupRef.current

    if (!group) return

    const time = state.clock.getElapsedTime()

    /**
     * Very subtle floating motion.
     */
    const idleY =
      position[1] +
      Math.sin(time * 0.55) * 0.012

    group.position.x = position[0]
    group.position.y = THREE.MathUtils.damp(
      group.position.y,
      idleY,
      4,
      delta
    )
    group.position.z = position[2]

    /**
     * Subtle cinematic movement.
     */
    const cinematicRotation =
      Math.sin(time * 0.12) * 0.06

    /**
     * Mouse parallax.
     */
    const mouseRotation =
      state.pointer.x * 0.07

    const targetRotationY =
      rotation[1] +
      cinematicRotation +
      mouseRotation

    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetRotationY,
      3,
      delta
    )

    /**
     * Preserve supplied X/Z rotation while allowing tiny pitch movement.
     */
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      rotation[0] +
        state.pointer.y * 0.015,
      3,
      delta
    )

    group.rotation.z = THREE.MathUtils.damp(
      group.rotation.z,
      rotation[2],
      3,
      delta
    )
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
    >
      <primitive
        object={model}
        position={offset}
        scale={normalizedScale * scale}
      />
    </group>
  )
}

useGLTF.preload('/models/bmw-m440i.glb')