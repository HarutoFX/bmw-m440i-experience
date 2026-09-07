'use client'

import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  type Variants,
} from 'framer-motion'
import { EASE_CURVE } from '@/lib/constants'
import { useConfiguratorStore, type ColorOption, type InteriorOption, type EnvironmentOption } from '@/lib/store'

const colorMap: Record<ColorOption, { name: string; src: string; hex: string }> = {
  alpine_white: { name: 'Alpine White', src: '', hex: '#f2f2f2' },
  black_sapphire: { name: 'Black Sapphire', src: '', hex: '#050505' },
  brooklyn_grey: { name: 'Brooklyn Grey', src: '', hex: '#5E6268' },
  isle_of_man_green: { name: 'Isle of Man Green', src: '', hex: '#144633' },
  toronto_red: { name: 'Toronto Red', src: '', hex: '#A81C21' },
  marina_bay_blue: { name: 'Marina Bay Blue', src: '', hex: '#002E6E' },
  voodoo_blue: { name: 'Voodoo Blue', src: '', hex: '#005bb0' },
  thundernight: { name: 'Thundernight Metallic', src: '', hex: '#2c144a' },
}

const interiorMap: Record<InteriorOption, { name: string; fallbackColor: string }> = {
  black: { name: 'Black Vernasca Leather', fallbackColor: '#171717' },
  cognac: { name: 'Cognac Leather', fallbackColor: '#8A542C' },
  red: { name: 'Red / Black M Sport Interior', fallbackColor: '#641515' },
}

const environments: { id: EnvironmentOption; name: string }[] = [
  { id: 'studio', name: 'Studio' },
  { id: 'city', name: 'Neon City' },
  { id: 'sunset', name: 'Sunset' },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_CURVE } },
}

const NOISE_SVG = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"

export default function ConfigureSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const {
    selectedColor,
    selectedInterior,
    selectedEnvironment,
    setColor: setSelectedColor,
    setInterior: setSelectedInterior,
    setEnvironment,
    setActiveConfigStep,
  } = useConfiguratorStore()

  const [buildSuccess, setBuildSuccess] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const handleBuildRequest = () => {
    setBuildSuccess(true)
    setTimeout(() => setBuildSuccess(false), 4000)
  }

  return (
    <section
      id="configure"
      ref={sectionRef}
      className="relative min-h-[150vh] w-full overflow-hidden bg-transparent pointer-events-none"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: NOISE_SVG }}
      />

      <div className="sticky top-0 h-screen w-full flex flex-col justify-end p-8 lg:p-12 pb-12 pointer-events-none">

        {/* Main UI Overlay */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="relative z-10 flex flex-col lg:flex-row items-end justify-between w-full gap-8 pointer-events-auto"
        >
          {/* Left Side: Exterior Colors */}
          <motion.div
            variants={itemVariants}
            className="w-fit max-w-[calc(100vw-3rem)] bg-black/60 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md"
            onMouseEnter={() => setActiveConfigStep('exterior')}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#ef4444]">
                  Exterior Finish
                </p>
                <h3 className="mt-2 text-2xl font-light text-white">
                  {colorMap[selectedColor].name}
                </h3>
              </div>
              <div className="h-px flex-1 ml-8 bg-gradient-to-r from-white/20 to-transparent" />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {(Object.keys(colorMap) as ColorOption[]).map((colorKey) => {
                const isSelected = selectedColor === colorKey
                return (
                  <button
                    key={colorKey}
                    type="button"
                    onClick={() => setSelectedColor(colorKey)}
                    className="relative mx-1 my-2 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="active-color-ring"
                        className="absolute -inset-2 rounded-full border-2 border-white"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span
                      className="relative z-10 h-full w-full rounded-full border border-white/20 shadow-inner"
                      style={{ backgroundColor: colorMap[colorKey].hex }}
                    />
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Right Side: Interior & Summary */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-[400px] flex-shrink-0 flex flex-col gap-6"
          >
            <div
              className="bg-black/60 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md"
              onMouseEnter={() => setActiveConfigStep('interior')}
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#ef4444]">
                Interior Upholstery
              </p>
              <h3 className="mt-2 mb-6 text-xl font-light text-white">
                {interiorMap[selectedInterior].name}
              </h3>

              <div className="flex flex-col gap-3">
                {(Object.keys(interiorMap) as InteriorOption[]).map((interiorKey) => {
                  const isSelected = selectedInterior === interiorKey
                  return (
                    <button
                      key={interiorKey}
                      type="button"
                      onClick={() => setSelectedInterior(interiorKey)}
                      className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${isSelected
                          ? 'border-white/40 bg-white/10 text-white'
                          : 'border-white/5 text-white/50 hover:border-white/20 hover:text-white/80'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="h-5 w-5 rounded-full border border-white/20 shadow-inner"
                          style={{ backgroundColor: interiorMap[interiorKey].fallbackColor }}
                        />
                        <span className="text-sm font-light tracking-wide">
                          {interiorMap[interiorKey].name}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Environment Selection */}
            <div
              className="bg-black/60 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md"
              onMouseEnter={() => setActiveConfigStep('none')}
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0ea5e9]">
                Environment
              </p>
              <div className="mt-6 flex gap-2">
                {environments.map((env) => {
                  const isSelected = selectedEnvironment === env.id
                  return (
                    <button
                      key={env.id}
                      type="button"
                      onClick={() => setEnvironment(env.id)}
                      className={`flex-1 rounded-xl border px-3 py-3 text-center transition-all duration-300 ${isSelected
                          ? 'border-[#0ea5e9]/50 bg-[#0ea5e9]/10 text-white'
                          : 'border-white/5 text-white/40 hover:border-white/20 hover:text-white/80'
                        }`}
                    >
                      <span className="text-xs font-medium tracking-wide">
                        {env.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Request Build CTA */}
            <div
              className="bg-black/60 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md"
              onMouseEnter={() => setActiveConfigStep('none')}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                    Your Selection
                  </p>
                  <p className="mt-1 text-sm text-white">BMW M440i xDrive</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-light text-white">$61,050</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Base MSRP</p>
                </div>
              </div>

              <button
                onClick={handleBuildRequest}
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-full bg-white px-8 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-black transition-all hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Request Build
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-gray-200 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>

              <AnimatePresence>
                {buildSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center justify-center gap-3 rounded-2xl border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 p-4">
                      <span className="h-2 w-2 rounded-full bg-[#0ea5e9] animate-pulse" />
                      <p className="text-[10px] uppercase tracking-widest text-[#0ea5e9]">
                        Configuration Sent
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}