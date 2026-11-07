import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Lora } from "next/font/google";
import { BRAND } from "@/constants/brand";
import "./globals.css";

// Same Google families, weights and axes as the PHP includes/header.php.
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: `${BRAND.name} - Nutritionist, Holistic Health and Wellness`,
  description: BRAND.description,
  applicationName: BRAND.name,
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    locale: BRAND.locale,
    images: [BRAND.shareImage],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: BRAND.themeColor };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lora.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
