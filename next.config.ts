import type { NextConfig } from "next";
import { siteRedirects } from "./config/redirects";

// Testing through a Cloudflare quick tunnel (for example the Razorpay webhook): the dev server
// must serve its scripts to the tunnel's address, and accept server actions (the questionnaire)
// from it. Development only, so production keeps the default same-site checks.
const TUNNELS = ["*.trycloudflare.com"];
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  allowedDevOrigins: TUNNELS,
  ...(isDev ? { experimental: { serverActions: { allowedOrigins: TUNNELS } } } : {}),
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF first (about a quarter smaller than WebP), WebP for browsers without it.
    formats: ["image/avif", "image/webp"],
    // 60 for large photos below the first screen (a smaller first load), 75 normal, 90 hero.
    qualities: [60, 75, 90],
  },
  // Old addresses → new pages (301). The list lives in config/redirects.ts.
  async redirects() {
    return siteRedirects();
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
