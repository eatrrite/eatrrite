import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import home from "@/constants/home/content.json";
import { faqData } from "@/utils/structuredData";
import { pageMetadata } from "@/utils/seo";
import { ROUTES } from "@/constants/routes";
import { AboutSection } from "@/components/home/AboutSection";
import { CredentialsStrip } from "@/components/home/CredentialsStrip";
import { CtaSection } from "@/components/home/CtaSection";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProgramGridSection } from "@/components/home/ProgramGridSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";

export const metadata: Metadata = pageMetadata({
  title: "Eat Rrite | Holistic Nutrition Coaching in Hyderabad & Dehradun",
  description: "Online nutrition coaching with the Indian food you already eat. Weight, diabetes, gut, PMOS and perimenopause care with Mukta Patil.",
  path: ROUTES.home,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqData(home.faq.items)} />
      <Hero />
      <CredentialsStrip />
      <AboutSection />
      <Marquee />
      <ProgramGridSection />
      <WhyChooseSection />
      <ProcessSection />
      <FaqSection />
      {/* Blog section hidden until the Media articles are live (brief §5.1). */}
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
