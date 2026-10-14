'use client'

import React, { useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** Maximum tilt angle in degrees. Default is 8 */
  maxTilt?: number
  /** Perspective distance in pixels. Default is 1000 */
  perspective?: number
  /** Outer wrapper className for layout, width, margins */
  className?: string
  /** Inner card className for extra padding or styling overrides */
  cardClassName?: string
  /** Whether to enable cursor-following glare reflection. Default is true */
  glareEnable?: boolean
  /** Maximum opacity of the glare layer. Default is 0.35 */
  glareMaxOpacity?: number
}

export default function TiltCard({
  children,
  maxTilt = 8,
  perspective = 1000,
  className,
  cardClassName,
  glareEnable = true,
  glareMaxOpacity = 0.35,
  ...rest
}: TiltCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const rafIdRef = useRef<number | null>(null)
  const isHoveredRef = useRef<boolean>(false)
  const reducedMotionRef = useRef<boolean>(false)
  const willChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Listen for prefers-reduced-motion media query
  useEffect(() => {
    if (typeof window === 'undefined') return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionRef.current = motionQuery.matches

    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches
      if (event.matches && cardRef.current) {
        cardRef.current.style.setProperty('--rot-x', '0deg')
        cardRef.current.style.setProperty('--rot-y', '0deg')
        cardRef.current.style.setProperty('--glare-opacity', '0')
        cardRef.current.style.willChange = 'auto'
      }
    }

    motionQuery.addEventListener('change', onMotionChange)
    return () => {
      motionQuery.removeEventListener('change', onMotionChange)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      if (willChangeTimeoutRef.current) {
        clearTimeout(willChangeTimeoutRef.current)
      }
    }
  }, [])

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Ignore touch pointers or reduced-motion users to preserve native scroll and accessibility
      if (e.pointerType === 'touch' || reducedMotionRef.current) return

      isHoveredRef.current = true
      const card = cardRef.current
      if (!card) return

      if (willChangeTimeoutRef.current) {
        clearTimeout(willChangeTimeoutRef.current)
        willChangeTimeoutRef.current = null
      }

      // Enable will-change only during active interaction
      card.style.willChange = 'transform'
      card.style.transition = 'transform 0.15s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.3s ease'

      if (glareEnable) {
        card.style.setProperty('--glare-opacity', String(glareMaxOpacity))
      }
    },
    [glareEnable, glareMaxOpacity]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === 'touch' || reducedMotionRef.current || !isHoveredRef.current) return

      const wrapper = wrapperRef.current
      const card = cardRef.current
      if (!wrapper || !card) return

      const clientX = e.clientX
      const clientY = e.clientY

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }

      rafIdRef.current = requestAnimationFrame(() => {
        if (!wrapper || !card || !isHoveredRef.current) return

        const rect = wrapper.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return

        // Calculate cursor offset relative to the wrapper bounds
        const x = clientX - rect.left
        const y = clientY - rect.top

        // Normalize between -1 and 1
        const normX = Math.max(-1, Math.min(1, (x / rect.width) * 2 - 1))
        const normY = Math.max(-1, Math.min(1, (y / rect.height) * 2 - 1))

        // Invert Y for intuitive 3D tilt: cursor moves up -> tilts up toward viewer
        const rotX = (-normY * maxTilt).toFixed(2)
        const rotY = (normX * maxTilt).toFixed(2)

        // Glare coordinates as percentages [0%, 100%]
        const glareX = Math.max(0, Math.min(100, (x / rect.width) * 100)).toFixed(1)
        const glareY = Math.max(0, Math.min(100, (y / rect.height) * 100)).toFixed(1)

        card.style.setProperty('--rot-x', `${rotX}deg`)
        card.style.setProperty('--rot-y', `${rotY}deg`)
        card.style.setProperty('--glare-x', `${glareX}%`)
        card.style.setProperty('--glare-y', `${glareY}%`)
      })
    },
    [maxTilt]
  )

  const handlePointerLeave = useCallback(() => {
    isHoveredRef.current = false

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }

    const card = cardRef.current
    if (!card) return

    // Smooth cushioned reset
    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease'
    card.style.setProperty('--rot-x', '0deg')
    card.style.setProperty('--rot-y', '0deg')
    card.style.setProperty('--glare-opacity', '0')

    // Clean up will-change after reset transition completes to avoid permanent layer overhead
    if (willChangeTimeoutRef.current) {
      clearTimeout(willChangeTimeoutRef.current)
    }
    willChangeTimeoutRef.current = setTimeout(() => {
      if (cardRef.current && !isHoveredRef.current) {
        cardRef.current.style.willChange = 'auto'
      }
    }, 600)
  }, [])

  return (
    <div
      ref={wrapperRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      className={cn('relative [touch-action:pan-y]', className)}
      style={{ perspective: `${perspective}px` }}
      {...rest}
    >
      <div
        ref={cardRef}
        className={cn(
          // Base Smoky Glass styling
          'relative w-full rounded-3xl overflow-hidden',
          'border border-white/[0.08]',
          'bg-gradient-to-br from-[#121217]/80 via-[#0d0d12]/85 to-[#08080c]/90',
          'backdrop-blur-md [-webkit-backdrop-filter:blur(12px)]',
          'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.14),inset_0_0_24px_0_rgba(0,0,0,0.4)]',
          'transform-gpu [transform-style:preserve-3d]',
          'motion-reduce:!transform-none motion-reduce:!transition-none',
          cardClassName
        )}
        style={
          {
            transform: 'rotateX(var(--rot-x, 0deg)) rotateY(var(--rot-y, 0deg))',
            '--rot-x': '0deg',
            '--rot-y': '0deg',
            '--glare-x': '50%',
            '--glare-y': '50%',
            '--glare-opacity': '0',
          } as React.CSSProperties
        }
      >
        {/* Soft internal top edge highlight for authentic cut-glass refraction */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        {/* Cursor-following glare layer */}
        {glareEnable && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300 ease-out"
            style={{
              opacity: 'var(--glare-opacity, 0)',
              background:
                'radial-gradient(550px circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 35%, rgba(255, 255, 255, 0.01) 60%, transparent 80%)',
            }}
          />
        )}

        {/* Content layer */}
        <div className="relative z-10 w-full [transform:translateZ(1px)]">
          {children}
        </div>
      </div>
    </div>
  )
}
