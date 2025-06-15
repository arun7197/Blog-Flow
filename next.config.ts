/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    // ✅ Ignore TypeScript errors during build (not recommended for production!)
    ignoreBuildErrors: true,
  },
  eslint: {
    // ✅ Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.i-scmp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
