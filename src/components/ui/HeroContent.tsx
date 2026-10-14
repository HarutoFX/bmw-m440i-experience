'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { EASE_CURVE } from '@/lib/constants'
import SplitText from './SplitText'

// ─── Animation variants ───────────────────────────────────────────────────────
// Defined at module scope so they are never re-created on re-render.

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.35,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE_CURVE,
    },
  },
}

// ─── Scroll helper ────────────────────────────────────────────────────────────
// No closure dependencies — safe to hoist to module scope.

function scrollToPerformance() {
  document.getElementById('performance')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        relative z-10
        flex h-full max-w-4xl lg:max-w-5xl flex-col
        items-start justify-end
        px-6 pb-32
        md:px-16 md:pb-24
        lg:px-24
      "
    >
      {/* Model Badge */}
      <motion.div variants={itemVariants}>
        <span
          className={cn(
            'mb-6 inline-flex items-center gap-2',
            'rounded-full px-4 py-1.5',
            'border border-[#0ea5e9]/30',
            'bg-[#0ea5e9]/20',
            'text-xs font-medium tracking-[0.2em]',
            'uppercase text-[#38bdf8]'
          )}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0ea5e9]" />

          2024 M440i xDrive Gran Coupé
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={{
          hidden: { opacity: 1 },
          visible: { opacity: 1 },
        }}
        className="
          mb-6
          font-normal
          tracking-normal
          leading-[1.12]
          text-[clamp(2.75rem,6vw,5.25rem)]
          text-[#FF263D]
          select-none
        "
        style={{
          fontFamily: 'var(--font-pacifico), cursive, sans-serif',
          color: '#FF263D',
          letterSpacing: 'normal',
        }}
        aria-label="The Art of Performance"
      >
        {/* Segment 1: The Art (BMW Red #FF263D) */}
        <span
          className="block whitespace-nowrap text-[#FF263D]"
          style={{ color: '#FF263D' }}
        >
          <SplitText
            text="The Art"
            baseDelay={0.2}
            charDelay={0.08}
          />
        </span>

        {/* Responsive Line Container for 'of' and 'Performance' */}
        <span className="block text-[#FF263D]" style={{ color: '#FF263D' }}>
          {/* Segment 2: 'of' (BMW Red #FF263D) */}
          <span
            className="inline-block text-[#FF263D] mr-3 sm:mr-4 md:mr-0 md:block whitespace-nowrap"
            style={{ color: '#FF263D' }}
          >
            <SplitText
              text="of"
              isAccent
              baseDelay={0.9}
              charDelay={0.09}
            />
          </span>

          {/* Segment 3: 'Performance' (BMW Red #FF263D) */}
          <span
            className="inline-block md:block whitespace-nowrap text-[#FF263D]"
            style={{ color: '#FF263D' }}
          >
            <SplitText
              text="Performance"
              baseDelay={1.3}
              charDelay={0.075}
            />
          </span>
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="
          mb-10
          max-w-md
          text-base
          leading-relaxed
          text-white/50
          md:text-lg
        "
      >
        Experience the perfect fusion of M Sport DNA and four-door elegance —
        powered by a 374 hp inline-6 TwinPower Turbo engine.
      </motion.p>

      {/* CTA */}
      <motion.div
        variants={itemVariants}
        className="relative z-50 flex flex-col gap-4 sm:flex-row"
      >
        <motion.button
          type="button"
          onClick={scrollToPerformance}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 0 30px rgba(14,165,233,0.5)',
          }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            'inline-flex items-center justify-center',
            'w-full cursor-pointer',
            'rounded-xl px-8 py-3.5',
            'bg-[#0ea5e9]',
            'text-sm font-semibold tracking-wide text-white',
            'shadow-[0_0_20px_rgba(14,165,233,0.35)]',
            'transition-all duration-300',
            'hover:bg-[#38bdf8]',
            'focus-visible:outline-none',
            'focus-visible:ring-2',
            'focus-visible:ring-[#0ea5e9]',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-offset-black',
            'sm:w-auto'
          )}
        >
          Explore the Model
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        variants={itemVariants}
        className="mt-12 flex items-center gap-3 text-white/30"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            h-8 w-px
            bg-gradient-to-b
            from-white/0
            via-white/40
            to-white/0
          "
        />

        <span className="text-xs uppercase tracking-[0.25em]">
          Scroll to Discover
        </span>
      </motion.div>
    </motion.div>
  )
}