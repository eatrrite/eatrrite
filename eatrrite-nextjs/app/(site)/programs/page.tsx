import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { BlurIn } from "@/components/motion/BlurIn";
import { ProgramTile } from "@/components/shared/ProgramTile";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import { pageFood } from "@/constants/home/floatingFood";
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
      <PageSection tone="white" food={pageFood(0)}>
        <SectionIntro eyebrow={copy.pill} title={copy.title} lead={copy.lead} count={programs.length} center />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {programs.map((program, index) => (
            <BlurIn key={program.slug} delay={0.1 + index * 0.08} className="h-full">
              <ProgramTile program={program} index={index} linkLabel="View Program" />
            </BlurIn>
          ))}
        </div>
      </PageSection>
    </>
  );
}
