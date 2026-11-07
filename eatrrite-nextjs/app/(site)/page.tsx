import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { Blog } from "@/components/home/Blog";
import { Cta } from "@/components/home/Cta";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Process } from "@/components/home/Process";
import { Programs } from "@/components/home/Programs";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyChoose } from "@/components/home/WhyChoose";

export const metadata: Metadata = {
  title: "Eat Rrite | Holistic Nutrition Coaching in Hyderabad & Dehradun",
  description:
    "Eat Rrite offers science-backed, culturally-rooted nutrition coaching for weight loss, perimenopause/PMOS, diabetes, gut health and more — without crash diets.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Marquee />
      <About />
      <WhyChoose />
      <Process />
      <Programs />
      <Faq />
      <Blog />
      <Testimonials />
      <Cta />
    </>
  );
}
