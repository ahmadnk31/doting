import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        hostname:'cdn.dummyjson.com'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true, // This will ignore ESLint during build (use cautiously)
  },
};

export default nextConfig;
