'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import Image from 'next/image'
import { NAV_ITEMS, EASE_CURVE } from '@/lib/constants'
import { scrollToSection } from '@/lib/utils'

// ─── Animation variants ───────────────────────────────────────────────────────
// Hoisted to module scope — no closure dependencies.

const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_CURVE },
  },
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.25,
    },
  },
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function FinalCtaSection() {
  const containerRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section
      id="cta"
      ref={containerRef}
      className="
        relative flex min-h-screen w-full
        flex-col
        bg-transparent
        pointer-events-none
      "
    >
      {/* CTA */}
      <div className="
        relative flex
        min-h-screen flex-grow
        w-full items-center justify-center
        overflow-hidden
        pointer-events-auto
      ">
        {/* Content */}
        <motion.div
          className="
            relative z-20
            mt-20
            flex flex-col
            items-center justify-center
            px-4 pb-20
            text-center
          "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Eyebrow */}
          <motion.div
            variants={textVariants}
            className="mb-8 flex flex-col items-center"
          >
            <div className="
              mb-6 h-16 w-[1px]
              bg-gradient-to-b
              from-transparent
              to-white/40
            " />

            <span className="
              text-[9px] font-medium
              uppercase
              tracking-[0.4em]
              text-white/60
            ">
              The Conclusion
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={textVariants}
            className="
              mb-8 max-w-4xl
              text-4xl font-extralight
              uppercase
              tracking-widest
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            The Ultimate
            <br className="md:hidden" />

            <span className="
              bg-gradient-to-r
              from-white
              to-white/40
              bg-clip-text
              text-transparent
              font-thin
            ">
              {' '}Driving Experience.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={textVariants}
            className="
              mb-16 max-w-2xl
              text-[10px] font-thin
              uppercase
              tracking-[0.3em]
              text-white/50
              md:text-xs
            "
          >
            Precision engineered. Digitally connected. Unmistakably M.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={textVariants}
            className="
              z-50 flex w-full
              flex-col items-stretch
              gap-4
              sm:w-auto sm:flex-row
              sm:items-center
              sm:gap-6
            "
          >
            <motion.button
              type="button"
              onClick={() => scrollToSection('#configure')}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.97 }}
              className="
                group relative
                flex w-full
                justify-center
                overflow-hidden
                rounded-full
                bg-white
                px-10 py-5
                text-[10px] font-medium
                uppercase tracking-[0.3em] text-black
                transition-all duration-500
                hover:bg-white/90
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#050505]
                sm:w-auto
              "
            >
              <span className="relative z-10 flex items-center gap-4">
                BUILD YOUR M440i

                <span className="text-base transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => scrollToSection('#overview')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="
                group relative
                flex w-full
                justify-center
                overflow-hidden
                rounded-full
                border border-white/20
                bg-white/[0.03]
                px-10 py-5
                text-[10px] font-medium
                uppercase tracking-[0.3em] text-white
                transition-all duration-500
                hover:border-white/40
                hover:bg-white/10
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white/50
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#050505]
                sm:w-auto
              "
            >
              <span className="relative z-10 flex items-center gap-3">
                RETURN TO THE DRIVE

                <span className="text-base transition-transform duration-500 group-hover:-translate-y-1">
                  ↑
                </span>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="
        relative z-30 w-full
        border-t border-white/10
        bg-[#050505]
        px-8 py-12
        md:px-16
        pointer-events-auto
      ">
        <div className="
          mx-auto flex
          max-w-7xl
          flex-col items-center
          justify-between gap-8
          md:flex-row md:items-start
        ">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-extralight tracking-widest text-white">
              BMW M440i
            </h3>

            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
              Experience
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="
                  rounded-full px-4 py-2
                  text-[10px] font-light
                  uppercase
                  tracking-[0.2em]
                  text-white/40
                  transition-colors
                  hover:text-white
                  hover:bg-white/5
                  focus-visible:outline-none
                  focus-visible:ring-1
                  focus-visible:ring-white/20
                "
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="
          mx-auto mt-12
          max-w-7xl
          border-t border-white/5
          pt-8
          text-center
          md:flex md:items-center
          md:justify-between
          md:text-left
        ">
          <p className="text-[10px] uppercase tracking-widest text-neutral-600">
            © {new Date().getFullYear()} BMW M440i Virtual
            Experience. Built for demonstration purposes.
          </p>

          <p className="mt-4 text-[10px] uppercase tracking-widest text-neutral-600 md:mt-0">
            Unmistakably M.
          </p>
        </div>
      </footer>
    </section>
  )
}