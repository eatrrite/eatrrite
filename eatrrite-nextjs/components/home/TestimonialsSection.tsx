import { BlurIn } from "@/components/motion/BlurIn";
import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import home from "@/constants/home/content.json";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

// Client stories in the Deccan Dentics reviews layout.
export function TestimonialsSection() {
  const stories = home.testimonials;
  return (
    <PageSection id="testimonials" tone="white" food={FLOATING_FOOD.testimonials}>
      <SectionIntro eyebrow={stories.pill} title={stories.title} lead={stories.lead} count={stories.items.length} />
      <BlurIn delay={0.12} className="mt-4">
        <TestimonialsCarousel />
      </BlurIn>
    </PageSection>
  );
}
