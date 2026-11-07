import type { Metadata } from "next";
import { AboutDoctors } from "@/components/about/Doctors";
import { AboutMission } from "@/components/about/Mission";
import { AboutStory } from "@/components/about/Story";
import { PageBanner } from "@/components/layout/PageBanner";

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
