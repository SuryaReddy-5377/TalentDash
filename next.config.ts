// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  // Add this to handle favicon
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ico$/,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;