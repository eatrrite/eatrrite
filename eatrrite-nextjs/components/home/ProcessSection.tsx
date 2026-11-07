import { faClipboardCheck, faHandshake, faPersonWalking, faPlateWheat } from "@fortawesome/free-solid-svg-icons";
import { BlurInItem } from "@/components/motion/BlurIn";
import { Icon } from "@/components/shared/Icon";
import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import home from "@/constants/home/content.json";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";

const ICONS = {
  "fa-clipboard-check": faClipboardCheck,
  "fa-plate-wheat": faPlateWheat,
  "fa-person-walking": faPersonWalking,
  "fa-handshake": faHandshake,
};

// Four steps on a connected rail, in the Deccan Dentics card style.
export function ProcessSection() {
  const { process } = home;
  return (
    <PageSection tone="white" food={FLOATING_FOOD.process}>
      <SectionIntro eyebrow={process.pill} title={process.title} count={process.steps.length} center />
      <ol className="mt-10 mb-0 grid gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((step, index) => (
          <BlurInItem key={step.num} delay={0.1 + index * 0.08} className="group relative h-full rounded-lg border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-mint">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-lg text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon icon={ICONS[step.icon as keyof typeof ICONS]} />
                </span>
                <span className="font-heading text-3xl font-bold text-primary/15 tabular-nums">{step.num}</span>
              </div>
              <h3 className="mt-5 mb-0 font-heading text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 mb-0 text-sm leading-relaxed text-text">{step.text}</p>
          </BlurInItem>
        ))}
      </ol>
    </PageSection>
  );
}
