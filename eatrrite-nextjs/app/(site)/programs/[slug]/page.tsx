import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageBanner } from "@/components/layout/PageBanner";
import { ProgramAbout } from "@/components/programs/ProgramAbout";
import { ProgramBenefits } from "@/components/programs/ProgramBenefits";
import { PackageCards } from "@/components/shared/PackageCards";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import { pageFood } from "@/constants/home/floatingFood";
import content from "@/constants/programs/content.json";
import programs from "@/constants/programs/programs.json";

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

// Copies program.php in the reference section style. An unknown slug goes to /programs, as in PHP.
export default async function ProgramPage({ params }: Props) {
  const program = find((await params).slug);
  if (!program) redirect("/programs");
  const copy = content.detail;
  return (
    <>
      <PageBanner title={program.short} crumb="Program" />
      <ProgramAbout program={program} pill={copy.aboutPill} />
      <ProgramBenefits program={program} benefitsTitle={copy.benefitsTitle} idealTitle={copy.idealTitle} />
      <PageSection tone="white" food={pageFood(7)}>
        <SectionIntro eyebrow={copy.packagesPill} title={copy.packagesTitle} center />
        <PackageCards />
      </PageSection>
    </>
  );
}
