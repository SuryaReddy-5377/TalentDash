/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip sitemap generation during build
  async rewrites() {
    return [];
  },
}

module.exports = nextConfig