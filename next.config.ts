import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.r2.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https', 
        hostname: '*.r2.cloudflarestorage.com',
        port: '',
        pathname: '/**',
      },
      // Add your custom domain if you have one
      // {
      //   protocol: 'https',
      //   hostname: 'your-custom-domain.com',
      //   port: '',
      //   pathname: '/**',
      // }
    ],
  },
  /* config options here */
};

export default nextConfig;
