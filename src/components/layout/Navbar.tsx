'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { cn } from '@/lib/utils'
import { scrollToSection } from '@/lib/utils'
import { NAV_ITEMS, SITE_NAME } from '@/lib/constants'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  // Track the original scrollRestoration value in a ref so it's stable
  // across renders and doesn't trigger extra effects.
  const prevScrollRestoration = useRef<ScrollRestoration>('auto')

  useEffect(() => {
    if ('scrollRestoration' in history) {
      prevScrollRestoration.current = history.scrollRestoration
      history.scrollRestoration = 'manual'
    }

    window.scrollTo(0, 0)

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      const activeEntry = visibleEntries[0]

      if (activeEntry?.target.id) {
        if (
          window.scrollY < 50 &&
          activeEntry.target.id !== 'overview'
        ) {
          return
        }

        setActiveSection(activeEntry.target.id)
      }
    }

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-40% 0px -50% 0px',
      threshold: [0, 0.1, 0.25, 0.5],
    })

    NAV_ITEMS.forEach((item) => {
      const id = item.href.replace(/^.*#/, '')
      const element = document.getElementById(id)

      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()

      if ('scrollRestoration' in history) {
        history.scrollRestoration = prevScrollRestoration.current
      }
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault()

    const id = href.replace(/^.*#/, '')
    setIsOpen(false)
    setActiveSection(id)
    scrollToSection(href)
  }

  const handleConfigureClick = () => {
    setIsOpen(false)
    scrollToSection('#configure')
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6 sm:py-4"
    >
      <div
        className={cn(
          'mx-auto max-w-7xl flex items-center justify-between',
          'rounded-2xl px-4 py-3 sm:px-6',
          'transition-all duration-500',
          'bg-black/40 backdrop-blur-2xl',
          'border border-white/5',
          'shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
        )}
      >
        {/* Logo — Next.js Image for proper LCP optimization */}
        <Link
          href="#overview"
          onClick={(event) => handleNavClick(event, '#overview')}
          className="flex items-center gap-3 group"
          aria-label={`${SITE_NAME} — Back to top`}
        >
          <div className="w-9 h-9 relative shrink-0">
            <Image
              src="/bmw-logo.svg"
              alt="BMW Logo"
              fill
              className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
              priority
            />
          </div>

          <div>
            <span className="text-white font-semibold tracking-[0.15em] text-sm uppercase">
              {SITE_NAME}
            </span>

            <span className="block text-white/40 text-[10px] tracking-widest uppercase mt-0.5">
              <span className="text-[#0ea5e9] font-bold tracking-[0.2em]">M</span>{' '}
              PERFORMANCE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1 relative">
          <LayoutGroup>
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace(/^.*#/, '')
              const isActive = activeSection === sectionId

              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className={cn(
                      'px-4 py-2 text-sm rounded-lg',
                      'transition-all duration-300',
                      'tracking-wide relative z-10',
                      'focus-visible:outline-none',
                      'focus-visible:ring-2',
                      'focus-visible:ring-[#0ea5e9]',
                      isActive
                        ? 'text-white'
                        : 'text-white/60 hover:text-white'
                    )}
                  >
                    {item.label}
                  </Link>

                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-[#0ea5e9]/20 rounded-lg z-0"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </li>
              )
            })}
          </LayoutGroup>
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <motion.button
            type="button"
            onClick={handleConfigureClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'px-5 py-2 text-sm font-medium rounded-lg',
              'bg-[#0ea5e9] text-white',
              'hover:bg-[#38bdf8]',
              'transition-colors duration-200',
              'shadow-[0_0_20px_rgba(14,165,233,0.4)]',
              'focus-visible:outline-none',
              'focus-visible:ring-2',
              'focus-visible:ring-[#0ea5e9]',
              'focus-visible:ring-offset-2',
              'focus-visible:ring-offset-black'
            )}
          >
            Configure
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          id="mobile-menu-toggle"
          className={cn(
            'md:hidden text-white/70 hover:text-white',
            'focus-visible:outline-none',
            'focus-visible:ring-2',
            'focus-visible:ring-[#0ea5e9]',
            'rounded-lg p-2'
          )}
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'mt-2 mx-auto max-w-7xl rounded-2xl',
              'bg-black/80 backdrop-blur-xl',
              'border border-white/10',
              'p-4 shadow-2xl'
            )}
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace(/^.*#/, '')
                const isActive = activeSection === sectionId

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(event) => handleNavClick(event, item.href)}
                      className={cn(
                        'block px-4 py-3 rounded-lg',
                        'transition-all',
                        'focus-visible:outline-none',
                        'focus-visible:ring-2',
                        'focus-visible:ring-[#0ea5e9]',
                        isActive
                          ? 'text-[#38bdf8] bg-[#0ea5e9]/10'
                          : 'text-white/70 hover:text-white'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}

              <li className="mt-2">
                <button
                  type="button"
                  onClick={handleConfigureClick}
                  className="w-full px-4 py-3 rounded-lg bg-[#0ea5e9] hover:bg-[#38bdf8] text-white font-medium transition-colors"
                >
                  Configure
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}