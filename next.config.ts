import type { NextConfig } from "next";
import { siteRedirects } from "./config/redirects";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [75, 90],
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
