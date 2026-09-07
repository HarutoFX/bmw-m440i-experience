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

// ─── Types ────────────────────────────────────────────────────────────────────

interface TechFeature {
  title: string
  description: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const features: TechFeature[] = [
  {
    title: 'BMW Curved Display',
    description:
      'A seamless combination of a 12.3" instrument cluster and 14.9" central information display, angled precisely towards the driver for an immersive cockpit experience.',
  },
  {
    title: 'Operating System 8',
    description:
      'Experience advanced voice recognition, intelligent navigation, cloud-connected services, and seamless digital interaction throughout every journey.',
  },
  {
    title: 'BMW Intelligent Personal Assistant',
    description:
      'Control navigation, climate, communication, and entertainment through natural voice interaction designed to keep your attention focused on the road.',
  },
]

// ─── Animation variants ───────────────────────────────────────────────────────
// Hoisted to module scope — no closure dependencies.

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
}

const featureVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_CURVE },
  },
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TechnologySection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Use useScroll + useTransform for scroll-driven parallax —
  // consistent with DesignSection, ConfigureSection, and FinalCtaSection,
  // and avoids the React state update cycle on every scroll tick.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-transparent pointer-events-none"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 h-[800px] w-[800px] -translate-x-1/4 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 35%, transparent 70%)',
        }}
      />

      {/* Technical grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '90px 90px',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col pointer-events-auto lg:flex-row">
        {/* Content */}
        <div className="flex w-full items-center px-8 py-20 mx-4 sm:px-10 md:px-16 lg:w-[42%] lg:py-0 lg:px-14 lg:ml-16">
          <motion.div
            className="max-w-xl bg-black/60 border border-white/10 rounded-3xl shadow-2xl p-10 lg:p-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {/* Section marker */}
            <motion.div
              variants={featureVariants}
              className="mb-8 flex items-center gap-4"
            >
              <span className="h-px w-10 bg-white/20" />
              <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-white/60">
                Digital Innovation
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={featureVariants}>
              <h2 className="mb-12 text-4xl font-extralight uppercase leading-tight tracking-widest text-white sm:text-5xl lg:text-5xl xl:text-6xl">
                Intuitive.
                <br />
                <span className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent font-thin">
                  Immersive.
                </span>
              </h2>
            </motion.div>

            {/* Features */}
            <motion.div
              className="space-y-10 lg:space-y-12"
              variants={containerVariants}
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={featureVariants}
                  className="group flex gap-5"
                >
                  <div className="relative mt-1 flex h-6 w-[1px] shrink-0 overflow-hidden">
                    <span className="h-full w-full bg-white/30 transition-all duration-500 group-hover:bg-white/80 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.3)]" />
                  </div>

                  <div>
                    <h3 className="mb-2 text-xs font-light uppercase tracking-widest text-[#ef4444] transition-colors duration-500 group-hover:text-[#f87171]">
                      {feature.title}
                    </h3>

                    <p className="max-w-md text-[10px] font-thin uppercase tracking-[0.2em] leading-relaxed text-white/70 transition-colors duration-500 group-hover:text-white/90">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Spacer for 3D car to be visible on the right */}
        <div className="hidden lg:block lg:w-1/2 lg:min-h-screen" />
      </div>
    </section>
  )
}