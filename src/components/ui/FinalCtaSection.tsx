'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import Image from 'next/image'
import { NAV_ITEMS } from '@/lib/constants'

const ease = [0.16, 1, 0.3, 1] as const

const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease }
  }
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4
    }
  }
}

export default function FinalCtaSection() {
  const containerRef = useRef<HTMLElement | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Subtle scale and parallax for the cinematic background
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  const scrollToSection = (id: string) => {
    const elId = id.replace('#', '')
    
    if (elId === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    const element = document.getElementById(elId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      if (elId === 'configure') {
        window.dispatchEvent(new CustomEvent('highlight-configure'))
      }
    }
  }

  return (
    <section id="cta" ref={containerRef} className="relative flex min-h-screen w-full flex-col bg-[#050505]">
      {/* Cinematic CTA Area */}
      <div className="relative flex flex-grow w-full items-center justify-center overflow-hidden">
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 z-0 h-[120%] w-full origin-bottom"
          style={{ scale: imageScale, y: imageY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.5, ease }}
        >
          <Image
            src="/images/m440i_cta_bg.jpg"
            alt="BMW M440i Cinematic Final View"
            fill
            quality={100}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Gradient Overlays */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#050505] via-transparent to-transparent opacity-80" />
        
        {/* Ambient Red Glow at the bottom */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[400px] w-[800px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#D71920]/10 blur-[100px]" />

        {/* Content */}
        <motion.div 
          className="relative z-20 flex flex-col items-center justify-center px-4 text-center mt-20 pb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Eyebrow */}
          <motion.div variants={textVariants} className="mb-6 flex flex-col items-center">
            <div className="mb-4 h-12 w-[1px] bg-gradient-to-b from-transparent to-[#D71920]" />
            <span className="text-xs font-semibold tracking-[0.3em] text-[#D71920] uppercase">
              The Conclusion
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2 variants={textVariants} className="mb-6 max-w-4xl text-4xl sm:text-5xl font-bold tracking-tighter text-white uppercase md:text-6xl lg:text-7xl">
            The Ultimate <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Driving Experience.</span>
          </motion.h2>

          {/* Supporting Text */}
          <motion.p variants={textVariants} className="mb-12 max-w-2xl text-sm font-medium tracking-wide text-neutral-300 uppercase md:text-base">
            Precision engineered. Digitally connected. Unmistakably M.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={textVariants} className="flex flex-col w-full sm:w-auto items-stretch sm:items-center gap-4 sm:flex-row sm:gap-6 z-50">
            <motion.button
              type="button"
              onClick={() => scrollToSection('#configure')}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(215,25,32,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden flex justify-center w-full sm:w-auto rounded-xl bg-[#D71920] px-8 py-3.5 text-sm font-semibold tracking-wider text-white transition-all duration-300 hover:bg-[#F02A32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              {/* Subtle animated light sweep */}
              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[150%]" />
              <span className="relative z-10 flex items-center gap-2">
                BUILD YOUR M440i
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => scrollToSection('#overview')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden flex justify-center w-full sm:w-auto rounded-xl border border-white/20 bg-black/40 px-8 py-3.5 text-sm font-semibold tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              <span className="relative z-10 flex items-center gap-2">
                RETURN TO THE DRIVE
                <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-30 w-full border-t border-white/10 bg-[#050505] px-8 py-12 md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          
          {/* Logo / Branding */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold tracking-widest text-white">BMW M440i</h3>
            <p className="mt-2 text-xs tracking-widest text-neutral-500 uppercase">Experience</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-xs font-semibold tracking-widest text-neutral-400 uppercase transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] rounded-sm"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/5 pt-8 text-center md:flex md:items-center md:justify-between md:text-left">
          <p className="text-[10px] tracking-widest text-neutral-600 uppercase">
            &copy; {new Date().getFullYear()} BMW M440i Virtual Experience. Built for demonstration purposes.
          </p>
          <p className="mt-4 text-[10px] tracking-widest text-neutral-600 uppercase md:mt-0">
            Unmistakably M.
          </p>
        </div>
      </footer>
    </section>
  )
}
