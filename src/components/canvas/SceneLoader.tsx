'use client'

export default function SceneLoader() {
  return (
    <div
      className="absolute inset-0 z-20 flex h-full w-full items-center justify-center bg-[#050505]"
      role="status"
      aria-live="polite"
      aria-label="Loading 3D scene"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          {/* Outer subtle ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />

          {/* Animated BMW M cyan ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0ea5e9] animate-spin" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/50">
            Initializing
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">
            3D Experience
          </span>
        </div>
      </div>
    </div>
  )
}