'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, SITE_NAME } from '@/lib/constants'

/**
 * Navbar — Fixed site navigation with glass morphism effect.
 * Transitions between transparent (at top) and frosted glass (on scroll).
 * Client component required for scroll state and animation.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    let isHydrated = false
    
    // Force scroll to top on page refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    // Use timeout to ensure it runs after any Next.js hydration scroll logic
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)

    // 2. Scroll spy logic
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          
          // Safeguard: If we are at the very top of the page (scroll < 50), 
          // only 'overview' can legitimately be the active section. 
          // Any other section intersecting means the layout has temporarily collapsed during loading.
          if (window.scrollY < 50 && id !== 'overview') {
            return
          }

          setActiveSection(id)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section hits middle of screen
      threshold: 0
    })

    // Ignore the initial batch of intersection events caused by SSR layout shifts
    setTimeout(() => {
      isHydrated = true
    }, 1000)

    // Observe all sections defined in NAV_ITEMS
    NAV_ITEMS.forEach((item) => {
      const id = item.href.replace(/^.*#/, '')
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    const id = href.replace(/^.*#/, '')
    setActiveSection(id)

    if (id === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleConfigureClick = () => {
    setIsOpen(false)
    const id = 'configure'
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div
        className={cn(
          'mx-auto max-w-7xl flex items-center justify-between',
          'rounded-2xl px-6 py-3 transition-all duration-500',
          'bg-black/40 backdrop-blur-2xl border border-white/5',
          'shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 relative">
            <img 
              src="/bmw-logo.svg" 
              alt="BMW Logo" 
              className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
            />
          </div>
          <div>
            <span className="text-white font-semibold tracking-[0.15em] text-sm uppercase">
              {SITE_NAME}
            </span>
            <span className="block text-white/40 text-[10px] tracking-widest uppercase mt-0.5">
              <span className="text-[#D71920] font-bold tracking-[0.2em]">M</span> PERFORMANCE
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1 relative">
          <LayoutGroup>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace(/^.*#/, '')
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      'px-4 py-2 text-sm rounded-lg transition-all duration-300 tracking-wide relative z-10',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]',
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-[#D71920]/20 rounded-lg z-0"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </li>
              )
            })}
          </LayoutGroup>
        </ul>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <motion.button
            onClick={handleConfigureClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'px-5 py-2 text-sm font-medium rounded-lg',
              'bg-[#D71920] text-white',
              'hover:bg-[#F02A32] transition-colors duration-200',
              'shadow-[0_0_20px_rgba(215,25,32,0.4)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 focus-visible:ring-offset-black'
            )}
          >
            Configure
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={cn(
            "md:hidden text-white/70 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] rounded-lg p-1"
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'mt-2 mx-auto max-w-7xl rounded-2xl',
              'bg-black/80 backdrop-blur-xl border border-white/10',
              'p-4 shadow-2xl'
            )}
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace(/^.*#/, '')
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cn(
                        "block px-4 py-3 rounded-lg transition-all",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]",
                        isActive ? "text-[#F02A32] bg-[#D71920]/10" : "text-white/70 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
