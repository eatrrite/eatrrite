import { IconCard } from "@/components/cohort/IconCard";
import { cohortIcon } from "@/components/cohort/cohortIcons";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import copy from "@/constants/cohort/content.json";
import { pageFood } from "@/constants/home/floatingFood";

const pad = (n: number) => String(n).padStart(2, "0");

// cohort-fit.php: the eight symptoms the cohort is built for.
export function CohortFit() {
  const { fit } = copy;
  return (
    <PageSection tone="white" food={pageFood(0)}>
      <SectionIntro eyebrow={fit.pill} title={fit.title} lead={fit.lead} center />
      <ul className="mt-10 mb-0 grid gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {fit.items.map((item, index) => (
          <IconCard key={item.title} icon={cohortIcon(item.icon)} num={pad(index + 1)} title={item.title} delay={0.05 + index * 0.04} />
        ))}
      </ul>
    </PageSection>
  );
}
