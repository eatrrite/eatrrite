import Image from "next/image";
import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/site/button-link";
import { Icon } from "@/components/site/icon";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import home from "@/lib/data/home.json";
import programs from "@/lib/data/programs.json";
import { programHref } from "@/lib/data/site";

// Copies .programs-grid--four and .card.program-card from style.css and match.css.
export function Programs() {
  const block = home.programs;
  return (
    <section className="er-section bg-mint">
      <div className="er-container">
        <SectionHeading pill={block.pill} title={block.title} lead={block.lead} />
        <div className="mt-10 grid grid-cols-4 gap-6 er-md:grid-cols-2 er-sm:grid-cols-1">
          {programs.map((p) => (
            <Reveal key={p.slug} preset="card" className="h-full">
              <Card className="h-full gap-0">
                <div className="relative mb-5 overflow-hidden rounded-[18px]">
                  <Image
                    src={p.image}
                    alt={p.short}
                    width={520}
                    height={420}
                    sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 25vw"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-[ease] group-hover/card:scale-108"
                  />
                </div>
                <CardTitle className="mb-3">{p.short}</CardTitle>
                <CardDescription className="mb-4 flex-1">{p.summary}</CardDescription>
                <Link
                  href={programHref(p.slug)}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition-[color,gap] duration-300 ease-[ease] group-hover/card:text-primary-dark"
                >
                  Learn More
                  <Icon
                    icon={faArrowRight}
                    className="text-accent transition-transform duration-300 ease-[ease] group-hover/card:translate-x-1"
                  />
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <ButtonLink href={block.cta.href}>{block.cta.label}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
