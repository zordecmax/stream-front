import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'vz-86921353-a1a.b-cdn.net',
      },
      {
        protocol: 'https',
        hostname: 'image.mux.com',
      },
    ],
  },
};

export default nextConfig;
