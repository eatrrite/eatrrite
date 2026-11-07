import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { SplitTitle } from "@/components/motion/split-title";
import { PackageGrid } from "@/components/programs/package-grid";
import { ButtonLink } from "@/components/site/button-link";
import { PageBanner } from "@/components/site/page-banner";
import { SectionHeading, SectionPill } from "@/components/site/section-heading";
import inner from "@/lib/data/inner.json";
import programs from "@/lib/data/programs.json";

// All four slugs are prerendered by generateStaticParams, so no loading state is needed.
export const instant = false;

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => programs.find((p) => p.slug === slug);

export function generateStaticParams() {
  return programs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const program = find((await params).slug);
  return program ? { title: program.name, description: program.summary } : {};
}

// Real sizes: PHP lets each image keep its natural proportions, above a minimum height.
const imageSizes: Record<string, [number, number]> = {
  "/images/hero/healthy-plate.jpg": [1400, 953],
  "/images/hero/salad.jpg": [1400, 933],
  "/images/about/bowl.jpg": [1200, 1200],
  "/images/about/kitchen.jpg": [1400, 933],
};
const media = "relative overflow-hidden rounded-xl border border-border shadow-card";
const mediaImage = "block h-full min-h-[360px] w-full object-cover er-md:min-h-[280px]";
const split = "er-container grid grid-cols-[1.05fr_0.95fr] items-center gap-12 er-md:grid-cols-1";

// Copies program.php and .program-split. An unknown slug goes to /programs, as in PHP.
export default async function ProgramPage({ params }: Props) {
  const program = find((await params).slug);
  if (!program) redirect("/programs");
  const copy = inner.program;
  return (
    <>
      <PageBanner title={program.short} crumb="Program" />
      <section className="er-section">
        <div className={split}>
          <div>
            <SectionPill>{copy.aboutPill}</SectionPill>
            <SplitTitle
              text={program.name}
              className="mt-7 mb-5 font-heading text-[clamp(24px,2.6vw,32px)] leading-[1.2] font-semibold text-primary"
            />
            <p className="type-lead mb-6">{program.about}</p>
            <ButtonLink variant="accent" href="/appointment">Get Consultation</ButtonLink>
          </div>
          <div className={media}>
            <Image src={program.image} alt={program.short} width={520} height={420} priority sizes="(max-width: 980px) 100vw, 560px" className={mediaImage} />
          </div>
        </div>
      </section>
      <section className="er-section bg-mint">
        <div className={split}>
          <div className={media}>
            <Image
              src={program.image_secondary}
              alt={program.short}
              width={imageSizes[program.image_secondary][0]}
              height={imageSizes[program.image_secondary][1]}
              sizes="(max-width: 980px) 100vw, 610px"
              className={mediaImage}
            />
          </div>
          <div>
            <h3>{copy.benefitsTitle}</h3>
            <ul className="mb-5 grid gap-3">
              {program.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">✓ {benefit}</li>
              ))}
            </ul>
            <h3>{copy.idealTitle}</h3>
            <p>{program.ideal}</p>
          </div>
        </div>
      </section>
      <section className="er-section">
        <div className="er-container">
          <SectionHeading pill={copy.packagesPill} title={copy.packagesTitle} split={false} titleClassName="mt-7 text-primary" />
          <PackageGrid />
        </div>
      </section>
    </>
  );
}
