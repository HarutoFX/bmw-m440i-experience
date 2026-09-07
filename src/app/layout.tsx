import type { Metadata, Viewport } from 'next'
import { Outfit, Roboto_Mono } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_DESCRIPTION, SITE_TAGLINE } from '@/lib/constants'
import CustomCursor from '@/components/ui/CustomCursor'
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

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${robotoMono.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full bg-[#050505] text-white overflow-x-hidden">
        <ScrollProgress />
        <CustomCursor />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}