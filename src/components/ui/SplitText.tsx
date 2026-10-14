'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface SplitTextProps {
  /** The text string to display and animate */
  text: string
  /** Additional CSS class names */
  className?: string
  /** Whether the text represents the BMW red accent ('of') */
  isAccent?: boolean
  /** Base delay in seconds before this word's entrance begins */
  baseDelay?: number
  /** Stagger delay in seconds between consecutive letters during entrance */
  charDelay?: number
  /** Stagger delay in milliseconds for neighboring letters during hover */
  staggerDelay?: number
  /** Whether to animate entrance */
  animateEntrance?: boolean
}

// Apple-inspired signature cubic bezier: fluid acceleration with a crisp, luxurious deceleration
const APPLE_EASE = [0.16, 1, 0.3, 1] as const

export default function SplitText({
  text,
  className,
  isAccent = false,
  baseDelay = 0,
  charDelay = 0.08,
  staggerDelay = 35,
  animateEntrance = true,
}: SplitTextProps) {
  // Map of letter index to hover displacement intensity (0 to 1)
  const [displacements, setDisplacements] = useState<Record<number, number>>({})
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const shouldReduceMotion = useReducedMotion()

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer))
    timersRef.current = []
  }, [])

  useEffect(() => {
    return () => {
      clearAllTimers()
    }
  }, [clearAllTimers])

  const handleLetterHover = useCallback(
    (hoveredIdx: number) => {
      if (shouldReduceMotion) return

      clearAllTimers()

      // 1. Hovered letter takes immediate displacement
      setDisplacements((prev) => ({
        ...prev,
        [hoveredIdx]: 1.0,
      }))

      // 2. Immediate neighbors (distance 1) animate with slight stagger
      const timer1 = setTimeout(() => {
        setDisplacements((prev) => {
          const next = { ...prev, [hoveredIdx]: 1.0 }
          if (hoveredIdx - 1 >= 0) next[hoveredIdx - 1] = 0.55
          if (hoveredIdx + 1 < text.length) next[hoveredIdx + 1] = 0.55
          return next
        })
      }, staggerDelay)
      timersRef.current.push(timer1)

      // 3. Second-order neighbors (distance 2) animate with second stagger
      const timer2 = setTimeout(() => {
        setDisplacements((prev) => {
          const next = { ...prev }
          if (hoveredIdx - 2 >= 0) next[hoveredIdx - 2] = 0.2
          if (hoveredIdx + 2 < text.length) next[hoveredIdx + 2] = 0.2
          return next
        })
      }, staggerDelay * 2)
      timersRef.current.push(timer2)
    },
    [clearAllTimers, shouldReduceMotion, staggerDelay, text.length]
  )

  const handleMouseLeave = useCallback(() => {
    clearAllTimers()
    const timer = setTimeout(() => {
      setDisplacements({})
    }, 60)
    timersRef.current.push(timer)
  }, [clearAllTimers])

  const handleFocus = useCallback(() => {
    if (shouldReduceMotion) return
    const center = Math.floor(text.length / 2)
    handleLetterHover(center)
  }, [handleLetterHover, shouldReduceMotion, text.length])

  const handleBlur = useCallback(() => {
    handleMouseLeave()
  }, [handleMouseLeave])

  const chars = text.split('')

  return (
    <span
      role="text"
      aria-label={text}
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPointerLeave={handleMouseLeave}
      style={{ color: 'inherit' }}
      className={cn(
        'relative inline-block whitespace-nowrap outline-none focus-visible:ring-1 focus-visible:ring-[#FF263D]/50 focus-visible:rounded-sm',
        className
      )}
    >
      {/* Screen reader text for clean, accessible reading */}
      <span className="sr-only">{text}</span>

      {chars.map((char, index) => {
        if (char === ' ') {
          return (
            <span
              key={index}
              className="inline-block whitespace-pre select-none"
              aria-hidden="true"
            >
              {' '}
            </span>
          )
        }

        const disp = displacements[index] ?? 0

        // Staggered entrance: purely vertical Y and opacity, zero horizontal X distortion
        const letterDelay = baseDelay + index * charDelay
        const letterDuration = isAccent ? 0.95 : 0.88 + (index % 3) * 0.04

        const entranceInitial =
          shouldReduceMotion || !animateEntrance
            ? { opacity: 1, y: 0 }
            : {
                opacity: 0,
                y: isAccent ? 32 : 28,
              }

        const entranceAnimate = {
          opacity: 1,
          y: 0,
        }

        const entranceTransition =
          shouldReduceMotion || !animateEntrance
            ? { duration: 0 }
            : {
                delay: letterDelay,
                duration: letterDuration,
                ease: APPLE_EASE,
              }

        // Hover lift: purely vertical translateY, returns to 0 on leave
        const hoverY = disp > 0 ? -(disp * 7) : 0

        return (
          <motion.span
            key={index}
            initial={entranceInitial}
            animate={entranceAnimate}
            transition={entranceTransition}
            aria-hidden="true"
            className="inline-block select-none cursor-pointer overflow-visible will-change-transform"
            style={{
              color: 'inherit',
              transform: hoverY !== 0 ? `translateY(${hoverY.toFixed(1)}px)` : undefined,
              transition: 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onPointerEnter={() => handleLetterHover(index)}
          >
            {char}
          </motion.span>
        )
      })}
    </span>
  )
}
