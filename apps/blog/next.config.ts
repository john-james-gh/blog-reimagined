import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [80, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
