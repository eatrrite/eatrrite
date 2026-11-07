import type { Metadata } from "next";
import { AboutDoctors } from "@/components/about/doctors";
import { AboutMission } from "@/components/about/mission";
import { AboutStory } from "@/components/about/story";
import { PageBanner } from "@/components/site/page-banner";

export const metadata: Metadata = {
  title: "About Mukta Patil",
  description: "Meet Mukta Patil — nutritionist, speaker and founder of Eat Rrite.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" />
      <AboutStory />
      <AboutDoctors />
      <AboutMission />
    </>
  );
}
