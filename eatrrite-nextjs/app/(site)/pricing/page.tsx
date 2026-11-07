import type { Metadata } from "next";
import { PackageGrid } from "@/components/shared/PackageGrid";
import { PageBanner } from "@/components/layout/PageBanner";
import { SectionHeading } from "@/components/shared/SectionHeading";
import copy from "@/constants/pricing/content.json";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Eat Rrite nutrition programs come in three package lengths — 30, 90 and 180 days.",
};

export default function PricingPage() {
    return (
    <>
      <PageBanner title="Pricing" />
      <section className="er-section">
        <div className="er-container">
          <SectionHeading pill={copy.pill} title={copy.title} lead={copy.lead} />
          <PackageGrid badge />
          <p className="mt-7 mb-4 text-center text-[15px] text-muted-foreground">{copy.note}</p>
        </div>
      </section>
    </>
  );
}
