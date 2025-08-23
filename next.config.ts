import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds (warnings won't break deployment)
    ignoreDuringBuilds: true,
  },
  // Add any other existing config options you have
}

export default nextConfig
