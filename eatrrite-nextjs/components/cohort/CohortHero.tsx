import Image from "next/image";
import { BlurIn } from "@/components/motion/BlurIn";
import { LinkButton } from "@/components/shared/section/LinkButton";
import copy from "@/constants/cohort/content.json";
import { ROUTES } from "@/constants/routes";

// cohort-hero.php: pill, heading, text, booking button and stats beside the hormone photo.
export function CohortHero() {
  const { hero } = copy;
  return (
    <section className="relative overflow-hidden border-b border-border bg-mint py-16 sm:py-20">
      <div className="er-container grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14">
        <div className="min-w-0">
          <BlurIn>
            <p className="mb-0 type-eyebrow">{hero.pill}</p>
          </BlurIn>
          <BlurIn delay={0.08}>
            <h1 className="mt-3 mb-0 font-heading text-3xl leading-tight font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">{hero.title}</h1>
          </BlurIn>
          <BlurIn delay={0.14}>
            <p className="mt-5 mb-0 max-w-2xl text-text">{hero.text}</p>
          </BlurIn>
          <BlurIn delay={0.2} className="mt-8">
            <LinkButton href={ROUTES.appointment} size="xl">{hero.cta}</LinkButton>
          </BlurIn>
          <BlurIn delay={0.26}>
            <ul className="mt-10 mb-0 flex flex-wrap gap-8 p-0">
              {hero.stats.map((stat) => (
                <li key={stat.label} className="list-none">
                  <strong className="block font-heading text-3xl font-bold text-primary">{stat.value}</strong>
                  <span className="text-sm text-text">{stat.label}</span>
                </li>
              ))}
            </ul>
          </BlurIn>
        </div>
        <BlurIn delay={0.12}>
          <Image src={hero.image} alt={hero.imageAlt} width={900} height={1100} priority sizes="(max-width: 1024px) 100vw, 40vw" className="aspect-[4/5] w-full rounded-xl object-cover shadow-card" />
        </BlurIn>
      </div>
    </section>
  );
}
