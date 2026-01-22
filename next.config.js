/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for deployment
  images: {
    unoptimized: true, // Required for static export
  },
  // Optimize for static generation
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // For initial setup
  },
}

module.exports = nextConfig
