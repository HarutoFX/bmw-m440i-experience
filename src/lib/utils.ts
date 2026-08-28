import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes safely with clsx + tailwind-merge.
 * Required for conditional/dynamic class composition without conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Linearly interpolate between two values.
 * Useful for 3D animation and scroll-based transforms.
 */
export function lerp(start: number, end: number, alpha: number): number {
  return start + (end - start) * alpha
}

/**
 * Map a value from one range to another.
 * Useful for scroll-driven animations.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
