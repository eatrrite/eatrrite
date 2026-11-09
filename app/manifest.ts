import type { MetadataRoute } from "next";
import { BRAND } from "@/constants/brand";

// Web app manifest, built from the brand manifest.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.name} — ${BRAND.tagline}`,
    short_name: BRAND.name,
    description: BRAND.description,
    start_url: "/",
    display: "standalone",
    background_color: BRAND.backgroundColor,
    theme_color: BRAND.themeColor,
    icons: [
      { src: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
