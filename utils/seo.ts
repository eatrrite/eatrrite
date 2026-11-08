import type { Metadata } from "next";
import { BRAND } from "@/constants/brand";

type PageSeo = {
  /** The full title tag, as the brief gives it (under about 60 characters). */
  title: string;
  /** Under about 155 characters. */
  description: string;
  /** The page's own address, for the canonical tag and the share preview. */
  path: string;
  /** Pages Google should not list (thank-you, ad landing pages). */
  noindex?: boolean;
};

// Title, description, self-referencing canonical and the share preview (Open Graph, 1200×630)
// for one page, so every page has all four (brief §4, §6.2, §6.5).
export function pageMetadata({ title, description, path, noindex = false }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: BRAND.name,
      locale: BRAND.locale,
      url: path,
      title,
      description,
      images: [{ url: BRAND.shareImage, width: 1200, height: 630, alt: "Eat Rrite: Indian food you already eat, balanced" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [BRAND.shareImage] },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
