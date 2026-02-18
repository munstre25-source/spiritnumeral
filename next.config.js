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
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.spiritnumeral.com',
          },
        ],
        destination: 'https://spiritnumeral.com/:path*',
        permanent: true,
      },
      // Twin flame redirect
      {
        source: '/:prefix(\\d+)-twin-flame/:num(\\d+)',
        destination: '/twin-flame/:num',
        permanent: true,
      },
      // Legacy warning URL redirect
      {
        source: '/is-:prefix(\\d+)-a-warning/:num(\\d+)',
        destination: '/warning/:num',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
