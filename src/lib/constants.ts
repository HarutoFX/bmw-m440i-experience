import type { CarSpec, CarColor, NavItem } from '@/types'

// ─── Animation ────────────────────────────────────────────────────────────────
// Shared ease curve: smooth out with a fast-out, slow-in feel.
// Import this instead of redefining [0.16, 1, 0.3, 1] in every component.

export const EASE_CURVE = [0.16, 1, 0.3, 1] as const

// ─── Navigation Items ─────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Performance', href: '#performance' },
  { label: 'Design', href: '#design' },
  { label: 'Technology', href: '#technology' },
  { label: 'Configure', href: '#configure' },
]

// ─── Car Specifications ───────────────────────────────────────────────────────

export const CAR_SPECS: CarSpec[] = [
  {
    label: '0–100 km/h',
    value: '4.5',
    unit: 's',
  },
  {
    label: 'Top Speed',
    value: '250',
    unit: 'km/h',
  },
  {
    label: 'Power Output',
    value: '374',
    unit: 'hp',
  },
  {
    label: 'Torque',
    value: '500',
    unit: 'Nm',
  },
  {
    label: 'Engine',
    value: '3.0L Inline-6 TwinPower Turbo',
  },
  {
    label: 'Drivetrain',
    value: 'xDrive AWD',
  },
  {
    label: 'Transmission',
    value: '8-Speed Steptronic Sport',
  },
  {
    label: 'Fuel Efficiency',
    value: '8.2',
    unit: 'L/100km',
  },
]

// ─── Primary Performance Stats ────────────────────────────────────────────────
// Useful for hero sections, animated counters, and performance cards.

export const PERFORMANCE_STATS = [
  {
    value: '374',
    unit: 'hp',
    label: 'Power Output',
  },
  {
    value: '500',
    unit: 'Nm',
    label: 'Torque',
  },
  {
    value: '4.5',
    unit: 's',
    label: '0–100 km/h',
  },
  {
    value: '250',
    unit: 'km/h',
    label: 'Top Speed',
  },
] as const

// ─── Available Colors ─────────────────────────────────────────────────────────

export const CAR_COLORS: CarColor[] = [
  {
    name: 'Sapphire Black',
    hex: '#0A0A0F',
    metallic: true,
  },
  {
    name: 'Alpine White',
    hex: '#F5F5F0',
    metallic: false,
  },
  {
    name: 'Portimao Blue',
    hex: '#1A2A5E',
    metallic: true,
  },
  {
    name: 'Toronto Red',
    hex: '#8B1A1A',
    metallic: true,
  },
  {
    name: 'Frozen Grey',
    hex: '#5A5A5A',
    metallic: false,
  },
  {
    name: 'Skyscraper Grey',
    hex: '#9A9A9A',
    metallic: true,
  },
]

// ─── Site Metadata ────────────────────────────────────────────────────────────

export const SITE_NAME = 'BMW M440i'

export const SITE_TAGLINE = 'The Art of Performance'

export const SITE_DESCRIPTION =
  'Experience the BMW M440i Gran Coupé — where athletic precision meets refined elegance in a cinematic interactive 3D showcase.'

// ─── Brand Theme ──────────────────────────────────────────────────────────────
// Centralized values for consistent use across sections.

export const BRAND_COLORS = {
  background: '#050505',
  primary: '#D71920',
  primaryHover: '#F02A32',
  white: '#FFFFFF',
} as const

// ─── Vehicle Metadata ─────────────────────────────────────────────────────────

export const VEHICLE = {
  brand: 'BMW',
  model: 'M440i xDrive Gran Coupé',
  year: '2024',
  engine: '3.0L Inline-6 TwinPower Turbo',
  horsepower: '374 hp',
  torque: '500 Nm',
  acceleration: '4.5 s',
  topSpeed: '250 km/h',
} as const