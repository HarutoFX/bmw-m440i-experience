import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge conditional class names safely.
 *
 * Combines clsx for conditional class composition with tailwind-merge
 * to automatically resolve conflicting Tailwind utility classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Linearly interpolate between two numeric values.
 *
 * @param start - Starting value.
 * @param end - Target value.
 * @param alpha - Interpolation amount, usually between 0 and 1.
 *
 * @example
 * lerp(0, 100, 0.5) // 50
 */
export function lerp(
  start: number,
  end: number,
  alpha: number
): number {
  return start + (end - start) * alpha
}

/**
 * Clamp a numeric value between a minimum and maximum value.
 *
 * @example
 * clamp(120, 0, 100) // 100
 */
export function clamp(
  value: number,
  min: number,
  max: number
): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Map a value from one numeric range to another.
 *
 * Handles reversed ranges and prevents division-by-zero errors.
 *
 * @example
 * mapRange(50, 0, 100, 0, 1) // 0.5
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (inMin === inMax) {
    return outMin
  }

  return (
    ((value - inMin) / (inMax - inMin)) *
      (outMax - outMin) +
    outMin
  )
}

/**
 * Map a value from one range to another and clamp the result
 * within the output range.
 *
 * Particularly useful for scroll-based animations.
 */
export function mapRangeClamped(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const mappedValue = mapRange(
    value,
    inMin,
    inMax,
    outMin,
    outMax
  )

  return clamp(
    mappedValue,
    Math.min(outMin, outMax),
    Math.max(outMin, outMax)
  )
}

/**
 * Convert a normalized progress value into a percentage.
 *
 * @example
 * toPercentage(0.75) // 75
 */
export function toPercentage(value: number): number {
  return clamp(value, 0, 1) * 100
}

/**
 * Normalize a value between a minimum and maximum range.
 *
 * @example
 * normalize(50, 0, 100) // 0.5
 */
export function normalize(
  value: number,
  min: number,
  max: number
): number {
  if (min === max) {
    return 0
  }

  return (value - min) / (max - min)
}

/**
 * Smoothly scroll the page to a section by its anchor ID or href.
 *
 * Accepts either a raw id ('performance') or an href string ('#performance').
 * Passing 'overview' or '#overview' scrolls back to the very top.
 *
 * @example
 * scrollToSection('#configure')
 * scrollToSection('overview')
 */
export function scrollToSection(idOrHref: string): void {
  const id = idOrHref.replace(/^.*#/, '')

  if (id === 'overview' || id === '') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}