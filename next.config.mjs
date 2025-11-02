/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable Turbopack - use webpack for Prisma plugin compatibility
  webpack: (config, { isServer }) => {
    if (isServer) {
      const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
      config.plugins.push(new PrismaPlugin())
    }
    return config
  },
}

export default nextConfig

