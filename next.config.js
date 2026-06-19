/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable sitemap generation
  async rewrites() {
    return [];
  },
  // Disable static generation for problematic pages
  output: 'standalone',
}

module.exports = nextConfig