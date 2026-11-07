import { Reveal } from "@/components/motion/reveal";
import { SplitTitle } from "@/components/motion/split-title";
import { ButtonLink } from "@/components/site/button-link";
import { Badge, BadgeDot } from "@/components/ui/badge";
import home from "@/lib/data/home.json";

// Copies .cta-section and .cta-box from style.css.
export function Cta() {
  const { cta } = home;
  return (
    <section className="er-section bg-[linear-gradient(180deg,var(--er-color-cream)_0%,#fff_100%)]">
      <div className="er-container">
        <Reveal preset="cta">
          <div className="relative flex items-center justify-between gap-10 overflow-hidden rounded-2xl border border-accent/25 bg-[linear-gradient(135deg,var(--er-color-primary)_0%,var(--er-color-cta-mid)_55%,var(--er-color-primary)_100%)] px-20 py-16 text-white shadow-cta before:absolute before:-right-[100px] before:-bottom-[100px] before:z-1 before:size-[300px] before:rounded-full before:bg-accent/12 er-md:flex-col er-md:px-8 er-md:py-12 er-md:text-center max-[360px]:px-5">
            <div className="pointer-events-none absolute -top-[60px] -left-[60px] size-[200px] rounded-full bg-accent-green/12" />
            <div>
              <Badge variant="on-dark" className="mb-[18px]">
                <BadgeDot />
                {cta.pill}
              </Badge>
              <SplitTitle
                text={cta.title}
                className="type-cta mb-3 max-w-[540px] text-white er-md:max-w-full"
                lineClassName="er-md:justify-center"
              />
              <p className="mb-0 max-w-[500px] text-base text-white/85 er-md:mb-5 er-md:max-w-full">{cta.text}</p>
            </div>
            <ButtonLink variant="accent" href={cta.cta.href} className="relative z-2 max-[360px]:px-5">
              {cta.cta.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
