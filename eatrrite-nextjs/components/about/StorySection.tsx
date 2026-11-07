import Image from "next/image";
import { BlurIn } from "@/components/motion/BlurIn";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import about from "@/constants/about/content.json";
import { pageFood } from "@/constants/home/floatingFood";

// Our story in the Deccan Dentics about layout: text 3fr, photo 2fr.
export function StorySection() {
  const { story } = about;
  return (
    <PageSection tone="white" food={pageFood(1)}>
      <div className="grid items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-14">
        <div className="min-w-0">
          <SectionIntro eyebrow={story.pill} title={story.title} />
          {story.paragraphs.map((paragraph, index) => (
            <BlurIn key={paragraph} delay={0.15 + index * 0.05}>
              <p className="mt-4 mb-0 max-w-xl text-text">{paragraph}</p>
            </BlurIn>
          ))}
        </div>
        <BlurIn delay={0.12} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div aria-hidden className="absolute -inset-3 rounded-xl bg-soft" />
          <Image src={story.image} alt="Mukta Patil" width={934} height={1046} sizes="(max-width: 1024px) 384px, 40vw" priority className="relative aspect-[4/5] w-full rounded-lg object-cover" />
        </BlurIn>
      </div>
    </PageSection>
  );
}
