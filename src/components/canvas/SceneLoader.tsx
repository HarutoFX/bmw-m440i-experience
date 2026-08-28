'use client'

/**
 * SceneLoader — Loading fallback displayed while HeroScene initialises.
 * Must be a Client Component since it's used in a dynamic() loading prop.
 */
export default function SceneLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#1c69d4]/30 border-t-[#1c69d4] animate-spin" />
        <span className="text-white/20 text-xs tracking-[0.2em] uppercase">
          Initializing Scene
        </span>
      </div>
    </div>
  )
}
