import { BlurIn } from "@/components/motion/BlurIn";
import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import home from "@/constants/home/content.json";
import { HomeSection } from "./kit/HomeSection";
import { LinkButton } from "./kit/LinkButton";
import { SectionIntro } from "./kit/SectionIntro";
import { ProgramTabs } from "./ProgramTabs";

// The "Built around your reports" programs section, in the Deccan services layout.
export function ProgramsSection() {
  const { services } = home;
  return (
    <HomeSection id="services" tone="mint" food={FLOATING_FOOD.programs}>
      <SectionIntro eyebrow={services.pill} title={services.title} lead={services.lead} center />
      <ProgramTabs />
      <BlurIn delay={0.2} className="mt-10 flex justify-center">
        <LinkButton href={services.cta.href} variant="outline" size="xl">{services.cta.label}</LinkButton>
      </BlurIn>
    </HomeSection>
  );
}
