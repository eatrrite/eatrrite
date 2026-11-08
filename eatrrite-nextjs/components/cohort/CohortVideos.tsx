import { BlurInItem } from "@/components/motion/BlurIn";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import copy from "@/constants/cohort/content.json";
import { pageFood } from "@/constants/home/floatingFood";

// cohort-videos.php: three client video stories. Each loads only its first frame until played.
export function CohortVideos() {
  const { videos } = copy;
  return (
    <PageSection tone="white" food={pageFood(4)}>
      <SectionIntro eyebrow={videos.pill} title={videos.title} lead={videos.lead} center />
      <ul className="mt-10 mb-0 grid gap-6 p-0 md:grid-cols-3">
        {videos.items.map((src, index) => (
          <BlurInItem key={src} delay={0.05 + index * 0.06} className="list-none overflow-hidden rounded-lg border border-border bg-black">
            <video src={src} controls playsInline preload="metadata" title="Client story" className="aspect-[9/16] w-full object-cover" />
          </BlurInItem>
        ))}
      </ul>
    </PageSection>
  );
}
