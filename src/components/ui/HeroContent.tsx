'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SITE_NAME } from '@/lib/constants'
import Link from 'next/link'

/**
 * HeroContent — The headline text and CTA overlaid on the 3D canvas.
 * Animates in with staggered timing after the canvas loads.
 */
export default function HeroContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className="relative z-10 flex flex-col items-start justify-end h-full pb-32 px-6 md:pb-24 md:px-16 lg:px-24 max-w-3xl"
    >
      {/* Model badge */}
      <motion.div variants={itemVariants}>
        <span
          className={cn(
            'inline-flex items-center gap-2 px-4 py-1.5 mb-6',
            'rounded-full text-xs font-medium tracking-[0.2em] uppercase',
            'bg-[#D71920]/20 text-[#F02A32] border border-[#D71920]/30',
            'backdrop-blur-sm'
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D71920] animate-pulse" />
          2024 M440i xDrive Gran Coupé
        </span>
      </motion.div>

      {/* Main headline */}
      <motion.h1
        variants={itemVariants}
        className="text-[2.75rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-6"
      >
        <span className="block">The Art</span>
        <span className="block bg-gradient-to-r from-white via-white to-white/30 bg-clip-text text-transparent">
          of Performance
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-white/50 text-base md:text-lg max-w-md leading-relaxed mb-10"
      >
        Experience the perfect fusion of M Sport DNA and four-door elegance —
        powered by a 374 hp inline-6 TwinPower Turbo engine.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 relative z-50">
        <motion.a
          href="#performance"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('performance')?.scrollIntoView({ behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(215,25,32,0.5)' }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            'inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide',
            'bg-[#D71920] text-white hover:bg-[#F02A32]',
            'shadow-[0_0_20px_rgba(215,25,32,0.35)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 focus-visible:ring-offset-black',
            'transition-all duration-300 w-full sm:w-auto cursor-pointer'
          )}
        >
          Explore the Model
        </motion.a>

        {/* <motion.a
          href="#configure"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('configure')?.scrollIntoView({ behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            'inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide',
            'bg-white/5 text-white border border-white/15',
            'hover:bg-white/10 backdrop-blur-sm',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 focus-visible:ring-offset-black',
            'transition-all duration-300 w-full sm:w-auto cursor-pointer'
          )}
        >
          Build Your Own →
        </motion.a> */}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 mt-12 text-white/30"
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/0 via-white/40 to-white/0"
          />
        </div>
        <span className="text-xs tracking-[0.25em] uppercase">Scroll to Discover</span>
      </motion.div>
    </motion.div>
  )
}
