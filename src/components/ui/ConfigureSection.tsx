'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import Image from 'next/image'

type ColorOption = 'white' | 'grey' | 'black' | 'blue'
type WheelOption = '19' | '20'
type InteriorOption = 'black' | 'cognac' | 'red'

const ease = [0.16, 1, 0.3, 1] as const

const colorMap: Record<
  ColorOption,
  {
    name: string
    src: string
    hex: string
  }
> = {
  white: {
    name: 'Alpine White',
    src: '/images/m440i_configurator_white.jpg',
    hex: '#EBEBEB',
  },
  grey: {
    name: 'Brooklyn Grey',
    src: '/images/m440i_configurator_grey.jpg',
    hex: '#63656A',
  },
  black: {
    name: 'Black Sapphire',
    src: '/images/m440i_configurator_black.jpg',
    hex: '#0A0A0A',
  },
  blue: {
    name: 'Portimao Blue',
    src: '/images/m440i_configurator_blue.jpg',
    hex: '#0033A0',
  },
}

const wheelMap: Record<WheelOption, string> = {
  '19': '19" M Alloy Wheels',
  '20': '20" Performance Wheels',
}

const interiorMap: Record<InteriorOption, { name: string; src: string; fallbackColor: string }> = {
  black: { name: 'Black Vernasca Leather', src: '', fallbackColor: '#1A1A1A' },
  cognac: { name: 'Cognac Leather', src: '', fallbackColor: '#8B5A2B' },
  red: { name: 'Red/Black M Sport Interior', src: '', fallbackColor: '#6B1515' },
}

const wheelImageOverrides: Record<string, string> = {
  // Add specific wheel combinations here when available
  // e.g., 'white-20': '/images/m440i_configurator_white_20.jpg',
}

const getVehicleImageSrc = (color: ColorOption, wheels: WheelOption): string => {
  const combinationKey = `${color}-${wheels}`
  return wheelImageOverrides[combinationKey] || colorMap[color].src
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,

    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      ease,
    },
  },
}

