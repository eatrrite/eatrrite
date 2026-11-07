import type { Metadata } from "next";
import { Bricolage_Grotesque, Lora } from "next/font/google";
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
  title: "Eat Rrite - Nutritionist, Holistic Health and Wellness",
  description:
    "Eat Rrite is a nutrition and holistic wellness platform offering personalised diet programs, yoga, and lifestyle guidance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lora.variable} ${bricolage.variable}`}>
      <body>{children}</body>
    </html>
  );
}
