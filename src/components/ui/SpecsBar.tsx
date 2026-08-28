'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CAR_SPECS } from '@/lib/constants'

/**
 * SpecsBar — A compact horizontal spec ticker displayed below the hero.
 * Shows key performance numbers in a glassy strip.
 */
export default function SpecsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'absolute bottom-0 left-0 right-0 z-20',
        'border-t border-white/10',
        'bg-black/40 backdrop-blur-xl'
      )}
    >
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
          {CAR_SPECS.slice(0, 5).map((spec, i) => (
            <div key={spec.label} className="flex items-stretch">
              <div className="px-6 py-1 flex flex-col items-center min-w-fit">
                <span className="text-white/40 text-[10px] uppercase tracking-[0.15em] whitespace-nowrap">
                  {spec.label}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span 
                    className={cn(
                      'font-bold leading-none',
                      spec.label.toLowerCase() === 'engine' 
                        ? 'text-white text-base' 
                        : 'text-[#D71920] text-xl'
                    )}
                  >
                    {spec.value}
                  </span>
                  {spec.unit && (
                    <span className="text-white/50 text-xs">{spec.unit}</span>
                  )}
                </div>
              </div>
              {i < 4 && (
                <div className="w-px bg-white/10 self-stretch my-1" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
