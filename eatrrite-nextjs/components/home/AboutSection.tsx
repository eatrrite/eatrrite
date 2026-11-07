import Image from "next/image";
import { BlurIn } from "@/components/motion/BlurIn";
import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import home from "@/constants/home/content.json";
import { FounderStats } from "./FounderStats";
import { PageSection } from "@/components/shared/section/PageSection";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { SectionIntro } from "@/components/shared/section/SectionIntro";

// Founder spotlight in the Deccan Dentics about layout (3fr text, 2fr side).
export function AboutSection() {
  const { about } = home;
  return (
    <PageSection tone="white" food={FLOATING_FOOD.about}>
      <div className="grid items-start gap-12 lg:grid-cols-[3fr_2fr] lg:gap-14">
        <div className="min-w-0">
          <SectionIntro eyebrow={about.pill} title={about.title} lead={about.lead} />
          <BlurIn delay={0.2}>
            <p className="mt-3 mb-0 max-w-xl text-text">{about.text}</p>
          </BlurIn>
          <BlurIn delay={0.25} className="relative mt-8 max-w-md">
            <Image src={about.image} alt="Mukta Patil" width={934} height={1046} sizes="(max-width: 1024px) 100vw, 448px" className="aspect-[4/3] w-full rounded-lg object-cover object-top" />
            <Image src={about.sideImage} alt="Nourishing bowl" width={240} height={240} className="absolute -right-6 -bottom-6 hidden size-28 rounded-full border-4 border-white object-cover shadow-card sm:block" />
          </BlurIn>
        </div>
        <div className="min-w-0">
          <BlurIn delay={0.12}>
            <div className="rounded-lg border border-border bg-mint p-5 sm:p-6">
              <p className="m-0 font-script text-2xl text-primary sm:text-3xl">“{about.quote}”</p>
              <p className="mt-3 mb-0 text-sm text-text">{about.cite}</p>
            </div>
          </BlurIn>
          <BlurIn delay={0.18}>
            <FounderStats />
          </BlurIn>
          <BlurIn delay={0.24} className="mt-8">
            <LinkButton href={about.cta.href} size="xl">{about.cta.label}</LinkButton>
          </BlurIn>
        </div>
      </div>
    </PageSection>
  );
}
