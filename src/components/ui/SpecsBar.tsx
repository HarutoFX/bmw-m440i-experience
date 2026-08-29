'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CAR_SPECS } from '@/lib/constants'

const ease = [0.16, 1, 0.3, 1] as const

export default function SpecsBar() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 1.1,
        duration: 0.7,
        ease,
      }}
      className="
        absolute bottom-0 left-0 right-0 z-20
        border-t border-white/10
        bg-black/40
        backdrop-blur-xl
      "
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-8">
        <div className="
          flex items-center
          overflow-x-auto
          scrollbar-none
        ">
          {CAR_SPECS.slice(0, 5).map((spec, index) => (
            <div
              key={spec.label}
              className="flex min-w-fit items-stretch"
            >
              <div className="
                flex flex-col items-center
                px-5 py-1
                sm:px-6
              ">
                <span className="
                  whitespace-nowrap
                  text-[10px]
                  uppercase
                  tracking-[0.15em]
                  text-white/40
                ">
                  {spec.label}
                </span>

                <div className="mt-1 flex items-baseline gap-1">
                  <span
                    className={cn(
                      'font-bold leading-none',
                      spec.label.toLowerCase() === 'engine'
                        ? 'text-base text-white'
                        : 'text-xl text-[#D71920]'
                    )}
                  >
                    {spec.value}
                  </span>

                  {spec.unit && (
                    <span className="text-xs text-white/50">
                      {spec.unit}
                    </span>
                  )}
                </div>
              </div>

              {index < 4 && (
                <div className="
                  my-1 self-stretch
                  w-px
                  bg-white/10
                " />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}