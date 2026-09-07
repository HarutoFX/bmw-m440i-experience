'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import Image from 'next/image'
import { EASE_CURVE } from '@/lib/constants'

// ─── Animation variants ───────────────────────────────────────────────────────
// Hoisted to module scope — no closure dependencies.

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.25,
    },
  },
}

const featureVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_CURVE },
  },
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface DesignFeature {
  title: string
  children: React.ReactNode
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function RevealText({
  children,
  delay,
  gradient = false,
}: {
  children: React.ReactNode
  delay: number
  gradient?: boolean
}) {
  return (
    <div className="mt-1 overflow-hidden pb-1">
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: EASE_CURVE }}
        className={
          gradient
            ? 'bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent'
            : ''
        }
      >
        {children}
      </motion.div>
    </div>
  )
}

function Feature({
  title,
  index,
  children,
}: {
  title: string
  index: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      className="group flex cursor-default items-start"
      variants={featureVariants}
    >
      <div className="mr-5 mt-1 flex h-6 shrink-0 items-start">
        <motion.div
          className="
            h-6 w-[1px]
            bg-white/30
            transition-all duration-500
            group-hover:h-full
            group-hover:bg-white/80
            group-hover:shadow-[0_0_12px_rgba(255,255,255,0.3)]
          "
          initial={{ height: 0 }}
          whileInView={{ height: 24 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        />
      </div>

      <div>
        <h3 className="
          mb-2
          text-xs font-light
          uppercase
          tracking-widest
          text-[#ef4444]
          transition-colors duration-500
          group-hover:text-[#f87171]
        ">
          {title}
        </h3>

        <p className="max-w-sm text-[10px] font-thin uppercase tracking-[0.2em] leading-relaxed text-white/70 transition-colors duration-500 group-hover:text-white/90">
          {children}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DesignSection() {
  const containerRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section
      id="design"
      ref={containerRef}
      className="
        relative flex min-h-screen w-full
        items-center overflow-hidden
        bg-transparent
        pointer-events-none
      "
    >
      <motion.div
        className="
          relative z-10
          flex min-h-screen w-full
          flex-col items-center
          pointer-events-auto
          lg:flex-row
        "
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8 }}
      >
        {/* Content */}
        <div
          className="
            order-1 z-20
            flex w-full flex-col justify-center
            px-8 py-12 mx-4
            md:px-16
            lg:order-1 lg:w-[42%]
            lg:w-[42%] lg:py-16 lg:px-14 lg:ml-16
            bg-black/60 border border-white/10
            rounded-3xl shadow-2xl
          "
        >
          {/* Section marker */}
          <div className="mb-8 flex items-center gap-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-white/60">
              Exterior Design
            </span>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_CURVE }}
              className="h-px bg-white/20"
            />
          </div>

          <h2 className="
            mb-12
            text-4xl font-extralight
            uppercase
            leading-tight
            tracking-widest
            text-white
            md:text-5xl
            xl:text-6xl
          ">
            <RevealText delay={0.05}>Designed To</RevealText>

            <RevealText delay={0.15} gradient>
              Command Attention.
            </RevealText>
          </h2>

          <motion.div
            className="mt-4 space-y-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Feature title="M Aerodynamic Package" index={0}>
              Aggressive front aprons, striking air intakes, and a sculpted
              bumper engineered for optimal airflow and cooling.
            </Feature>

            <Feature title="Adaptive LED Headlights" index={1}>
              Iconic daytime running lights and precision illumination
              designed to deliver exceptional visibility and presence.
            </Feature>

            <Feature title={'19" M Alloy Wheels'} index={2}>
              Lightweight double-spoke wheels that frame the M Sport brake
              calipers and reinforce the vehicle&apos;s athletic stance.
            </Feature>
          </motion.div>
        </div>

        {/* Spacer for 3D car to be visible on the right */}
        <div className="hidden lg:block lg:w-[55%]" />
      </motion.div>
    </section>
  )
}