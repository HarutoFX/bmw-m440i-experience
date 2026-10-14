import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BMW M440i Gran Coupé 3D Experience',
    short_name: 'BMW 3D',
    description: 'Immersive interactive 3D web experience for the BMW M440i Gran Coupé.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#050505',
    icons: [
      {
        src: '/bmw-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/bmw-logo-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/bmw-logo-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
