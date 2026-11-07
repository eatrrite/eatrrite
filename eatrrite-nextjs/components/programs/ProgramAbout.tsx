import Image from "next/image";
import { BlurIn } from "@/components/motion/BlurIn";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import { pageFood } from "@/constants/home/floatingFood";
import { ROUTES } from "@/constants/routes";

type Program = { name: string; short: string; about: string; image: string };

// "About the Program": text with the main photo, Deccan about layout.
export function ProgramAbout({ program, pill }: { program: Program; pill: string }) {
  return (
    <PageSection tone="white" food={pageFood(5)}>
      <div className="grid items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-14">
        <div className="min-w-0">
          <SectionIntro eyebrow={pill} title={program.name} lead={program.about} />
          <BlurIn delay={0.2} className="mt-8">
            <LinkButton href={ROUTES.appointment} size="xl">Get Consultation</LinkButton>
          </BlurIn>
        </div>
        <BlurIn delay={0.12} className="relative">
          <div aria-hidden className="absolute -inset-3 rounded-xl bg-soft" />
          <Image src={program.image} alt={program.short} width={520} height={420} priority sizes="(max-width: 1024px) 100vw, 40vw" className="relative aspect-[4/3] w-full rounded-lg object-cover" />
        </BlurIn>
      </div>
    </PageSection>
  );
}
