'use client'

import { Html, useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader() {
  const { active, progress } = useProgress()
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Keep showing until slightly after load to ensure everything is ready
    if (!active && progress === 100) {
      const timeout = setTimeout(() => setShow(false), 800)
      return () => clearTimeout(timeout)
    }
  }, [active, progress])

  return (
    <Html center zIndexRange={[1000, 0]} className="pointer-events-none">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#020202]"
            style={{ width: '100vw', height: '100vh', transform: 'translate(-50%, -50%)' }}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="h-24 w-24 rounded-full border-[1px] border-white/10 border-t-white"
                />
                {/* Inner Pulse */}
                <motion.div
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute h-8 w-8 rounded-full bg-white/20 blur-xl"
                />
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-white">
                  Loading Experience
                </span>
                <span className="text-[9px] font-thin tracking-[0.3em] text-white/40">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  )
}
