'use client'

import dynamic from 'next/dynamic'
import SceneLoader from './SceneLoader'

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <SceneLoader />,
})

export default function DynamicHeroScene() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <HeroScene />
    </div>
  )
}