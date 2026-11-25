import { BlurIn } from "@/components/motion/BlurIn";
import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import { getPage } from "@/features/cms/services/cmsContent";
import { PageSection } from "@/components/shared/section/PageSection";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import { ProgramTabs } from "./ProgramTabs";

// The "Built around your reports" programs section, in the reference services layout.
export async function ProgramsSection() {
  const home = await getPage("home-page");
  const { services } = home;
  return (
    <PageSection id="services" tone="beige" food={FLOATING_FOOD.programs}>
      <SectionIntro eyebrow={services.pill} title={services.title} lead={services.lead} center />
      <ProgramTabs />
      <BlurIn delay={0.2} className="mt-10 flex justify-center">
        <LinkButton href={services.cta.href} variant="outline" size="xl">{services.cta.label}</LinkButton>
      </BlurIn>
    </PageSection>
  );
}
