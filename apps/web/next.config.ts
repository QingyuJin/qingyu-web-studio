import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: ["@qingyu/auth", "@qingyu/config", "@qingyu/ui"],
};

export default nextConfig;
