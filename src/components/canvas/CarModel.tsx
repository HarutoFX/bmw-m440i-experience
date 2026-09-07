'use client'

import { useMemo, useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useConfiguratorStore } from '@/lib/store'

const PAINT_COLORS: Record<string, string> = {
  alpine_white: '#f2f2f2',
  black_sapphire: '#050505',
  brooklyn_grey: '#5E6268',
  isle_of_man_green: '#144633',
  toronto_red: '#A81C21',
  marina_bay_blue: '#002E6E',
  voodoo_blue: '#005bb0',
  thundernight: '#2c144a',
}

const INTERIOR_COLORS = {
  black: '#111111',
  cognac: '#8A4A24',
  red: '#701010',
}



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
  const paintMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([])
  const interiorMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([])
  
  const selectedColor = useConfiguratorStore((state) => state.selectedColor)
  const selectedInterior = useConfiguratorStore((state) => state.selectedInterior)

  const { scene } = useGLTF(url)

  const { model, normalizedScale, offset } = useMemo(() => {
    /**
     * Clone the hierarchy.
     *
     * We clone materials so paint/glass modifications never mutate
     * Drei's cached GLTF instance. Shadow flags, material cloning,
     * and material patching are all done in a single traversal to
     * avoid walking the scene graph twice.
     */
    const clonedScene = scene.clone(true)

    const box = new THREE.Box3()

    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return

      // ── Shadow ──────────────────────────────────────────────────
      child.castShadow = true
      child.receiveShadow = true

      // ── Material isolation ───────────────────────────────────────
      if (Array.isArray(child.material)) {
        child.material = child.material.map((m) => m.clone())
      } else {
        child.material = child.material.clone()
      }

      // ── Material patching ────────────────────────────────────────
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
          if ('metalness' in material) material.metalness = 0.82
          if ('roughness' in material) material.roughness = 0.16
          if ('envMapIntensity' in material) material.envMapIntensity = 1.8

          material.needsUpdate = true
          paintMaterialsRef.current.push(material as THREE.MeshStandardMaterial)
        }

        /**
         * Interior / Leather
         */
        if (
          name.includes('interior') ||
          name.includes('leather') ||
          name.includes('leahter') ||
          name.includes('seat') ||
          name.includes('fabric') ||
          name.includes('upholstery')
        ) {
          if ('roughness' in material) material.roughness = 0.65
          if ('metalness' in material) material.metalness = 0.0
          if ('envMapIntensity' in material) material.envMapIntensity = 0.8
          material.needsUpdate = true
          interiorMaterialsRef.current.push(material as THREE.MeshStandardMaterial)
        }

        /**
         * Wheels / Rims
         */
        if (
          name.includes('wheel') ||
          name.includes('rim') ||
          name.includes('alloy')
        ) {
          if ('metalness' in material) material.metalness = 0.8
          if ('roughness' in material) material.roughness = 0.2
          material.needsUpdate = true
        }

        /**
         * Glass (Windows)
         */
        if (
          (name.includes('glass') ||
            name.includes('window') ||
            name.includes('windshield')) &&
          !name.includes('light') &&
          !name.includes('loght') &&
          !name.includes('red')
        ) {
          if ('metalness' in material) material.metalness = 0.1
          if ('roughness' in material) material.roughness = 0.03
          if ('envMapIntensity' in material) material.envMapIntensity = 2.5
          if ('color' in material) material.color.set('#080808')

          material.transparent = true
          material.opacity = 0.85
          material.needsUpdate = true
        }
      })

      // Expand the bounding box incrementally inside the same traversal
      box.expandByObject(child)
    })

    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    /**
     * BMW M440i real-world length ≈ 4.77m.
     *
     * We normalize whichever horizontal axis is longest.
     */
    const longestAxis = Math.max(size.x, size.z)
    const baseScale = longestAxis > 0 ? 4.77 / longestAxis : 1

    /**
     * Center the car horizontally and move the bottom to Y = 0
     * so external positioning remains predictable.
     */
    const offset: [number, number, number] = [
      -center.x,
      -box.min.y,
      -center.z,
    ]

    return { model: clonedScene, normalizedScale: baseScale, offset }
  }, [scene])

  // React to paint color changes
  useEffect(() => {
    const hex = PAINT_COLORS[selectedColor]
    const color = new THREE.Color(hex)
    const isMatte = selectedColor.startsWith('frozen_')
    
    paintMaterialsRef.current.forEach((mat) => {
      mat.color.set(color)
      if ('roughness' in mat) mat.roughness = isMatte ? 0.45 : 0.16
      if ('metalness' in mat) mat.metalness = isMatte ? 0.5 : 0.82
      mat.needsUpdate = true
    })
  }, [selectedColor])

  // React to interior color changes
  useEffect(() => {
    const hex = INTERIOR_COLORS[selectedInterior]
    const color = new THREE.Color(hex)
    interiorMaterialsRef.current.forEach((mat) => {
      mat.color.set(color)
      mat.needsUpdate = true
    })
  }, [selectedInterior])



  /**
   * Cinematic idle animation.
   *
   * Position components are cached outside the frame body so we're
   * not doing repeated index accesses on every tick.
   */
  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    const px = position[0]
    const py = position[1]
    const pz = position[2]

    const time = state.clock.elapsedTime

    // Very subtle floating motion
    const idleY = py + Math.sin(time * 0.55) * 0.012

    group.position.x = px
    group.position.y = THREE.MathUtils.damp(group.position.y, idleY, 4, delta)
    group.position.z = pz

    // Subtle cinematic yaw + mouse parallax
    const cinematicRotation = Math.sin(time * 0.12) * 0.06
    const mouseRotation = state.pointer.x * 0.07
    const targetRotationY = rotation[1] + cinematicRotation + mouseRotation

    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetRotationY,
      3,
      delta
    )

    // Preserve supplied X/Z rotation while allowing tiny pitch movement
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      rotation[0] + state.pointer.y * 0.015,
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
    <group ref={groupRef} position={position} rotation={rotation}>
      <primitive
        object={model}
        position={offset}
        scale={normalizedScale * scale}
      />
    </group>
  )
}

useGLTF.preload('/models/bmw-m440i.glb')