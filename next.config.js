/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3001'  // Development URL
      : process.env.VERCEL_URL   // Production URL
  }
};

module.exports = nextConfig; 