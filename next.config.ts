import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /**
   * React Three Fiber and Drei ship as ES modules.
   * Next.js requires these to be transpiled for compatibility
   * with its module system.
   */
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  /**
   * Allow importing 3D model files as static assets.
   * GLTF/GLB files will be handled as public assets via /public/models/.
   */
  experimental: {
    // Enables the stable turbopack for faster dev builds (optional)
    // turbo: {},
  },

  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
