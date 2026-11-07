import Image from "next/image";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SplitTitle } from "@/components/motion/split-title";

const links = [
  ["Colours", "#colours"],
  ["Typography", "#typography"],
  ["Spacing and radius", "#spacing"],
  ["Components", "#components"],
];

export function FoundationHero() {
  return (
    <section className="bg-primary py-[100px] text-white">
      <div className="er-container">
        <Image
          src="/images/logo/logo-horizontal-light.png"
          alt="Eat Rrite"
          width={220}
          height={56}
          priority
          className="mb-12 h-14 w-auto"
        />
        <Badge variant="hero" className="mb-[18px]">
          <BadgeDot />
          Next.js rebuild, Phase 1
        </Badge>
        <SplitTitle
          as="h1"
          text="Foundation UI"
          delay={0.15}
          className="type-hero mb-[18px] max-w-[14em] text-white"
        />
        <p className="mb-7 max-w-[52ch] text-[clamp(15px,1.5vw,17px)] leading-[1.65] text-white/90">
          Every colour, font, size, radius and shadow below comes from the PHP
          site&apos;s stylesheets, running through shadcn components.
        </p>
        <div className="flex flex-wrap gap-3">
          {links.map(([label, href], i) => (
            <Button
              key={href}
              variant={i === 0 ? "accent" : "outline-light"}
              render={<a href={href} />}
              nativeButton={false}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
