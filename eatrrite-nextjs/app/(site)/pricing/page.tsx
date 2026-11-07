import type { Metadata } from "next";
import { PackageGrid } from "@/components/programs/package-grid";
import { PageBanner } from "@/components/site/page-banner";
import { SectionHeading } from "@/components/site/section-heading";
import inner from "@/lib/data/inner.json";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Eat Rrite nutrition programs come in three package lengths — 30, 90 and 180 days.",
};

export default function PricingPage() {
  const copy = inner.pricing;
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
