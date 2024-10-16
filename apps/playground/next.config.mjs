/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@kaiverse/k'],
  experimental: {
    optimizePackageImports: ['@kaiverse/k'],
  },
}

export default nextConfig
