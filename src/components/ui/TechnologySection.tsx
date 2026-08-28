'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import Image from 'next/image'

const ease = [0.16, 1, 0.3, 1] as const

export default function TechnologySection() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Cinematic parallax effect for the image
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

  // Variants for staggered feature list
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const featureVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } }
  }

  return (
    <section 
      id="technology"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex items-center pt-32 pb-20 lg:pt-0 lg:pb-0 border-t border-white/5"
    >
      {/* Cinematic Grain Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Ambient Red Glow - Using radial gradient instead of CSS blur to prevent compositing issues */}
      <div 
        className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D71920]/10 to-transparent rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/4"
      />

      <motion.div 
        className="w-full relative z-10 flex flex-col lg:flex-row items-center h-full min-h-screen"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        
        {/* Right Side - Cinematic Image (50% width) */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] relative order-2 lg:order-2 mt-8 lg:mt-0 overflow-hidden">
          <motion.div 
            className="w-full h-[105%] relative -top-[2%]"
            style={{ y: imageY }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image 
              src="/images/bmw_interior.png"
              alt="BMW Curved Display Interior"
              fill
              quality={100}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_center] lg:object-[45%_center]"
            />
            {/* Fade masks for seamless blending into the #050505 background */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#050505]/20 to-[#050505] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent lg:hidden" />
          </motion.div>
        </div>

        {/* Left Side - Typography and Content (50% width) - Moved to left */}
        <div className="w-full lg:w-1/2 px-8 md:px-16 lg:px-20 z-20 flex flex-col justify-center order-1 lg:order-1 pt-16 pb-16 lg:pt-0 lg:pb-0">
          
          {/* Section Marker */}
          <div className="flex items-center space-x-3 mb-6 overflow-hidden">
            <motion.div 
              className="h-[1px] bg-[#D71920]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs uppercase tracking-[0.3em] text-[#D71920] font-semibold"
            >
              Digital Innovation
            </motion.span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white uppercase tracking-tighter leading-[1] mb-12">
            <div className="overflow-hidden pb-1">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                Intuitive.
              </motion.div>
            </div>
            <div className="overflow-hidden pb-1 mt-1">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60"
              >
                Immersive.
              </motion.div>
            </div>
          </h2>

          {/* Tech Feature Callouts */}
          <motion.div 
            className="space-y-6 lg:space-y-10 mt-4 max-w-md"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            
            {/* Feature 1 */}
            <motion.div className="flex items-start group cursor-default" variants={featureVariants}>
              <div className="mr-5 mt-1 shrink-0 flex items-start h-6">
                <motion.div 
                  className="w-[2px] bg-[#D71920] opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(215,25,32,0.6)] transition-all duration-300"
                  initial={{ height: 0 }}
                  whileInView={{ height: 24 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
              </div>
              <div>
                <h3 className="text-white/80 group-hover:text-white transition-colors duration-300 font-semibold tracking-wide uppercase text-sm mb-1">
                  BMW Curved Display
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  A seamless combination of a 12.3" instrument cluster and 14.9" central information display, angled precisely towards the driver for ultimate ergonomic control.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div className="flex items-start group cursor-default" variants={featureVariants}>
              <div className="mr-5 mt-1 shrink-0 flex items-start h-6">
                <motion.div 
                  className="w-[2px] bg-[#D71920] opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(215,25,32,0.6)] transition-all duration-300"
                  initial={{ height: 0 }}
                  whileInView={{ height: 24 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
              </div>
              <div>
                <h3 className="text-white/80 group-hover:text-white transition-colors duration-300 font-semibold tracking-wide uppercase text-sm mb-1">
                  Operating System 8
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  Experience the next generation of iDrive, featuring advanced voice recognition, cloud-based navigation, and seamless 5G connectivity for all your smart devices.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div className="flex items-start group cursor-default" variants={featureVariants}>
              <div className="mr-5 mt-1 shrink-0 flex items-start h-6">
                <motion.div 
                  className="w-[2px] bg-[#D71920] opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(215,25,32,0.6)] transition-all duration-300"
                  initial={{ height: 0 }}
                  whileInView={{ height: 24 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
              </div>
              <div>
                <h3 className="text-white/80 group-hover:text-white transition-colors duration-300 font-semibold tracking-wide uppercase text-sm mb-1">
                  BMW Intelligent Personal Assistant
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  Control navigation, climate, and entertainment through natural voice interaction designed to keep your focus on the road.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
