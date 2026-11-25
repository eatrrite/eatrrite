import { BlurIn } from "@/components/motion/BlurIn";
import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import { getPage } from "@/features/cms/services/cmsContent";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

// Client stories in the reference design reviews layout.
export async function TestimonialsSection() {
  const home = await getPage("home-page");
  const stories = home.testimonials;
  return (
    <PageSection id="testimonials" tone="beige" food={FLOATING_FOOD.testimonials} defer>
      <SectionIntro eyebrow={stories.pill} title={stories.title} lead={stories.lead} count={stories.items.length} />
      <BlurIn delay={0.12} className="mt-4">
        <TestimonialsCarousel items={stories.items} />
      </BlurIn>
    </PageSection>
  );
}
