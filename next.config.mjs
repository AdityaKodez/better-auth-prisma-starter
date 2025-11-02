/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable Turbopack to use webpack (needed for Prisma plugin)
  // This ensures proper bundling of Prisma binaries on Vercel
  experimental: {
    turbo: false,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
      config.plugins.push(new PrismaPlugin())
    }
    return config
  },
}

export default nextConfig

