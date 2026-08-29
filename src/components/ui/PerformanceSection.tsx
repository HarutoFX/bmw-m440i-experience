'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const ease = [0.16, 1, 0.3, 1] as const

export default function PerformanceSection() {
  return (
    <section
      id="performance"
      className="
        relative flex min-h-screen w-full
        items-center overflow-hidden
        bg-[#050505]
        pt-32 pb-20
        lg:pt-0 lg:pb-0
      "
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="
            absolute top-1/2 left-[-10%]
            h-[800px] w-[800px]
            -translate-y-1/2
            rounded-full
            bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
            from-[#D71920]/10
            to-transparent
          "
        />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,0.1) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(255,255,255,0.1) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '100px 100px',
          }}
        />

        <svg
          className="absolute inset-0 h-full w-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="15%"
            cy="50%"
            r="450"
            stroke="#ffffff"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4 16"
          />

          <circle
            cx="15%"
            cy="50%"
            r="650"
            stroke="#D71920"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="2 32"
          />

          <path
            d="M -100,200 C 400,200 600,600 1200,600"
            stroke="#ffffff"
            strokeWidth="1"
            fill="none"
            strokeDasharray="10 20"
          />

          <path
            d="M -100,800 C 500,800 700,300 1400,300"
            stroke="#D71920"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5 40"
          />
        </svg>
      </div>

      <motion.div
        className="
          relative z-10
          flex w-full
          flex-col-reverse
          items-center
          lg:flex-row
        "
        initial={{
          opacity: 0,
          scale: 0.985,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.9,
          ease,
        }}
      >
        {/* Content */}
        <div
          className="
            flex w-full flex-col justify-center
            px-6 py-12
            lg:w-5/12 lg:py-0 lg:pl-16
            xl:pl-24
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
          >
            {/* Marker */}
            <div className="mb-6 flex items-center gap-3">
              <motion.div
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: 32,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  ease,
                }}
                className="h-px bg-[#D71920]"
              />

              <span className="
                text-xs font-semibold
                uppercase
                tracking-[0.3em]
                text-[#D71920]
              ">
                Performance Dynamics
              </span>
            </div>

            <h2
              className="
                mb-6
                text-4xl font-bold
                uppercase
                leading-none
                tracking-tight
                text-white
                md:text-5xl
                lg:text-6xl
              "
            >
              Engineered
              <br />

              <span className="text-white/40">
                To Move You.
              </span>
            </h2>

            <div className="mb-12 h-1 w-12 bg-[#D71920]" />
          </motion.div>

          {/* HP */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease,
            }}
            className="mb-14"
          >
            <div className="
              bg-gradient-to-br
              from-white
              to-white/40
              bg-clip-text
              text-[4rem]
              font-black
              leading-none
              tracking-tighter
              text-transparent
              sm:text-[5rem]
              md:text-[6rem]
              lg:text-[7.5rem]
            ">
              374

              <span className="
                ml-3
                text-2xl
                tracking-normal
                text-[#D71920]
                sm:text-3xl
                md:text-4xl
                lg:text-5xl
              ">
                HP
              </span>
            </div>

            <p className="
              mt-4
              text-sm font-medium
              uppercase
              tracking-[0.2em]
              text-white/50
              md:text-base
            ">
              3.0L Inline-6 TwinPower Turbo
            </p>
          </motion.div>

          {/* Stats */}
          <div className="mt-2 flex flex-wrap gap-10 md:gap-16">
            <Stat
              value="500"
              unit="Nm"
              label="Torque"
              delay={0.2}
            />

            <Stat
              value="4.5"
              unit="s"
              label="0–100 km/h"
              delay={0.3}
            />

            <Stat
              value="250"
              unit="km/h"
              label="Top Speed"
              delay={0.4}
            />
          </div>
        </div>

        {/* Image */}
        <div
          className="
            relative
            h-[45vh] w-full
            overflow-hidden
            md:h-[60vh]
            lg:h-[80vh] lg:w-7/12
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.2,
              ease,
            }}
            className="absolute inset-0"
          >
            <Image
              src="/images/m440i_performance_detail.jpg"
              alt="BMW M440i Performance Detail"
              fill
              quality={100}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="
                object-cover
                object-[65%_center]
                lg:object-right
              "
            />

            <div className="
              absolute inset-0
              bg-gradient-to-r
              from-[#050505]
              via-[#050505]/40
              to-transparent
            " />

            <div className="
              absolute inset-0
              bg-gradient-to-t
              from-[#050505]
              via-transparent
              to-[#050505]
            " />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

function Stat({
  value,
  unit,
  label,
  delay,
}: {
  value: string
  unit: string
  label: string
  delay: number
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
        delay,
      }}
    >
      <div className="mb-1 text-3xl font-bold text-white md:text-4xl">
        {value}{' '}

        <span className="text-lg font-normal text-white/40">
          {unit}
        </span>
      </div>

      <div className="
        text-[10px]
        font-medium
        uppercase
        tracking-[0.2em]
        text-white/50
        md:text-xs
      ">
        {label}
      </div>
    </motion.div>
  )
}