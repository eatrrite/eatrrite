import {
  faClipboardCheck,
  faHandshake,
  faPersonWalking,
  faPlateWheat,
} from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/shared/Icon";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/card";
import home from "@/constants/home/content.json";

const icons = {
  "fa-clipboard-check": faClipboardCheck,
  "fa-plate-wheat": faPlateWheat,
  "fa-person-walking": faPersonWalking,
  "fa-handshake": faHandshake,
};

// Copies .section-primary-soft, .process-grid and .process-card from style.css.
export function Process() {
  const { process } = home;
  return (
    <section className="er-section bg-[linear-gradient(180deg,var(--er-color-soft)_0%,var(--er-color-mint)_100%)]">
      <div className="er-container">
        <SectionHeading pill={process.pill} title={process.title} />
        <div className="mt-10 grid grid-cols-4 gap-6 er-md:grid-cols-2 er-sm:grid-cols-1">
          {process.steps.map((step) => (
            <Reveal key={step.num} preset="card" className="group/process h-full">
              <Card
                lift={false}
                className="relative block h-full overflow-hidden px-7 py-9 transition-all duration-300 ease-[ease] after:absolute after:-right-5 after:-bottom-5 after:size-[100px] after:rounded-full after:bg-accent/12 after:transition-transform after:duration-[350ms] group-hover/process:-translate-y-1.5 group-hover/process:border-border-hover group-hover/process:shadow-lift group-hover/process:after:scale-[1.4]"
              >
                <div className="mb-3 font-heading text-5xl leading-none font-bold text-accent">{step.num}</div>
                <div className="relative z-1 mb-4 grid size-[52px] place-items-center rounded-[14px] bg-mint text-xl text-primary transition-colors duration-300 ease-[ease] group-hover/process:bg-primary group-hover/process:text-white">
                  <Icon icon={icons[step.icon as keyof typeof icons]} />
                </div>
                <h3 className="relative z-1 mb-2.5 text-[20px] font-semibold text-primary">{step.title}</h3>
                <p className="relative z-1 mb-0 text-[15px] text-text">{step.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
