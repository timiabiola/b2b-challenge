/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ['127.0.0.1:8081', 'localhost:8081'],
  },
}

module.exports = nextConfig