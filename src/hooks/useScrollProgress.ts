'use client'

import { useEffect, useState } from 'react'

/**
 * Tracks the current vertical scroll position and overall page scroll progress.
 *
 * scrollY:
 *   Current vertical scroll position in pixels.
 *
 * scrollProgress:
 *   Normalized page scroll progress from 0 to 1.
 */
export function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScrollProgress = () => {
      const y = window.scrollY

      const documentHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const maxScroll = Math.max(documentHeight - viewportHeight, 0)

      setScrollY(y)
      setScrollProgress(maxScroll > 0 ? y / maxScroll : 0)

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress)
        ticking = true
      }
    }

    // Set the correct value immediately on mount
    updateScrollProgress()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return {
    scrollY,
    scrollProgress,
  }
}