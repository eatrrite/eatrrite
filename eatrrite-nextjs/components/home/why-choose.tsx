import {
  faBowlFood,
  faClipboardCheck,
  faFlask,
  faHeart,
  faSpa,
} from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/site/icon";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import home from "@/lib/data/home.json";

const icons = {
  "fa-bowl-food": faBowlFood,
  "fa-heart": faHeart,
  "fa-flask": faFlask,
  "fa-spa": faSpa,
  "fa-clipboard-check": faClipboardCheck,
};

// Copies .why-grid--five and .feature-card from style.css and match.css.
export function WhyChoose() {
  const { why } = home;
  return (
    <section id="why-choose" className="er-section bg-mint">
      <div className="er-container">
        <SectionHeading pill={why.pill} title={why.title} />
        <div className="mt-10 grid grid-cols-3 gap-6 er-md:grid-cols-2 er-sm:grid-cols-1 min-[1200px]:grid-cols-5">
          {why.items.map((item) => (
            <Reveal key={item.num} preset="card" className="group/feature h-full">
              <Card
                lift={false}
                className="relative block h-full overflow-hidden px-7 py-8 transition-[transform,translate,scale,rotate,box-shadow,border-color] duration-[350ms] ease-[ease] before:absolute before:top-0 before:left-0 before:h-1 before:w-full before:bg-[linear-gradient(90deg,var(--er-color-primary),var(--er-color-accent))] before:opacity-0 before:transition-opacity before:duration-300 group-hover/feature:-translate-y-2 group-hover/feature:border-border-hover group-hover/feature:shadow-feature-hover group-hover/feature:before:opacity-100"
              >
                <div className="mb-[18px] grid size-16 place-items-center rounded-full bg-primary text-2xl text-white transition-[background-color] duration-300 ease-[ease] group-hover/feature:bg-accent group-hover/feature:text-ink">
                  <Icon icon={icons[item.icon as keyof typeof icons]} />
                </div>
                <span className="absolute top-6 right-6 font-heading text-[42px] leading-none font-bold text-primary/8">
                  {item.num}
                </span>
                <h3 className="mb-2.5 text-[22px] text-primary">{item.title}</h3>
                <p className="m-0 text-[15px] text-text">{item.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
