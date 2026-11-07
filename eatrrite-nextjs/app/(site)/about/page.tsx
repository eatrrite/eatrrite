import type { Metadata } from "next";
import { MissionSection } from "@/components/about/MissionSection";
import { StorySection } from "@/components/about/StorySection";
import { PageBanner } from "@/components/layout/PageBanner";

export const metadata: Metadata = {
  title: "About Mukta Patil",
  description: "Meet Mukta Patil — nutritionist, speaker and founder of Eat Rrite.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" />
      <StorySection />
      <MissionSection />
    </>
  );
}
