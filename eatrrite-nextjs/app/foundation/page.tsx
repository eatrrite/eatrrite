import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { Colours } from "@/components/foundation/colours";
import { FoundationHero } from "@/components/foundation/hero";
import { Showcase } from "@/components/foundation/showcase";
import { Spacing } from "@/components/foundation/spacing";
import { Typography } from "@/components/foundation/typography";

export const metadata: Metadata = {
  title: "Foundation UI | Eat Rrite Next.js",
  description: "Design tokens and components for the Eat Rrite Next.js rebuild.",
  robots: { index: false, follow: false },
};

export default function FoundationPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <FoundationHero />
        <Colours />
        <Typography />
        <Spacing />
        <Showcase />
      </main>
      <footer className="bg-footer py-10 text-[15px] text-footer-text">
        <div className="er-container">Eat Rrite Next.js rebuild. Foundation reference page.</div>
      </footer>
    </MotionConfig>
  );
}
