import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { BlurIn } from "@/components/motion/BlurIn";
import { PackageCards } from "@/components/shared/PackageCards";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import copy from "@/constants/pricing/content.json";
import { pageFood } from "@/constants/home/floatingFood";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Eat Rrite nutrition programs come in three package lengths — 30, 90 and 180 days.",
};

export default function PricingPage() {
  return (
    <>
      <PageBanner title="Pricing" />
      <PageSection tone="white" food={pageFood(4)}>
        <SectionIntro eyebrow={copy.pill} title={copy.title} lead={copy.lead} center />
        <PackageCards badge />
        <BlurIn delay={0.2}>
          <p className="mx-auto mt-8 mb-0 max-w-2xl text-center text-sm text-text">{copy.note}</p>
        </BlurIn>
      </PageSection>
    </>
  );
}
