/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Remove unused routes
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig