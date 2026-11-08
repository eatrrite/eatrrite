import { BlurIn } from "@/components/motion/BlurIn";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import { pageFood } from "@/constants/home/floatingFood";
import { ROUTES } from "@/constants/routes";

type CtaCopy = { pill: string; title: string; text: string; cta: string };

// cohort-investment.php and cohort-cta.php: a boxed message with the booking button.
export function CohortCta({ copy, id, food }: { copy: CtaCopy; id?: string; food: number }) {
  return (
    <PageSection id={id} tone="mint" food={pageFood(food)}>
      <div className="flex flex-col items-center gap-8 rounded-xl border border-border bg-white px-6 py-12 text-center sm:px-12">
        <SectionIntro eyebrow={copy.pill} title={copy.title} lead={copy.text} center />
        <BlurIn delay={0.2}>
          <LinkButton href={ROUTES.appointment} size="xl">{copy.cta}</LinkButton>
        </BlurIn>
      </div>
    </PageSection>
  );
}
