import { BlurIn } from "@/components/motion/BlurIn";
import { ProgramTile } from "@/components/shared/ProgramTile";
import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import home from "@/constants/home/content.json";
import programs from "@/constants/programs/programs.json";
import { PageSection } from "@/components/shared/section/PageSection";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { SectionIntro } from "@/components/shared/section/SectionIntro";

// "Nutrition programs built around you": image cards in the Deccan card style.
export function ProgramGridSection() {
  const block = home.programs;
  return (
    <PageSection tone="mint" food={FLOATING_FOOD.programGrid}>
      <SectionIntro eyebrow={block.pill} title={block.title} lead={block.lead} center />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {programs.map((program, index) => (
          <BlurIn key={program.slug} delay={0.1 + index * 0.08} className="h-full">
            <ProgramTile program={program} index={index} />
          </BlurIn>
        ))}
      </div>
      <BlurIn delay={0.2} className="mt-10 flex justify-center">
        <LinkButton href={block.cta.href} size="xl">{block.cta.label}</LinkButton>
      </BlurIn>
    </PageSection>
  );
}
