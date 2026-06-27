import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: '.',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'itlrpsecjfvgwhrtxctx.supabase.co',
      },
    ],
  },
}

export default nextConfig

// Enable the Cloudflare/OpenNext dev bindings during `next dev`.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
initOpenNextCloudflareForDev()
