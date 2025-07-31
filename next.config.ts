import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/dlux6k0f5/image/upload/**"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dlux6k0f5/image/upload/**"
      }
    ]
  }
};

export default nextConfig;
