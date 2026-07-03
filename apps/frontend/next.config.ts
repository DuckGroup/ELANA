import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Demo: allow product images from any host.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
