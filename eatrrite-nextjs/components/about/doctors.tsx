import Image from "next/image";
import { SectionPill } from "@/components/shared/SectionHeading";
import about from "@/constants/about/content.json";

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs tracking-[0.08em] text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-1 font-heading text-[18px] text-primary">{value}</dd>
    </div>
  );
}

// Copies .about-doctors from pages.css.
export function AboutDoctors() {
  const { doctors } = about;
  return (
    <section className="er-section bg-mint">
      <div className="er-container">
        <div className="mb-8 max-w-[56ch]">
          <SectionPill>{doctors.pill}</SectionPill>
          <h2>{doctors.title}</h2>
          <p>{doctors.lead}</p>
        </div>
        {doctors.people.map((doctor) => (
          <article
            key={doctor.name}
            className="grid items-center gap-6 rounded-lg border border-border-hover bg-white p-6 shadow-card min-[800px]:grid-cols-[220px_1fr] min-[800px]:gap-8 min-[800px]:p-8"
          >
            <div className="relative mx-auto aspect-[4/5] w-[min(220px,70%)] overflow-hidden rounded-md min-[800px]:m-0 min-[800px]:w-[220px]">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                sizes="220px"
                className="object-cover object-[center_22%]"
              />
            </div>
            <div>
              <p className="mb-1.5 text-xs tracking-[0.12em] text-muted-foreground uppercase">
                {doctor.designation}
              </p>
              <h3 className="mb-5">{doctor.name}</h3>
              <dl className="m-0 grid gap-x-6 gap-y-3 min-[600px]:grid-cols-2">
                <Meta label="Degree" value={doctor.degree} />
                <Meta label="Regd. no." value={doctor.reg_no} />
                <Meta label="Started practice" value={doctor.practice_from} />
                <Meta label="Experience" value={doctor.experience} />
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
