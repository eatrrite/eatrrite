import type { Metadata } from "next";
import { pageMetadata } from "@/utils/seo";
import { ROUTES } from "@/constants/routes";
import { PageBanner } from "@/components/layout/PageBanner";
import { BlurIn } from "@/components/motion/BlurIn";
import { ProgramTile } from "@/components/shared/ProgramTile";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import { pageFood } from "@/constants/home/floatingFood";
import { getCollection, getPage } from "@/features/cms/services/cmsContent";

export const metadata: Metadata = pageMetadata({
  title: "Online Nutrition Programs with Indian Food | Eat Rrite",
  description: "Explore Eat Rrite's 30, 90 and 180-day nutrition programs for weight loss, diabetes, gut health and women's hormonal health.",
  path: ROUTES.programs,
});

export default async function ProgramsPage() {
  const [content, programs] = await Promise.all([getPage("programs-page"), getCollection("programs")]);
  const copy = content.list;
  return (
    <>
      <PageBanner title="Programs" path={ROUTES.programs} />
      <PageSection tone="beige" food={pageFood(0)}>
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
