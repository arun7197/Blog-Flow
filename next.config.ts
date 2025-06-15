/** @type {import('next').NextConfig} */
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  }
};

export default nextConfig;