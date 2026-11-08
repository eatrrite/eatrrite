import Image from "next/image";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { BlurIn } from "@/components/motion/BlurIn";
import { Icon } from "@/components/shared/Icon";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import copy from "@/constants/cohort/content.json";
import { pageFood } from "@/constants/home/floatingFood";

// cohort-guide.php: Mukta's photo beside her story and four checked points.
export function CohortGuide() {
  const { guide } = copy;
  return (
    <PageSection tone="white" food={pageFood(2)}>
      <div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-14">
        <BlurIn className="relative mx-auto w-full max-w-md">
          <Image src={guide.image} alt="Mukta Patil, Founder of Eat Rrite" width={934} height={1046} sizes="(max-width: 1024px) 100vw, 448px" className="aspect-[4/5] w-full rounded-lg object-cover object-top" />
          <Image src="/images/about/balanced-indian-meal-bowl.jpg" alt="Nourishing bowl" width={240} height={240} className="absolute -right-6 -bottom-6 hidden size-28 rounded-full border-4 border-white object-cover shadow-card sm:block" />
        </BlurIn>
        <div className="min-w-0">
          <SectionIntro eyebrow={guide.pill} title={guide.title} lead={guide.text} />
          <BlurIn delay={0.2}>
            <ul className="mt-6 mb-0 grid gap-3 p-0">
              {guide.points.map((point) => (
                <li key={point} className="flex list-none gap-3 text-text">
                  <span className="pt-0.5 text-primary"><Icon icon={faCheck} /></span>
                  {point}
                </li>
              ))}
            </ul>
          </BlurIn>
        </div>
      </div>
    </PageSection>
  );
}
