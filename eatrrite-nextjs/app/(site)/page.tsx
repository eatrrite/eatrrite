import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { BlogSection } from "@/components/home/BlogSection";
import { CtaSection } from "@/components/home/CtaSection";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProgramGridSection } from "@/components/home/ProgramGridSection";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";

export const metadata: Metadata = {
  title: "Eat Rrite | Holistic Nutrition Coaching in Hyderabad & Dehradun",
  description:
    "Eat Rrite offers science-backed, culturally-rooted nutrition coaching for weight loss, perimenopause/PMOS, diabetes, gut health and more — without crash diets.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProgramsSection />
      <Marquee />
      <AboutSection />
      <WhyChooseSection />
      <ProcessSection />
      <ProgramGridSection />
      <FaqSection />
      <BlogSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
