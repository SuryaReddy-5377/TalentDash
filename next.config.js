/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable static generation for sitemap
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
}

module.exports = nextConfig