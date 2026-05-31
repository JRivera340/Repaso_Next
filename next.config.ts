import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Dominio de las apis*/
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      }
    ]
  }
};

export default nextConfig;
