import Link from "next/link";
import { CalendarDays, LayoutGrid } from "lucide-react";
import { HeroMotion } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/button";
import home from "@/constants/home/content.json";
import { HeroEyebrow } from "./hero/HeroEyebrow";
import { HeroFeatures } from "./hero/HeroFeatures";
import { HeroTrustBadge } from "./hero/HeroTrustBadge";
import { HeroSlideProvider } from "./hero/HeroSlideContext";
import { HeroTitle } from "./hero/HeroTitle";
import { HeroSlides } from "./HeroSlides";

// Background slides and overlay are unchanged. The left side copies the reference
// Dentics hero: eyebrow, headline, lead, buttons, features and trust badge.
export function Hero() {
  const { hero } = home;
  return (
    <HeroSlideProvider count={hero.slides.length}>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden text-white md:min-h-[85vh] er-md:pb-0">
        <HeroSlides images={hero.slides.map((slide) => slide.image)} />
        <div className="absolute inset-0 z-2 bg-[linear-gradient(90deg,rgba(1,78,78,0.82),rgba(1,78,78,0))]" />
        <div className="er-container relative z-3 py-16">
          <div className="max-w-xl lg:max-w-[56rem]">
            <HeroMotion delay={0.05}>
              <HeroEyebrow text={hero.pill} />
            </HeroMotion>
            <HeroMotion delay={0.18}>
              <HeroTitle slides={hero.slides} />
            </HeroMotion>
            <HeroMotion delay={0.32}>
              <p className="mt-6 mb-0 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
                {hero.text}
              </p>
            </HeroMotion>
            <HeroMotion delay={0.45}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  size="xl"
                  variant="accent"
                  className="!rounded-full"
                  nativeButton={false}
                  render={<Link prefetch={false} href={hero.primaryCta.href} />}
                >
                  <CalendarDays />
                  {hero.primaryCta.label}
                </Button>
                <Button
                  size="xl"
                  variant="light"
                  className="!rounded-full"
                  nativeButton={false}
                  render={<Link prefetch={false} href={hero.secondaryCta.href} />}
                >
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
        <HeroMotion
          delay={0.7}
          className="absolute top-10 right-20 z-3 hidden lg:block"
        >
          <HeroTrustBadge className="translate-x-4" />
        </HeroMotion>
      </section>
    </HeroSlideProvider>
  );
}
