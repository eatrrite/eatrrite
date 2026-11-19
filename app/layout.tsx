import type { Metadata, Viewport } from "next";
import { Caveat, Libre_Baskerville, Merriweather } from "next/font/google";
import { env } from "@/config/env";
import { BRAND } from "@/constants/brand";
import "./globals.css";

// Same three families as the reference design site: Libre Baskerville for
// headings, Merriweather for body text, Caveat for handwritten accents.
const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  // Handwritten accents sit below the first screen, so it is not preloaded (a smaller first load).
  preload: false,
});

export const metadata: Metadata = {
  // Canonical links and share previews always name the real domain, never the deployment host
  // (Vercel's eatrrite.vercel.app was being sent to Google as the canonical address).
  metadataBase: new URL(BRAND.url),
  title: `${BRAND.name} - Nutritionist, Holistic Health and Wellness`,
  description: BRAND.description,
  applicationName: BRAND.name,
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    locale: BRAND.locale,
    images: [{ url: BRAND.shareImage, width: 1200, height: 630, alt: BRAND.shareImageAlt }],
  },
  twitter: { card: "summary_large_image" },
  // Search Console and Bing Webmaster Tools ownership tags, only once the owner sets the values.
  verification: {
    google: env.googleSiteVerification() || undefined,
    other: env.bingSiteVerification() ? { "msvalidate.01": env.bingSiteVerification() } : undefined,
  },
};

export const viewport: Viewport = { themeColor: BRAND.themeColor };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${libreBaskerville.variable} ${merriweather.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
