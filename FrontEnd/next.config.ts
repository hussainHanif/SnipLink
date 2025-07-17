/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,  // ✅ enables app router
    turbo: false, // Disable Turbopack
  },
};

module.exports = nextConfig;
