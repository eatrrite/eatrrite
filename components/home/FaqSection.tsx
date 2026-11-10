import Image from "next/image";
import { BlurIn } from "@/components/motion/BlurIn";
import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import home from "@/constants/home/content.json";
import { FaqPicker } from "./FaqPicker";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";

// FAQ in the reference design layout: illustration, heading with count, then the picker.
export function FaqSection() {
  const { faq } = home;
  return (
    <PageSection id="faqs" tone="white" food={FLOATING_FOOD.faq} defer>
      <div className="grid items-end gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
        <BlurIn className="mx-auto w-40 sm:w-48 lg:mx-0">
          <Image src={faq.image} alt="Mukta Patil answering common nutrition questions" width={433} height={326} sizes="192px" className="h-auto w-full mix-blend-multiply" />
        </BlurIn>
        <SectionIntro eyebrow={faq.pill} title={faq.title} count={faq.items.length} />
      </div>
      <BlurIn delay={0.12} className="mt-10">
        <FaqPicker />
      </BlurIn>
    </PageSection>
  );
}
