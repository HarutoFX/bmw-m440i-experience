'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function PerformanceSection() {
  return (
    <section 
      id="performance" 
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex items-center pt-32 pb-20 lg:pt-0 lg:pb-0"
    >
      {/* ── Subtle Background Elements ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Red Glow on the left */}
        <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D71920]/10 to-transparent rounded-full" />
        
        {/* Subtle technical grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Technical automotive arcs & airflow lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15%" cy="50%" r="450" stroke="#ffffff" strokeWidth="1" fill="none" strokeDasharray="4 16" />
          <circle cx="15%" cy="50%" r="650" stroke="#D71920" strokeWidth="1.5" fill="none" strokeDasharray="2 32" />
          <path d="M -100,200 C 400,200 600,600 1200,600" stroke="#ffffff" strokeWidth="1" fill="none" strokeDasharray="10 20" opacity="0.5" />
          <path d="M -100,800 C 500,800 700,300 1400,300" stroke="#D71920" strokeWidth="1" fill="none" strokeDasharray="5 40" opacity="0.8" />
        </svg>
      </div>

      <motion.div 
        className="w-full relative z-10 flex flex-col-reverse lg:flex-row items-center"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        
        {/* ── Left Column: Typography ── */}
        <div className="w-full lg:w-5/12 px-6 lg:pl-16 xl:pl-24 flex flex-col justify-center py-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Section Marker */}
            <div className="mb-6 flex items-center space-x-3 overflow-hidden">
              <motion.div
                className="h-px bg-[#D71920]"
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
                className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D71920]"
              >
                Performance Dynamics
              </motion.span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight uppercase leading-none mb-6">
              Engineered<br />
              <span className="text-white/40">To Move You.</span>
            </h2>
            <div className="w-12 h-1 bg-[#D71920] mb-12" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            <div className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7.5rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 leading-none tracking-tighter">
              374<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#D71920] ml-3 tracking-normal">HP</span>
            </div>
            <p className="text-white/50 text-sm md:text-base uppercase tracking-[0.2em] mt-4 font-medium">
              3.0L Inline-6 TwinPower Turbo
            </p>
          </motion.div>

          {/* Secondary Stats Grid */}
          <div className="flex flex-wrap gap-10 md:gap-16 mt-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">500 <span className="text-lg text-white/40 font-normal">Nm</span></div>
              <div className="text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] font-medium">Torque</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">4.5 <span className="text-lg text-white/40 font-normal">s</span></div>
              <div className="text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] font-medium">0–100 km/h</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">250 <span className="text-lg text-white/40 font-normal">km/h</span></div>
              <div className="text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] font-medium">Top Speed</div>
            </motion.div>
          </div>
        </div>

        {/* ── Right Column: Imagery ── */}
        <div className="w-full lg:w-7/12 relative h-[45vh] md:h-[60vh] lg:h-[80vh] overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image 
              src="/images/m440i_performance_detail.jpg"
              alt="BMW M440i Performance Detail"
              fill
              quality={100}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-[65%_center] lg:object-right"
            />
            {/* Fade masks for seamless blending into the #050505 background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          </motion.div>
        </div>

      </motion.div>
    </section>
  )
}
