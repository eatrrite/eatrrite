import type { MetadataRoute } from "next";
import { BRAND } from "@/constants/brand";
import { getCollection } from "@/features/cms/services/cmsContent";
import { programPath, ROUTES } from "@/constants/routes";

// Only live, final pages (brief §6.5): no old .php addresses, no thank-you or confirmation page,
// no admin or API. New pages and program slugs appear here automatically.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const programs = await getCollection("programs");
  const pages = [
    ROUTES.home, ROUTES.about, ROUTES.doctors, ROUTES.programs, ROUTES.pricing,
    ROUTES.blog, ROUTES.contact, ROUTES.appointment, ROUTES.cohort, ROUTES.media, ROUTES.privacy,
    ...programs.map((program) => programPath(program.slug)),
  ];
  return pages.map((path) => ({ url: new URL(path, BRAND.url).toString() }));
}