export default function ConfigureSection() {
  const containerRef = useRef<HTMLElement | null>(null)

  const [selectedColor, setSelectedColor] =
    useState<ColorOption>('white')

  const [selectedWheels, setSelectedWheels] =
    useState<WheelOption>('19')

  const [selectedInterior, setSelectedInterior] =
    useState<InteriorOption>('black')

  const [isHighlighted, setIsHighlighted] = useState(false)

  useEffect(() => {
    const handleHighlight = () => {
      setIsHighlighted(true)
      setTimeout(() => setIsHighlighted(false), 2000)
    }
    window.addEventListener('highlight-configure', handleHighlight)
    return () => window.removeEventListener('highlight-configure', handleHighlight)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Subtle cinematic parallax
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ['-5%', '5%']
  )

  return (
    <section
      id="configure"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#050505] pt-24 lg:flex-row lg:pt-0"
    >
      {/* Background Noise / Texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      />

      {/* Ambient Red Lighting */}
      <div className="pointer-events-none absolute top-1/2 right-0 z-0 h-[700px] w-[700px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D71920]/10 to-transparent" />

      {/* Left Column - Vehicle */}
      <div className="relative order-1 h-[40vh] md:h-[50vh] w-full overflow-hidden rounded-lg shadow-2xl lg:ml-8 lg:h-[80vh] lg:w-[60%] lg:rounded-l-none lg:rounded-r-2xl">
        <motion.div
          className="relative -top-[2%] h-[105%] w-full"
          style={{
            y: imageY,
          }}
          initial={{
            opacity: 0,
            scale: 1.05,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          transition={{
            duration: 1.2,
            ease,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedColor}-${selectedWheels}`}
              initial={{
                opacity: 0,
                scale: 1.01,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.6,
                ease: 'easeInOut',
              }}
              className="absolute inset-0"
            >
              <Image
                src={getVehicleImageSrc(selectedColor, selectedWheels)}
                alt={`BMW M440i in ${colorMap[selectedColor].name}`}
                fill
                quality={100}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black/40 via-transparent to-transparent lg:block" />
        </motion.div>
      </div>

      {/* Right Column - Configuration Panel */}
      <div className={`z-20 flex h-full w-full flex-col justify-center px-6 py-12 md:px-16 lg:w-[40%] lg:px-16 lg:py-0 transition-all duration-700 ${isHighlighted ? 'bg-[#D71920]/5 shadow-[inset_0_0_100px_rgba(215,25,32,0.1)] rounded-2xl lg:rounded-none' : ''}`}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: false,
            amount: 0.2,
          }}
          className="flex w-full max-w-md flex-col gap-10"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <div className="mb-6 flex items-center space-x-3 overflow-hidden">
              <div className="h-px w-32 bg-[#D71920]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D71920]">
                BUILD YOUR OWN
              </span>
            </div>

            <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              CONFIGURE.
            </h3>
          </motion.div>

          {/* Exterior Color */}
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <h4 className="text-xs tracking-widest text-neutral-400 uppercase">
              Exterior Finish
            </h4>

            <div className="flex gap-4">
              {(Object.keys(colorMap) as ColorOption[]).map(
                (colorKey) => (
                  <button
                    key={colorKey}
                    type="button"
                    onClick={() =>
                      setSelectedColor(colorKey)
                    }
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] ${
                      selectedColor === colorKey
                        ? 'ring-2 ring-[#D71920] ring-offset-2 ring-offset-[#050505]'
                        : 'ring-1 ring-white/10 hover:ring-white/30'
                    }`}
                    aria-label={
                      colorMap[colorKey].name
                    }
                    title={colorMap[colorKey].name}
                  >
                    <span
                      className="h-8 w-8 rounded-full shadow-inner"
                      style={{
                        backgroundColor:
                          colorMap[colorKey].hex,
                      }}
                    />
                  </button>
                )
              )}
            </div>

            <p className="h-5 text-sm font-medium text-neutral-300">
              {colorMap[selectedColor].name}
            </p>
          </motion.div>

          {/* Wheel Selection */}
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <h4 className="text-xs tracking-widest text-neutral-400 uppercase">
              Wheel Design
            </h4>

            <div className="flex flex-col gap-3">
              {(Object.keys(wheelMap) as WheelOption[]).map(
                (wheelKey) => (
                  <button
                    key={wheelKey}
                    type="button"
                    onClick={() =>
                      setSelectedWheels(wheelKey)
                    }
                    className={`flex items-center justify-between rounded-lg border px-5 py-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] ${
                      selectedWheels === wheelKey
                        ? 'border-[#D71920] bg-[#D71920]/10 text-white'
                        : 'border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <span className="text-sm font-medium">
                      {wheelMap[wheelKey]}
                    </span>

                    {selectedWheels === wheelKey && (
                      <span className="h-2 w-2 rounded-full bg-[#D71920]" />
                    )}
                  </button>
                )
              )}
            </div>
          </motion.div>

          {/* Interior Selection */}
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <h4 className="text-xs tracking-widest text-neutral-400 uppercase">
              Interior Upholstery
            </h4>

            {/* Interior Preview */}
            <div className="relative h-24 w-full overflow-hidden rounded-lg border border-white/10 bg-[#111]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedInterior}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  {interiorMap[selectedInterior].src ? (
                    <Image
                      src={interiorMap[selectedInterior].src}
                      alt={interiorMap[selectedInterior].name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="h-full w-full opacity-60"
                      style={{
                        backgroundColor: interiorMap[selectedInterior].fallbackColor,
                      }}
                    />
                  )}
                  {/* Subtle inner shadow overlay */}
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-3">
              {(
                Object.keys(
                  interiorMap
                ) as InteriorOption[]
              ).map((interiorKey) => (
                <button
                  key={interiorKey}
                  type="button"
                  onClick={() =>
                    setSelectedInterior(interiorKey)
                  }
                  className={`flex items-center justify-between rounded-lg border px-5 py-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] ${
                    selectedInterior === interiorKey
                      ? 'border-[#D71920] bg-[#D71920]/10 text-white'
                      : 'border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span className="text-sm font-medium">
                    {interiorMap[interiorKey].name}
                  </span>

                  {selectedInterior ===
                    interiorKey && (
                    <span className="h-2 w-2 rounded-full bg-[#D71920]" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Summary & CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-2 border-t border-white/10 pt-6"
          >
            <h4 className="mb-2 text-xs tracking-widest text-neutral-400 uppercase">
              Your M440i Summary
            </h4>

            <p className="mb-6 text-sm leading-relaxed text-neutral-300">
              {colorMap[selectedColor].name}{' '}
              exterior with{' '}
              {wheelMap[selectedWheels]} and{' '}
              {interiorMap[selectedInterior].name}.
            </p>

            <button
              type="button"
              className="group relative flex w-full items-center justify-between overflow-hidden rounded-full bg-[#D71920] px-8 py-4 text-sm font-semibold tracking-wider text-white transition-all duration-300 hover:bg-[#F02A32] hover:shadow-[0_0_20px_rgba(215,25,32,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              <span className="relative z-10">
                REQUEST YOUR BUILD
              </span>

              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
