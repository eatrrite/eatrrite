import { BlurIn } from "@/components/motion/BlurIn";
import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import home from "@/constants/home/content.json";
import { HomeSection } from "./kit/HomeSection";
import { LinkButton } from "./kit/LinkButton";
import { SectionIntro } from "./kit/SectionIntro";

// Closing call to action, in the same section pattern.
export function CtaSection() {
  const { cta } = home;
  return (
    <HomeSection tone="mint" food={FLOATING_FOOD.cta}>
      <div className="flex flex-col items-center gap-8 rounded-xl border border-border bg-white px-6 py-12 text-center sm:px-12">
        <SectionIntro eyebrow={cta.pill} title={cta.title} lead={cta.text} center />
        <BlurIn delay={0.2}>
          <LinkButton href={cta.cta.href} size="xl">{cta.cta.label}</LinkButton>
        </BlurIn>
      </div>
    </HomeSection>
  );
}
