'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { EASE_CURVE, PERFORMANCE_STATS } from '@/lib/constants'

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatProps {
  value: string
  unit: string
  label: string
  delay: number
}

function Stat({ value, unit, label, delay }: StatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col gap-2"
    >
      <div className="text-3xl font-light tracking-wide text-[#ef4444] md:text-4xl">
        {value}{' '}
        <span className="text-lg font-thin text-white/80">{unit}</span>
      </div>
      <div className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/80 md:text-xs">
        {label}
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PerformanceSection() {
  // Slice the 3 stats we need from the shared constant (Torque, 0-100, Top Speed)
  // PERFORMANCE_STATS order: hp, Nm, s, km/h — we skip the first (hp) which
  // is shown as the large headline number above.
  const stats = PERFORMANCE_STATS.slice(1) as readonly {
    value: string
    unit: string
    label: string
  }[]

  return (
    <section
      id="performance"
      className="
        relative flex min-h-screen w-full
        items-center overflow-hidden
        bg-transparent
        pt-32 pb-20
        pointer-events-none
        lg:pt-0 lg:pb-0
      "
    >
      <motion.div
        className="
          relative z-10
          flex w-full
          flex-col-reverse
          items-center
          pointer-events-auto
          lg:flex-row
        "
        initial={{ opacity: 0, scale: 0.985 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: EASE_CURVE }}
      >
        {/* Content */}
        <div
          className="
            flex w-full flex-col justify-center
            px-8 py-12 mx-4
            lg:w-[42%] lg:py-16 lg:px-14 lg:ml-16
            bg-black/60 border border-white/10
            rounded-3xl shadow-2xl
          "
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE_CURVE }}
          >
            {/* Section marker */}
            <div className="mb-8 flex items-center gap-4">
              <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-white/60">
                Performance Dynamics
              </span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_CURVE }}
                className="h-px bg-white/20"
              />
            </div>

            <h2
              className="
                mb-8
                text-4xl font-extralight
                uppercase
                leading-tight
                tracking-widest
                text-white
                md:text-5xl
                lg:text-6xl
              "
            >
              Engineered
              <br />
              <span className="text-white/50 font-thin">To Move You.</span>
            </h2>
          </motion.div>

          {/* HP — headline stat */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_CURVE }}
            className="mb-12"
          >
            <div className="
              text-[4rem]
              font-extralight
              leading-none
              tracking-tight
              text-[#ef4444]
              sm:text-[5rem]
              md:text-[6rem]
              lg:text-[7.5rem]
            ">
              {PERFORMANCE_STATS[0].value}

              <span className="
                ml-3
                text-xl
                font-light
                tracking-[0.2em]
                text-white/80
                sm:text-2xl
                md:text-3xl
                lg:text-4xl
              ">
                {PERFORMANCE_STATS[0].unit.toUpperCase()}
              </span>
            </div>

            <p className="
              mt-6
              text-[10px] font-medium
              uppercase
              tracking-[0.3em]
              text-white/80
              md:text-xs
            ">
              3.0L Inline-6 TwinPower Turbo
            </p>
          </motion.div>

          {/* Supporting stats — sourced from PERFORMANCE_STATS constant */}
          <div className="mt-2 flex flex-wrap gap-10 md:gap-16">
            {stats.map((stat, i) => (
              <Stat
                key={stat.label}
                value={stat.value}
                unit={stat.unit}
                label={stat.label}
                delay={0.2 + i * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Spacer for 3D car to be visible on the right */}
        <div className="hidden lg:block lg:w-7/12" />
      </motion.div>
    </section>
  )
}