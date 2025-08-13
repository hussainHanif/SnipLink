/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Remove deprecated experimental.appDir - it's stable in Next.js 15+
  
  // Vercel-specific optimizations
  output: 'standalone', // Better for serverless deployments
  
  // Environment variable handling
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Ensure proper error handling
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Headers for better security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  
  // Experimental features that are actually useful
  experimental: {
    // Enable server actions if you plan to use them
    serverActions: true,
    
    // Better error handling
    serverComponentsExternalPackages: ['mongodb'],
  },
};

module.exports = nextConfig;
