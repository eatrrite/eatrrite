import Link from "next/link";
import { Fragment } from "react";
import { CalendarDays, LayoutGrid } from "lucide-react";
import { HeroMotion } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/button";
import home from "@/constants/home/content.json";
import { BrushMark } from "./hero/BrushMark";
import { HeroEyebrow } from "./hero/HeroEyebrow";
import { HeroFeatures } from "./hero/HeroFeatures";
import { HeroTrustBadge } from "./hero/HeroTrustBadge";
import { HeroSlides } from "./HeroSlides";

// Last two words of the title get the accent colour and brush mark, as in the
// reference design hero ("Healthier You").
function splitTitle(title: string) {
  const words = title.split(" ");
  return [words.slice(0, -2).join(" "), words.slice(-2).join(" ")];
}

// Background slides and overlay are unchanged. The left side copies the reference
// Dentics hero: eyebrow, headline, lead, buttons, features and trust badge.
export function Hero() {
  const { hero } = home;
  const [start, highlight] = splitTitle(hero.title);
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden text-white md:min-h-[85vh] er-md:pb-0">
      <HeroSlides slides={hero.slides} />
      <div className="absolute inset-0 z-2 bg-[linear-gradient(90deg,rgba(1,78,78,0.82),rgba(1,78,78,0.35))]" />
      <div className="er-container relative z-3 py-16">
        <div className="max-w-xl lg:max-w-[36rem]">
          <HeroMotion delay={0.05}>
            <HeroEyebrow text={hero.pill} />
          </HeroMotion>
          <HeroMotion delay={0.18}>
            <h1 className="m-0 font-heading text-[2.35rem] leading-[1.12] font-bold tracking-tight text-white sm:text-5xl lg:text-[3.15rem] xl:text-[3.5rem]">
              {start}{" "}
              <span className="inline-flex flex-wrap items-center gap-x-3 text-accent">
                <span>
                  {highlight.split(" ").map((word, i) => (
                    <Fragment key={word}>
                      {i > 0 && " "}
                      <span className="whitespace-nowrap">{word}</span>
                    </Fragment>
                  ))}
                </span>
                <BrushMark width={56} className="shrink-0 text-accent" />
              </span>
            </h1>
          </HeroMotion>
          <HeroMotion delay={0.32}>
            <p className="mt-6 mb-0 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">{hero.text}</p>
          </HeroMotion>
          <HeroMotion delay={0.45}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="xl" variant="accent" className="!rounded-full" nativeButton={false} render={<Link href={hero.primaryCta.href} />}>
                <CalendarDays />
                {hero.primaryCta.label}
              </Button>
              <Button size="xl" variant="outline" className="!rounded-full" nativeButton={false} render={<Link href={hero.secondaryCta.href} />}>
                <LayoutGrid />
                {hero.secondaryCta.label}
              </Button>
            </div>
          </HeroMotion>
          <HeroMotion delay={0.58}>
            <HeroFeatures />
          </HeroMotion>
          <HeroMotion delay={0.7} className="mt-8 lg:hidden">
            <HeroTrustBadge />
          </HeroMotion>
        </div>
      </div>
      {/* Desktop: pinned to the right edge, centred vertically, tilted 45 degrees about its centre. translate-x-4 puts its corner on the edge. */}
      <HeroMotion delay={0.7} className="absolute top-10 right-20 z-3 hidden lg:block">
        <HeroTrustBadge className="translate-x-4" />
      </HeroMotion>
    </section>
  );
}
