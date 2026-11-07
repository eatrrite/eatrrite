import type { Metadata } from "next";
import { DoctorsSection } from "@/components/about/DoctorsSection";
import { PageBanner } from "@/components/layout/PageBanner";

export const metadata: Metadata = {
  title: "Doctors on Board",
  description: "Meet the physician who works alongside Eat Rrite's nutrition coaching when your reports need more than food.",
};

export default function DoctorsPage() {
  return (
    <>
      <PageBanner title="Doctors on Board" />
      <DoctorsSection />
    </>
  );
}
