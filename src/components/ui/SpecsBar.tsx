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
        absolute bottom-8 left-0 right-0 z-20
        pointer-events-auto
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
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
                  text-white/80
                ">
                  {spec.label}
                </span>

                <div className="mt-1 flex items-baseline gap-1">
                  <span
                    className={cn(
                      'font-extralight tracking-widest leading-none',
                      spec.label.toLowerCase() === 'engine'
                        ? 'text-sm text-[#ef4444]'
                        : 'text-2xl text-[#ef4444]'
                    )}
                  >
                    {spec.value}
                  </span>

                  {spec.unit && (
                    <span className="text-xs text-white/80">
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