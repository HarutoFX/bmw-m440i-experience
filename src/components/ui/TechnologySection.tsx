'use client'

import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const ease = [0.16, 1, 0.3, 1] as const

const features = [
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

export default function TechnologySection() {
  const { scrollProgress } = useScrollProgress()

  const imageParallax = Math.max(
    -5,
    Math.min(5, (scrollProgress - 0.5) * 10)
  )

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
    hidden: {
      opacity: 0,
      y: 24,
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

  return (
    <section
      id="technology"
      className="relative min-h-screen w-full overflow-hidden border-t border-white/5 bg-[#050505]"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 h-[800px] w-[800px] -translate-x-1/4 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(215,25,32,0.12) 0%, rgba(215,25,32,0.04) 35%, transparent 70%)',
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

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col lg:flex-row">
        {/* Content */}
        <div className="flex w-full items-center px-6 py-24 sm:px-10 md:px-16 lg:w-1/2 lg:px-20 xl:px-28">
          <motion.div
            className="max-w-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {/* Section marker */}
            <motion.div
              variants={featureVariants}
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[#D71920]" />

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D71920]">
                Digital Innovation
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={featureVariants}>
              <h2 className="mb-10 text-5xl font-bold uppercase leading-[0.95] tracking-tighter text-white sm:text-6xl lg:text-6xl xl:text-7xl">
                Intuitive.
                <br />

                <span className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                  Immersive.
                </span>
              </h2>
            </motion.div>

            {/* Features */}
            <motion.div
              className="space-y-8 lg:space-y-10"
              variants={containerVariants}
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={featureVariants}
                  className="group flex gap-5"
                >
                  <div className="relative mt-1 flex h-7 w-[2px] shrink-0 overflow-hidden">
                    <span className="h-full w-full bg-[#D71920] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_10px_rgba(215,25,32,0.8)]" />
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/85 transition-colors duration-300 group-hover:text-white">
                      {feature.title}
                    </h3>

                    <p className="max-w-md text-sm leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/60">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Image */}
        <div className="relative h-[55vh] w-full overflow-hidden lg:h-auto lg:min-h-screen lg:w-1/2">
          <motion.div
            className="absolute -inset-[5%]"
            style={{
              y: `${imageParallax}%`,
            }}
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.4,
              ease,
            }}
          >
            <Image
              src="/images/bmw_interior.png"
              alt="BMW M440i interior with curved display"
              fill
              quality={100}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center lg:object-[45%_center]"
            />

            {/* Desktop fade */}
            <div className="absolute inset-0 hidden bg-gradient-to-r from-[#050505] via-[#050505]/25 to-transparent lg:block" />

            {/* Mobile fades */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent lg:hidden" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}