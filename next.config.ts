import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Workers static assets (`npx wrangler deploy`).
  output: "export",
  // The default next/image loader needs a server; serve originals as-is.
  images: { unoptimized: true },
};

export default nextConfig;
