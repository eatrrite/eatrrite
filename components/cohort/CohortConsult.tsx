import { BlurIn } from "@/components/motion/BlurIn";
import { IconCard } from "@/components/cohort/IconCard";
import { cohortIcon } from "@/components/cohort/cohortIcons";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import copy from "@/constants/cohort/content.json";
import { pageFood } from "@/constants/home/floatingFood";
import { ROUTES } from "@/constants/routes";

// cohort-consult.php: what the ₹800 consultation gives, the four steps, the fee note and a button.
export function CohortConsult() {
  const { get, steps } = copy;
  return (
    <PageSection id="how-it-works" tone="beige" food={pageFood(3)}>
      <SectionIntro eyebrow={get.pill} title={get.title} lead={get.lead} center />
      <ul className="mt-10 mb-0 grid gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
        {get.items.map((item, index) => (
          <IconCard key={item.num} icon={cohortIcon(item.icon)} num={item.num} title={item.title} text={item.text} delay={0.05 + index * 0.05} />
        ))}
      </ul>
      <BlurIn className="mx-auto mt-16 max-w-2xl text-center">
        <h3 className="m-0 font-heading text-2xl font-bold text-ink">{steps.title}</h3>
        <p className="mt-3 mb-0 text-text">{steps.lead}</p>
      </BlurIn>
      <ol className="mt-8 mb-0 grid gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {steps.items.map((item, index) => (
          <IconCard key={item.num} icon={cohortIcon(item.icon)} num={item.num} title={item.title} text={item.text} delay={0.05 + index * 0.06} />
        ))}
      </ol>
      <p className="mx-auto mt-8 mb-0 max-w-2xl text-center text-sm text-text">{steps.note}</p>
      <BlurIn delay={0.1} className="mt-8 flex justify-center">
        <LinkButton href={ROUTES.appointment} size="xl">{steps.cta}</LinkButton>
      </BlurIn>
    </PageSection>
  );
}
