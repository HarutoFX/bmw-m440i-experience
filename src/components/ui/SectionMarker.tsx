'use client'

import { motion } from 'framer-motion'
import { EASE_CURVE } from '@/lib/constants'

/**
 * Animated section marker with a growing red horizontal rule
 * and an uppercase label — used consistently across all sections.
 */
export default function SectionMarker({
  label,
}: {
  label: string
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE_CURVE }}
        className="h-px bg-[#0ea5e9]"
      />

      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0ea5e9]">
        {label}
      </span>
    </div>
  )
}
