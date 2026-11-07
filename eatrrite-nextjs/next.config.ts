import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [75, 90],
  },
  // Old PHP addresses. Booking result pages move in Phase 4.
  async redirects() {
    const pages: [string, string][] = [
      ["/index.php", "/"],
      ["/about.php", "/about"],
      ["/programs.php", "/programs"],
      ["/pricing.php", "/pricing"],
      ["/blog.php", "/blog"],
      ["/contact.php", "/contact"],
      ["/appointment.php", "/appointment"],
    ];
    return [
      {
        source: "/program.php",
        has: [{ type: "query", key: "slug", value: "(?<slug>.+)" }],
        destination: "/programs/:slug",
        statusCode: 301,
      },
      { source: "/program.php", destination: "/programs", statusCode: 301 },
      { source: "/admin", destination: "/admin/dashboard", permanent: false },
      ...pages.map(([source, destination]) => ({ source, destination, statusCode: 301 as const })),
    ];
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
