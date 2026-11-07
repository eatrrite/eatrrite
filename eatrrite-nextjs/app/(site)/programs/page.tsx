import type { Metadata } from "next";
import { ProgramCard } from "@/components/programs/program-card";
import { PageBanner } from "@/components/site/page-banner";
import { SectionHeading } from "@/components/site/section-heading";
import inner from "@/lib/data/inner.json";
import programs from "@/lib/data/programs.json";

export const metadata: Metadata = {
  title: "Nutrition Programs",
  description:
    "Explore Eat Rrite's 30, 90 and 180-day nutrition programs for weight loss, diabetes, gut health and women's hormonal health.",
};

export default function ProgramsPage() {
  const copy = inner.programs;
  return (
    <>
      <PageBanner title="Programs" />
      <section className="er-section">
        <div className="er-container">
          <SectionHeading pill={copy.pill} title={copy.title} lead={copy.lead} />
          <div className="mt-10 grid grid-cols-2 gap-6 er-900:grid-cols-1">
            {programs.map((p) => (
              <ProgramCard key={p.slug} program={p} linkLabel="View Program" wide />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
