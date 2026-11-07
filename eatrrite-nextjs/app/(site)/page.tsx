import type { Metadata } from "next";
import { About } from "@/components/home/about";
import { Blog } from "@/components/home/blog";
import { Cta } from "@/components/home/cta";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Process } from "@/components/home/process";
import { Programs } from "@/components/home/programs";
import { Services } from "@/components/home/services";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChoose } from "@/components/home/why-choose";

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
