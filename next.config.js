/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/:prefix(\\d+)-twin-flame/:num(\\d+)',
        destination: '/twin-flame/:num',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
