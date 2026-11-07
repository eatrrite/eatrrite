import { Reveal } from "@/components/motion/reveal";
import { SplitTitle } from "@/components/motion/split-title";
import { ButtonLink } from "@/components/site/button-link";
import { Badge, BadgeDot } from "@/components/ui/badge";
import home from "@/lib/data/home.json";
import { HeroSlides } from "./hero-slides";

// Copies .hero-slider from style.css and match.css. Timings are from main.js.
export function Hero() {
  const { hero } = home;
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden text-white md:min-h-[85vh] er-md:py-[120px] er-md:pb-20">
      <HeroSlides slides={hero.slides} />
      <div className="absolute inset-0 z-2 bg-[linear-gradient(90deg,rgba(1,78,78,0.82),rgba(1,78,78,0.35))]" />
      <div className="er-container">
        <div className="relative z-3 max-w-[780px]">
          <Reveal preset="hero" immediate delay={0.35}>
            <Badge variant="hero" className="mb-[18px]">
              <BadgeDot />
              {hero.pill}
            </Badge>
          </Reveal>
          <SplitTitle
            as="h1"
            text={hero.title}
            immediate
            delay={0.15}
            className="type-hero mb-[18px] max-w-[14em] text-white"
          />
          <Reveal preset="hero" immediate delay={0.45}>
            <p className="mb-7 max-w-[52ch] text-[clamp(15px,1.5vw,17px)] leading-[1.65] text-white/90">
              {hero.text}
            </p>
          </Reveal>
          <Reveal preset="hero" immediate delay={0.55}>
            <div className="flex flex-wrap items-center gap-4 er-sm:flex-col er-sm:items-stretch">
              <ButtonLink variant="accent" href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink variant="outline-light" href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
