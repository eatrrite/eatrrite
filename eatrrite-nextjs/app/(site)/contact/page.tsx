import type { Metadata } from "next";
import { ContactAside } from "@/components/contact/ContactAside";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageBanner } from "@/components/layout/PageBanner";
import { BlurIn } from "@/components/motion/BlurIn";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import { BRAND } from "@/constants/brand";
import copy from "@/constants/contact/content.json";
import { pageFood } from "@/constants/home/floatingFood";

export const metadata: Metadata = {
  title: "Contact Eat Rrite",
  description: "Get in touch with Eat Rrite to book your nutrition consultation.",
};

// Copies contact.php in the reference design contact section layout.
export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact Us" />
      <PageSection tone="white" food={pageFood(9)}>
        <SectionIntro eyebrow={copy.pill} title={copy.title} lead={copy.text} />
        <BlurIn delay={0.2}>
          <p className="mt-5 mb-0 font-heading text-4xl font-bold text-primary/15 tabular-nums sm:text-5xl">{BRAND.phone}</p>
        </BlurIn>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <BlurIn><ContactForm /></BlurIn>
          <BlurIn delay={0.1}><ContactAside /></BlurIn>
        </div>
      </PageSection>
    </>
  );
}
