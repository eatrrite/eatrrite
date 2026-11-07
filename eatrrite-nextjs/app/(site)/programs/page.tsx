import type { Metadata } from "next";
import { ProgramCard } from "@/components/shared/ProgramCard";
import { PageBanner } from "@/components/layout/PageBanner";
import { SectionHeading } from "@/components/shared/SectionHeading";
import content from "@/constants/programs/content.json";
import programs from "@/constants/programs/programs.json";

export const metadata: Metadata = {
  title: "Nutrition Programs",
  description:
    "Explore Eat Rrite's 30, 90 and 180-day nutrition programs for weight loss, diabetes, gut health and women's hormonal health.",
};

export default function ProgramsPage() {
  const copy = content.list;
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
