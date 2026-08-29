'use client'

import { useRef, useState } from 'react'
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

/* ─────────────────────────────────────────────
   Configuration Data
───────────────────────────────────────────── */

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
    hex: '#E9E9E9',
  },

  grey: {
    name: 'Brooklyn Grey',
    src: '/images/m440i_configurator_grey.jpg',
    hex: '#5E6268',
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

const wheelMap: Record<
  WheelOption,
  {
    name: string
    description: string
  }
> = {
  '19': {
    name: '19" M Alloy Wheels',
    description: 'Balanced performance and comfort',
  },

  '20': {
    name: '20" Performance Wheels',
    description: 'More aggressive stance and handling',
  },
}

const interiorMap: Record<
  InteriorOption,
  {
    name: string
    fallbackColor: string
  }
> = {
  black: {
    name: 'Black Vernasca Leather',
    fallbackColor: '#171717',
  },

  cognac: {
    name: 'Cognac Leather',
    fallbackColor: '#8A542C',
  },

  red: {
    name: 'Red / Black M Sport Interior',
    fallbackColor: '#641515',
  },
}

/*
  Optional overrides.

  When you later add specific images for wheel combinations,
  add them here.

  Example:

  'white-20': '/images/m440i_configurator_white_20.jpg'
*/

const wheelImageOverrides: Partial<
  Record<`${ColorOption}-${WheelOption}`, string>
> = {}

function getVehicleImage(
  color: ColorOption,
  wheels: WheelOption
) {
  const combination = `${color}-${wheels}` as const

  return (
    wheelImageOverrides[combination] ??
    colorMap[color].src
  )
}

/* ─────────────────────────────────────────────
   Animation Variants
───────────────────────────────────────────── */

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
    y: 24,
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

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function ConfigureSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const [selectedColor, setSelectedColor] =
    useState<ColorOption>('white')

  const [selectedWheels, setSelectedWheels] =
    useState<WheelOption>('19')

  const [selectedInterior, setSelectedInterior] =
    useState<InteriorOption>('black')

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ['-4%', '4%']
  )

  const vehicleImage = getVehicleImage(
    selectedColor,
    selectedWheels
  )

  const handleBuildRequest = () => {
    const configuration = {
      color: colorMap[selectedColor].name,
      wheels: wheelMap[selectedWheels].name,
      interior: interiorMap[selectedInterior].name,
    }

    console.log('BMW M440i Build Request:', configuration)

    alert(
      `Your BMW M440i configuration:\n\n` +
        `${configuration.color}\n` +
        `${configuration.wheels}\n` +
        `${configuration.interior}`
    )
  }

  return (
    <section
      id="configure"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#050505]"
    >
      {/* ── Background Texture ───────────────────────── */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      />

      {/* ── Ambient Lighting ─────────────────────────── */}

      <div className="pointer-events-none absolute right-0 top-1/2 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[radial-gradient(circle_at_center,_rgba(215,25,32,0.14),transparent_65%)]" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.025),transparent_70%)]" />

      {/* ── Main Layout ──────────────────────────────── */}

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">

        {/* ═══════════════════════════════════════════════
            VEHICLE PREVIEW
        ═══════════════════════════════════════════════ */}

        <div className="relative order-1 h-[45vh] w-full overflow-hidden lg:sticky lg:top-0 lg:h-screen lg:w-[60%]">

          <motion.div
            className="absolute inset-0 scale-105"
            style={{
              y: imageY,
            }}
          >
            <AnimatePresence mode="wait">

              <motion.div
                key={`${selectedColor}-${selectedWheels}`}
                initial={{
                  opacity: 0,
                  scale: 1.04,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.65,
                  ease,
                }}
                className="absolute inset-0"
              >
                <Image
                  src={vehicleImage}
                  alt={`BMW M440i in ${colorMap[selectedColor].name}`}
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              </motion.div>

            </AnimatePresence>
          </motion.div>

          {/* Image overlays */}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/10" />

          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-[#050505]/40 lg:block" />

          {/* Configuration Badge */}

          <div className="absolute bottom-6 left-6 z-10 lg:bottom-10 lg:left-10">

            <motion.div
              key={selectedColor}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-xl"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                Current Configuration
              </p>

              <p className="mt-2 text-sm font-medium text-white">
                BMW M440i Gran Coupé
              </p>

              <div className="mt-2 flex items-center gap-2">

                <span
                  className="h-3 w-3 rounded-full ring-1 ring-white/20"
                  style={{
                    backgroundColor:
                      colorMap[selectedColor].hex,
                  }}
                />

                <span className="text-xs text-white/60">
                  {colorMap[selectedColor].name}
                </span>

              </div>
            </motion.div>

          </div>

        </div>

        {/* ═══════════════════════════════════════════════
            CONFIGURATION PANEL
        ═══════════════════════════════════════════════ */}

        <div className="relative flex w-full justify-center px-6 py-16 md:px-12 lg:w-[40%] lg:px-16 lg:py-24">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="flex w-full max-w-xl flex-col gap-10"
          >

            {/* ── Header ───────────────────────────── */}

            <motion.div variants={itemVariants}>

              <div className="mb-6 flex items-center gap-4">

                <div className="h-px w-16 bg-[#D71920]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D71920]">
                  Build Your Own
                </span>

              </div>

              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                CONFIGURE<span className="text-[#D71920]">.</span>
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
                Personalize your BMW M440i with your preferred
                exterior finish, wheel design and interior.
              </p>

            </motion.div>

            {/* ── Exterior Color ───────────────────── */}

            <motion.div
              variants={itemVariants}
              className="space-y-5"
            >

              <div>

                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Exterior Finish
                </p>

                <p className="mt-2 text-sm font-medium text-white">
                  {colorMap[selectedColor].name}
                </p>

              </div>

              <div
                className="flex flex-wrap gap-4"
                role="radiogroup"
                aria-label="Exterior color"
              >

                {(Object.keys(colorMap) as ColorOption[]).map(
                  (colorKey) => {

                    const isSelected =
                      selectedColor === colorKey

                    return (
                      <button
                        key={colorKey}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={
                          colorMap[colorKey].name
                        }
                        title={
                          colorMap[colorKey].name
                        }
                        onClick={() =>
                          setSelectedColor(colorKey)
                        }
                        className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'ring-2 ring-[#D71920] ring-offset-2 ring-offset-[#050505]'
                            : 'ring-1 ring-white/10 hover:ring-white/40'
                        }`}
                      >

                        <span
                          className="h-9 w-9 rounded-full shadow-inner"
                          style={{
                            backgroundColor:
                              colorMap[colorKey].hex,
                          }}
                        />

                      </button>
                    )
                  }
                )}

              </div>

            </motion.div>

            {/* ── Wheels ───────────────────────────── */}

            <motion.div
              variants={itemVariants}
              className="space-y-4"
            >

              <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                Wheel Design
              </p>

              <div className="flex flex-col gap-3">

                {(Object.keys(wheelMap) as WheelOption[]).map(
                  (wheelKey) => {

                    const isSelected =
                      selectedWheels === wheelKey

                    return (
                      <button
                        key={wheelKey}
                        type="button"
                        onClick={() =>
                          setSelectedWheels(wheelKey)
                        }
                        className={`group flex items-center justify-between rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                          isSelected
                            ? 'border-[#D71920] bg-[#D71920]/10'
                            : 'border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
                        }`}
                      >

                        <div>

                          <p
                            className={`text-sm font-medium ${
                              isSelected
                                ? 'text-white'
                                : 'text-white/70'
                            }`}
                          >
                            {wheelMap[wheelKey].name}
                          </p>

                          <p className="mt-1 text-xs text-white/35">
                            {
                              wheelMap[wheelKey]
                                .description
                            }
                          </p>

                        </div>

                        <div
                          className={`h-3 w-3 rounded-full transition-all ${
                            isSelected
                              ? 'bg-[#D71920] shadow-[0_0_12px_rgba(215,25,32,0.8)]'
                              : 'border border-white/20'
                          }`}
                        />

                      </button>
                    )
                  }
                )}

              </div>

            </motion.div>

            {/* ── Interior ─────────────────────────── */}

            <motion.div
              variants={itemVariants}
              className="space-y-4"
            >

              <div>

                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Interior Upholstery
                </p>

                <p className="mt-2 text-sm font-medium text-white">
                  {
                    interiorMap[
                      selectedInterior
                    ].name
                  }
                </p>

              </div>

              {/* Interior Preview */}

              <AnimatePresence mode="wait">

                <motion.div
                  key={selectedInterior}
                  initial={{
                    opacity: 0,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="relative h-24 overflow-hidden rounded-xl border border-white/10"
                  style={{
                    backgroundColor:
                      interiorMap[
                        selectedInterior
                      ].fallbackColor,
                  }}
                >

                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%,rgba(0,0,0,0.35))]" />

                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />

                </motion.div>

              </AnimatePresence>

              <div className="flex flex-col gap-3">

                {(
                  Object.keys(
                    interiorMap
                  ) as InteriorOption[]
                ).map((interiorKey) => {

                  const isSelected =
                    selectedInterior === interiorKey

                  return (
                    <button
                      key={interiorKey}
                      type="button"
                      onClick={() =>
                        setSelectedInterior(
                          interiorKey
                        )
                      }
                      className={`flex items-center justify-between rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                        isSelected
                          ? 'border-[#D71920] bg-[#D71920]/10 text-white'
                          : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <span
                          className="h-5 w-5 rounded-full border border-white/10"
                          style={{
                            backgroundColor:
                              interiorMap[
                                interiorKey
                              ].fallbackColor,
                          }}
                        />

                        <span className="text-sm font-medium">
                          {
                            interiorMap[
                              interiorKey
                            ].name
                          }
                        </span>

                      </div>

                      {isSelected && (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#D71920] shadow-[0_0_10px_rgba(215,25,32,0.8)]" />
                      )}

                    </button>
                  )
                })}

              </div>

            </motion.div>

            {/* ── Build Summary ────────────────────── */}

            <motion.div
              variants={itemVariants}
              className="border-t border-white/10 pt-8"
            >

              <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                Your M440i
              </p>

              <div className="mt-4 space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-5">

                <SummaryRow
                  label="Exterior"
                  value={
                    colorMap[selectedColor].name
                  }
                />

                <SummaryRow
                  label="Wheels"
                  value={
                    wheelMap[selectedWheels].name
                  }
                />

                <SummaryRow
                  label="Interior"
                  value={
                    interiorMap[selectedInterior]
                      .name
                  }
                />

              </div>

              <button
                type="button"
                onClick={handleBuildRequest}
                className="group mt-6 flex w-full items-center justify-between rounded-full bg-[#D71920] px-8 py-4 text-sm font-semibold tracking-wider text-white transition-all duration-300 hover:bg-[#F02A32] hover:shadow-[0_0_30px_rgba(215,25,32,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >

                <span>
                  REQUEST YOUR BUILD
                </span>

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </button>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  )
}

/* ─────────────────────────────────────────────
   Summary Row
───────────────────────────────────────────── */

function SummaryRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-start justify-between gap-6">

      <span className="text-xs uppercase tracking-wider text-white/35">
        {label}
      </span>

      <span className="text-right text-sm text-white/80">
        {value}
      </span>

    </div>
  )
}