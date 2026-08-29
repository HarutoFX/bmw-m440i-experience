// ─── Global Type Definitions ──────────────────────────────────────────────────

export interface CarSpec {
  label: string
  value: string
  unit?: string
}

export interface CarColor {
  name: string
  hex: string
  metallic?: boolean
}

export interface NavItem {
  label: string
  href: string
}

export type ThemeMode = 'dark' | 'light'