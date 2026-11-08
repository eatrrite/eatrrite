import Image from "next/image";
import { BlurIn } from "@/components/motion/BlurIn";
import { FaqPicker } from "@/components/home/FaqPicker";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import copy from "@/constants/cohort/content.json";
import { pageFood } from "@/constants/home/floatingFood";

// cohort-faq.php, in the home FAQ layout.
export function CohortFaq() {
  const { faq } = copy;
  return (
    <PageSection id="faqs" tone="white" food={pageFood(5)}>
      <div className="grid items-end gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
        <BlurIn className="mx-auto w-40 sm:w-48 lg:mx-0">
          <Image src={faq.image} alt="Mukta Patil answering common nutrition questions" width={433} height={326} sizes="192px" className="h-auto w-full mix-blend-multiply" />
        </BlurIn>
        <SectionIntro eyebrow={faq.pill} title={faq.title} count={faq.items.length} />
      </div>
      <BlurIn delay={0.12} className="mt-10">
        <FaqPicker items={faq.items} />
      </BlurIn>
    </PageSection>
  );
}
