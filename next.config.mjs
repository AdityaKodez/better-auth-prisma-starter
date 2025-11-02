/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Explicitly disable Turbopack to use webpack for Prisma plugin compatibility
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
      config.plugins.push(new PrismaPlugin())
    }
    return config
  },
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    '/*': ['./node_modules/.prisma/client/**/*'],
  },   
}

export default nextConfig

