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
module.exports = {
  // ...other config
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
}