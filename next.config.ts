/** @type {import('next').NextConfig} */
import withTM from 'next-transpile-modules';

// ✅ 1️⃣ Add all the modules that need transpiling
const withTranspileModules = withTM([
  'expo-modules-core',
  '@kinde/js-utils',
  '@kinde-oss/kinde-typescript-sdk',
  '@kinde-oss/kinde-auth-nextjs',
]);

const nextConfig = {
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
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
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

// ✅ 2️⃣ Wrap your config:
export default withTranspileModules(nextConfig);
