'use client'

import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import Image from 'next/image'

const ease = [0.16, 1, 0.3, 1] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.25,
    },
  },
}

const featureVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
}

export default function DesignSection() {
  const containerRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ['-4%', '4%']
  )

  return (
    <section
      id="design"
      ref={containerRef}
      className="
        relative flex min-h-screen w-full
        items-center overflow-hidden
        bg-[#050505]
      "
    >
      {/* Grain */}
      <div
        className="
          pointer-events-none
          absolute inset-0 z-0
          opacity-[0.03]
        "
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      {/* Ambient glow */}
      <div className="
        pointer-events-none
        absolute top-1/2 right-0
        h-[800px] w-[800px]
        -translate-y-1/2 translate-x-1/4
        rounded-full
        bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]
        from-[#D71920]/10
        to-transparent
      " />

      <motion.div
        className="
          relative z-10
          flex min-h-screen w-full
          flex-col items-center
          lg:flex-row
        "
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        {/* Image */}
        <div
          className="
            relative order-2
            mt-8
            h-[60vh] w-full
            overflow-hidden
            lg:order-1
            lg:mt-0
            lg:h-[80vh]
            lg:w-[65%]
          "
        >
          <motion.div
            className="
              relative
              -top-[2%]
              h-[105%] w-full
            "
            style={{
              y: imageY,
            }}
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1.2,
              ease,
            }}
          >
            <Image
              src="/images/m440i_design_detail_v3.jpg"
              alt="BMW M440i Design Detail"
              fill
              quality={100}
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="
                object-cover
                object-[20%_center]
                lg:object-[15%_center]
              "
            />

            <div className="
              absolute inset-0 hidden
              bg-gradient-to-r
              from-transparent
              via-transparent
              to-[#050505]
              lg:block
            " />

            <div className="
              absolute inset-0
              bg-gradient-to-t
              from-[#050505]
              via-transparent
              to-transparent
              lg:hidden
            " />
          </motion.div>
        </div>

        {/* Content */}
        <div
          className="
            order-1 z-20
            flex w-full flex-col justify-center
            px-8 pt-24 pb-16
            md:px-16
            lg:order-2 lg:w-[35%]
            lg:px-12 lg:py-0
            xl:px-20
          "
        >
          <SectionMarker label="Exterior Design" />

          <h2
            className="
              mb-12
              text-4xl font-bold
              uppercase
              leading-[0.9]
              tracking-tighter
              text-white
              md:text-5xl
              xl:text-6xl
            "
          >
            <RevealText delay={0.05}>
              Designed To
            </RevealText>

            <RevealText
              delay={0.15}
              gradient
            >
              Command Attention.
            </RevealText>
          </h2>

          <motion.div
            className="mt-4 space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            <Feature
              title="M Aerodynamic Package"
              index={0}
            >
              Aggressive front aprons, striking air intakes, and a sculpted
              bumper engineered for optimal airflow and cooling.
            </Feature>

            <Feature
              title="Adaptive LED Headlights"
              index={1}
            >
              Iconic daytime running lights and precision illumination
              designed to deliver exceptional visibility and presence.
            </Feature>

            <Feature
              title={'19" M Alloy Wheels'}
              index={2}
            >
              Lightweight double-spoke wheels that frame the M Sport brake
              calipers and reinforce the vehicle&apos;s athletic stance.
            </Feature>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

function SectionMarker({
  label,
}: {
  label: string
}) {
  return (
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
        {label}
      </span>
    </div>
  )
}

function RevealText({
  children,
  delay,
  gradient = false,
}: {
  children: React.ReactNode
  delay: number
  gradient?: boolean
}) {
  return (
    <div className="mt-1 overflow-hidden pb-1">
      <motion.div
        initial={{
          y: '100%',
        }}
        whileInView={{
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
          delay,
          ease,
        }}
        className={
          gradient
            ? 'bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent'
            : ''
        }
      >
        {children}
      </motion.div>
    </div>
  )
}

function Feature({
  title,
  index,
  children,
}: {
  title: string
  index: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      className="
        group flex cursor-default
        items-start
      "
      variants={featureVariants}
    >
      <div className="mr-5 mt-1 flex h-6 shrink-0 items-start">
        <motion.div
          className="
            h-6 w-[2px]
            bg-[#D71920]
            opacity-60
            transition-all duration-300
            group-hover:opacity-100
            group-hover:shadow-[0_0_8px_rgba(215,25,32,0.6)]
          "
          initial={{
            height: 0,
          }}
          whileInView={{
            height: 24,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
        />
      </div>

      <div>
        <h3 className="
          mb-1
          text-sm font-semibold
          uppercase
          tracking-wide
          text-white/80
          transition-colors duration-300
          group-hover:text-white
        ">
          {title}
        </h3>

        <p className="
          max-w-sm
          text-xs
          leading-relaxed
          text-white/40
        ">
          {children}
        </p>
      </div>
    </motion.div>
  )
}