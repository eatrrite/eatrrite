import type { MetadataRoute } from "next";
import { BRAND } from "@/constants/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/appointment-confirmed", "/thank-you"] },
    sitemap: new URL("/sitemap.xml", BRAND.url).toString(),
  };
}
