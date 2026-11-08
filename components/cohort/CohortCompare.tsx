import { faCheck, faMinus, faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IconCard } from "@/components/cohort/IconCard";
import { cohortIcon } from "@/components/cohort/cohortIcons";
import { Icon } from "@/components/shared/Icon";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import copy from "@/constants/cohort/content.json";
import { pageFood } from "@/constants/home/floatingFood";

const MARKS = {
  yes: { icon: faCheck, className: "text-primary", label: "Yes" },
  no: { icon: faXmark, className: "text-destructive", label: "No" },
  warn: { icon: faTriangleExclamation, className: "text-accent", label: "Limited" },
  dash: { icon: faMinus, className: "text-muted-foreground", label: "Not comparable" },
};

// cohort-compare.php: Eat Rrite vs diet apps vs Instagram advice, one card per column.
export function CohortCompare() {
  const { compare } = copy;
  return (
    <PageSection tone="mint" food={pageFood(1)}>
      <SectionIntro eyebrow={compare.pill} title={compare.title} lead={compare.lead} center />
      <p className="mx-auto mt-6 mb-0 max-w-2xl text-center text-sm text-text">{compare.note}</p>
      <ul className="mt-10 mb-0 grid gap-4 p-0 md:grid-cols-3">
        {compare.cols.map((col, index) => (
          <IconCard key={col.title} icon={cohortIcon(col.icon)} title={col.title} brand={col.brand} delay={0.05 + index * 0.06}>
            <ul className="mt-4 mb-0 grid gap-3 p-0">
              {compare.rows.map((row) => {
                const mark = MARKS[row[index + 1] as keyof typeof MARKS] ?? MARKS.dash;
                return (
                  <li key={row[0]} className="flex list-none gap-3 text-sm text-text">
                    <span role="img" aria-label={mark.label} className={mark.className}>
                      <Icon icon={mark.icon} />
                    </span>
                    {row[0]}
                  </li>
                );
              })}
            </ul>
          </IconCard>
        ))}
      </ul>
    </PageSection>
  );
}
