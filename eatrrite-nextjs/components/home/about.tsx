import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitTitle } from "@/components/motion/split-title";
import { ButtonLink } from "@/components/site/button-link";
import { SectionPill } from "@/components/site/section-heading";
import home from "@/lib/data/home.json";

type Stat = { value: string; label: string; href?: string };

function StatText({ stat }: { stat: Stat }) {
  return (
    <>
      <strong className="type-stat block font-bold text-primary">{stat.value}</strong>
      <span className="type-micro mt-1 block text-muted-foreground">{stat.label}</span>
    </>
  );
}

// Copies .split, .about-photos--next, .founder-quote and .about-stats.
export function About() {
  const { about } = home;
  return (
    <section className="er-section bg-cream">
      <div className="er-container grid grid-cols-2 items-center gap-20 er-md:grid-cols-1">
        <Reveal preset="photos" className="relative">
          <Image
            src={about.image}
            alt="Mukta Patil"
            width={934}
            height={1046}
            sizes="(max-width: 980px) 100vw, 560px"
            className="aspect-[4/5] w-full rounded-lg object-cover shadow-card"
          />
          <Image
            src={about.sideImage}
            alt="Nourishing bowl"
            width={320}
            height={320}
            className="absolute -right-2 -bottom-6 aspect-square w-40 rounded-lg border-4 border-white object-cover shadow-card"
          />
        </Reveal>
        <div>
          <SectionPill>{about.pill}</SectionPill>
          <SplitTitle text={about.title} className="type-section-split mb-5" />
          <Reveal preset="label">
            <p className="type-lead mb-10 max-w-[600px]">{about.lead}</p>
          </Reveal>
          <Reveal preset="copy">
            <p>{about.text}</p>
          </Reveal>
          <blockquote className="my-6 rounded-r-sm border-l-4 border-accent bg-mint px-[22px] py-5 font-heading text-lg text-primary italic">
            “{about.quote}”
            <cite className="mt-2.5 block font-sans text-sm text-text not-italic">{about.cite}</cite>
          </blockquote>
          <ul className="mt-6 mb-2 grid w-full grid-cols-4 gap-x-3 gap-y-4 border-t border-primary/12 pt-5 pb-1 er-xs:grid-cols-2">
            {(about.stats as Stat[]).map((stat) => (
              <li key={stat.label} className="min-w-0">
                {stat.href ? (
                  <Link href={stat.href} className="block hover:opacity-80">
                    <StatText stat={stat} />
                  </Link>
                ) : (
                  <StatText stat={stat} />
                )}
              </li>
            ))}
          </ul>
          <Reveal preset="copy">
            <ButtonLink href={about.cta.href}>{about.cta.label}</ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
