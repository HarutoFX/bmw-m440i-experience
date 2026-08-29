import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_DESCRIPTION, SITE_TAGLINE } from '@/lib/constants'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
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

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050505] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}