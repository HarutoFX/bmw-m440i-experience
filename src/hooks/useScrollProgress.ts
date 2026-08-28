'use client'

import { useState, useEffect } from 'react'

/**
 * Tracks the current scroll Y position and derived values.
 * Useful for scroll-driven animations and parallax effects.
 */
export function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollY(y)
      setScrollProgress(maxScroll > 0 ? y / maxScroll : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY, scrollProgress }
}
