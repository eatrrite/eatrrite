import Image from "next/image";
import { BlurIn } from "@/components/motion/BlurIn";
import { FounderStats } from "@/components/home/FounderStats";
import { BrandSeal } from "@/components/shared/BrandSeal";
import { FounderBadge } from "@/components/shared/FounderBadge";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import about from "@/constants/about/content.json";
import home from "@/constants/home/content.json";
import { pageFood } from "@/constants/home/floatingFood";
import { ROUTES } from "@/constants/routes";

// Our Story in the same layout as the home Founder Spotlight (3fr text, 2fr side): story and
// photo with the brand seal and Mukta's badge on the left; her quote, the stats timeline and a
// button on the right. Copy is the site's existing text (About story, home quote and stats).
export function StorySection() {
  const { story } = about;
  const { quote, cite } = home.about;
  return (
    <PageSection tone="white" food={pageFood(1)}>
      <div className="grid items-start gap-12 lg:grid-cols-[3fr_2fr] lg:gap-14">
        <div className="min-w-0">
          <SectionIntro eyebrow={story.pill} title={story.title} eyebrowHeading />
          {story.paragraphs.map((paragraph, index) => (
            <BlurIn key={paragraph} delay={0.15 + index * 0.05}>
              <p className={index === 0 ? "mt-4 mb-0 max-w-xl text-text" : "mt-3 mb-0 max-w-xl text-text"}>{paragraph}</p>
            </BlurIn>
          ))}
          <BlurIn delay={0.25} className="relative mt-8 mb-6 max-w-md">
            <Image src={story.image} alt="Mukta Patil" width={934} height={1046} sizes="(max-width: 1024px) 100vw, 448px" priority className="aspect-[4/3] w-full rounded-lg object-cover object-top" />
            <BrandSeal className="absolute -top-5 -right-5 hidden size-24 sm:inline-flex" />
            <FounderBadge className="absolute -bottom-5 left-3 sm:left-4" />
          </BlurIn>
        </div>
        <div className="min-w-0">
          <BlurIn delay={0.12}>
            <div className="rounded-lg border border-border bg-mint p-5 sm:p-6">
              <p className="m-0 font-script text-2xl text-primary sm:text-3xl">“{quote}”</p>
              <p className="mt-3 mb-0 text-sm text-text">{cite}</p>
            </div>
          </BlurIn>
          <BlurIn delay={0.18}>
            <FounderStats />
          </BlurIn>
          <BlurIn delay={0.24} className="mt-8">
            <LinkButton href={ROUTES.appointment} size="xl">Get Consultation</LinkButton>
          </BlurIn>
        </div>
      </div>
    </PageSection>
  );
}
