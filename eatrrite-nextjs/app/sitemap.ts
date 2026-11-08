import type { MetadataRoute } from "next";
import { BRAND } from "@/constants/brand";
import programs from "@/constants/programs/programs.json";
import { programPath, ROUTES } from "@/constants/routes";

// Only live, final pages (brief §6.5): no old .php addresses, no thank-you or confirmation page,
// no admin or API. New pages and program slugs appear here automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ROUTES.home, ROUTES.about, ROUTES.doctors, ROUTES.programs, ROUTES.pricing,
    ROUTES.blog, ROUTES.contact, ROUTES.appointment, ROUTES.cohort, ROUTES.media, ROUTES.privacy,
    ...programs.map((program) => programPath(program.slug)),
  ];
  return pages.map((path) => ({ url: new URL(path, BRAND.url).toString() }));
}
