import { ProgramCard } from "@/components/programs/program-card";
import { ButtonLink } from "@/components/site/button-link";
import { SectionHeading } from "@/components/site/section-heading";
import home from "@/lib/data/home.json";
import programs from "@/lib/data/programs.json";

// Copies .programs-grid--four and .card.program-card from style.css and match.css.
export function Programs() {
  const block = home.programs;
  return (
    <section className="er-section bg-mint">
      <div className="er-container">
        <SectionHeading pill={block.pill} title={block.title} lead={block.lead} />
        <div className="mt-10 grid grid-cols-4 gap-6 er-md:grid-cols-2 er-sm:grid-cols-1">
          {programs.map((p) => (
            <ProgramCard key={p.slug} program={p} linkLabel="Learn More" />
          ))}
        </div>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <ButtonLink href={block.cta.href}>{block.cta.label}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
