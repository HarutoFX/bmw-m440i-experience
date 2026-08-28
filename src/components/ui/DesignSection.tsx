'use client'

import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import Image from 'next/image'

const ease = [0.16, 1, 0.3, 1] as const

// Variants for staggered feature list
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const featureVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
}

export default function DesignSection() {
  const containerRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Cinematic parallax effect
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ['-5%', '5%']
  )

  return (
    <section
      id="design"
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#050505]"
    >
      {/* Cinematic Grain Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      {/* Ambient Red Glow */}
      <div className="pointer-events-none absolute top-1/2 right-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D71920]/10 to-transparent" />

      <motion.div
        className="relative z-10 flex min-h-screen h-full w-full flex-col items-center lg:flex-row"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{
          duration: 1,
          ease,
        }}
      >
        {/* Left Side - Cinematic Image */}
        <div className="relative order-2 mt-8 h-[60vh] w-full overflow-hidden lg:order-1 lg:mt-0 lg:h-[80vh] lg:w-[65%]">
          <motion.div
            className="relative -top-[2%] h-[105%] w-full"
            style={{ y: imageY }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 1.4,
              ease,
            }}
          >
            <Image
              src="/images/m440i_design_detail_v3.jpg"
              alt="BMW M440i Design Detail"
              fill
              quality={100}
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover object-[20%_center] lg:object-[15%_center]"
            />

            {/* Fade masks */}
            <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-[#050505] lg:block" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent lg:hidden" />

            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent lg:hidden" />
          </motion.div>
        </div>

        {/* Right Side - Typography */}
        <div className="order-1 lg:order-2 z-20 flex w-full flex-col justify-center px-8 pt-24 pb-16 md:px-16 lg:w-[35%] lg:px-12 lg:pt-0 lg:pb-0 xl:px-20">
          {/* Section Marker */}
          <div className="mb-6 flex items-center space-x-3 overflow-hidden">
            <motion.div
              className="h-px bg-[#D71920]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.8,
                ease,
              }}
            />

            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D71920]"
            >
              Exterior Design
            </motion.span>
          </div>

          {/* Headline */}
          <h2 className="mb-12 text-4xl leading-[0.9] font-bold tracking-tighter text-white uppercase md:text-5xl lg:text-5xl xl:text-6xl">
            <div className="overflow-hidden pb-1">
              <motion.div
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.8,
                  ease,
                  delay: 0.1,
                }}
              >
                Designed To
              </motion.div>
            </div>

            <div className="mt-1 overflow-hidden pb-1">
              <motion.div
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.8,
                  ease,
                  delay: 0.2,
                }}
                className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
              >
                Command Attention.
              </motion.div>
            </div>
          </h2>

          {/* Feature Callouts */}
          <motion.div
            className="mt-4 space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <Feature
              title="M Aerodynamic Package"
              delay={0.4}
            >
              Aggressive front aprons, striking air intakes, and a sculpted
              bumper engineered for optimal downforce and cooling.
            </Feature>

            <Feature
              title="Adaptive LED Headlights"
              delay={0.5}
            >
              Iconic hexagonal daytime running lights with piercing blue
              accents, offering unmatched visibility and a menacing stare.
            </Feature>

            <Feature
              title={'19" M Alloy Wheels'}
              delay={0.6}
            >
              Lightweight double-spoke bi-color rims that perfectly frame the
              massive M Sport brake calipers and emphasize the vehicle&apos;s
              athletic stance.
            </Feature>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

function Feature({
  title,
  delay,
  children,
}: {
  title: string
  delay: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      className="group flex cursor-default items-start"
      variants={featureVariants}
    >
      <div className="mr-5 mt-1 flex h-6 shrink-0 items-start">
        <motion.div
          className="h-6 w-[2px] bg-[#D71920] opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(215,25,32,0.6)]"
          initial={{ height: 0 }}
          whileInView={{ height: 24 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.6,
            delay,
          }}
        />
      </div>

      <div>
        <h3 className="mb-1 text-sm font-semibold tracking-wide text-white/80 uppercase transition-colors duration-300 group-hover:text-white">
          {title}
        </h3>

        <p className="max-w-sm text-xs leading-relaxed text-white/40">
          {children}
        </p>
      </div>
    </motion.div>
  )
}
