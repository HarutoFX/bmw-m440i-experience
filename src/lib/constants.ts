import type { CarSpec, CarColor, NavItem } from '@/types'

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
  { label: '0–100 km/h', value: '4.5', unit: 's' },
  { label: 'Top Speed', value: '250', unit: 'km/h' },
  { label: 'Power Output', value: '374', unit: 'hp' },
  { label: 'Torque', value: '500', unit: 'Nm' },
  { label: 'Engine', value: '3.0L Inline-6 TwinPower Turbo' },
  { label: 'Drivetrain', value: 'xDrive AWD' },
  { label: 'Transmission', value: '8-Speed Steptronic Sport' },
  { label: 'Fuel Efficiency', value: '8.2', unit: 'L/100km' },
]

// ─── Available Colors ─────────────────────────────────────────────────────────

export const CAR_COLORS: CarColor[] = [
  { name: 'Sapphire Black', hex: '#0a0a0f', metallic: true },
  { name: 'Alpine White', hex: '#f5f5f0' },
  { name: 'Portimao Blue', hex: '#1a2a5e', metallic: true },
  { name: 'Toronto Red', hex: '#8b1a1a', metallic: true },
  { name: 'Frozen Grey', hex: '#5a5a5a' },
  { name: 'Skyscraper Grey', hex: '#9a9a9a', metallic: true },
]

// ─── Site Metadata ────────────────────────────────────────────────────────────

export const SITE_NAME = 'BMW M440i'
export const SITE_TAGLINE = 'The Art of Performance'
export const SITE_DESCRIPTION =
  'Experience the BMW M440i Gran Coupé — where athletic precision meets refined elegance in a stunning 3D showcase.'
