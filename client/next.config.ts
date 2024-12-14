import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Match any path under `/api`
        destination: 'https://lms-t0l4.onrender.com/api/:path*', // Your backend URL
      },
    ];
  },
};

export default nextConfig;
