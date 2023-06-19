/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/f1-squadpro',
  env: {
    NEXT_API_URL: process.env.NEXT_API_URL,
  },
}

module.exports = nextConfig
