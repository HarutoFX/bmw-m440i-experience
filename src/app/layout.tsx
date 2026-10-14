import type { Metadata, Viewport } from 'next'
import { Outfit, Roboto_Mono, Inter, Pacifico } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_DESCRIPTION, SITE_TAGLINE } from '@/lib/constants'
import { SmoothCursor } from "@/registry/magicui/smooth-cursor"
import ScrollProgress from '@/components/ui/ScrollProgress'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const pacifico = Pacifico({
  variable: '--font-pacifico',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://bmw-m440i-showcase.vercel.app'),

  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  keywords: [
    'BMW',
    'M440i',
    '3D',
    'Gran Coupé',
    'M Performance',
    'configurator',
  ],

  openGraph: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: 'https://bmw-m440i-showcase.vercel.app',
    siteName: SITE_NAME,

    images: [
      {
        url: '/images/m440i_cta_bg.jpg',
        width: 1920,
        height: 1080,
        alt: 'BMW M440i Gran Coupé',
      },
    ],

    type: 'website',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ['/images/m440i_cta_bg.jpg'],
  },

  icons: {
    icon: [
      { url: '/bmw-logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '192x192', type: 'image/png' },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${robotoMono.variable} ${inter.variable} ${pacifico.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full bg-[#050505] text-white overflow-x-hidden">
        <ScrollProgress />
        <SmoothCursor />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}