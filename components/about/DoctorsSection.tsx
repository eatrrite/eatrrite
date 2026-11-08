import Image from "next/image";
import { BlurIn } from "@/components/motion/BlurIn";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import about from "@/constants/about/content.json";
import { pageFood } from "@/constants/home/floatingFood";

// Doctors on board: a reference-style card with a details timeline.
export function DoctorsSection() {
  const { doctors } = about;
  return (
    <PageSection tone="white" food={pageFood(2)}>
      <SectionIntro eyebrow={doctors.pill} title={doctors.title} lead={doctors.lead} />
      {doctors.people.map((doctor) => {
        const rows = [
          ["Degree", doctor.degree],
          ["Regd. no.", doctor.reg_no],
          ["Started practice", doctor.practice_from],
          ["Experience", doctor.experience],
        ];
        return (
          <BlurIn key={doctor.name} delay={0.15} className="mt-10">
            <article className="grid items-center gap-8 rounded-xl border border-border bg-white p-6 md:grid-cols-[220px_1fr] md:p-8">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-lg bg-secondary">
                <Image src={doctor.image} alt={doctor.name} fill sizes="220px" className="object-cover object-[center_22%]" />
              </div>
              <div className="min-w-0">
                <p className="m-0 type-eyebrow">{doctor.designation}</p>
                <h3 className="mt-1 mb-0 font-heading text-2xl font-bold text-ink">{doctor.name}</h3>
                <dl className="mt-5 mb-0 grid gap-1 border-l border-border pl-5 sm:grid-cols-2 sm:gap-x-6">
                  {rows.map(([label, value]) => (
                    <div key={label} className="relative py-2">
                      <span aria-hidden className="absolute top-4 -left-[1.53rem] size-2.5 rounded-full border-2 border-white bg-primary sm:hidden" />
                      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</dt>
                      <dd className="m-0 mt-1 font-heading text-lg text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          </BlurIn>
        );
      })}
    </PageSection>
  );
}
