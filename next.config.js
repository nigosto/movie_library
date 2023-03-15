/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      }
    ],
    domains: ['m.media-amazon.com', '127.0.0.1']
  }
}

module.exports = nextConfig
