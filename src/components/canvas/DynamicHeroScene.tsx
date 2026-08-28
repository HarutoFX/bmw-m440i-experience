'use client'

/**
 * DynamicHeroScene — Client Component wrapper for the dynamic HeroScene import.
 *
 * In Next.js 16 App Router, `next/dynamic` with `ssr: false` is ONLY permitted
 * inside Client Components. Server Components cannot use this pattern.
 *
 * This wrapper satisfies that constraint: it is a Client Component that
 * lazily loads HeroScene with SSR disabled, which is required for WebGL/Three.js.
 *
 * Ref: node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md
 *      (section: "Third-party components")
 */

import dynamic from 'next/dynamic'
import SceneLoader from './SceneLoader'

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <SceneLoader />,
})

export default function DynamicHeroScene() {
  return <HeroScene />
}
