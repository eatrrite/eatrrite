import type { Metadata } from "next";
import { pageMetadata } from "@/utils/seo";
import { ROUTES } from "@/constants/routes";
import { DoctorsSection } from "@/components/about/DoctorsSection";
import { PageBanner } from "@/components/layout/PageBanner";

export const metadata: Metadata = pageMetadata({
  title: "Doctors on Board | Eat Rrite",
  description: "Meet the physician who works alongside Eat Rrite's nutrition programs when your reports need more than food.",
  path: ROUTES.doctors,
});

export default function DoctorsPage() {
  return (
    <>
      <PageBanner title="Doctors on Board" path={ROUTES.doctors} parent={{ name: "About Us", path: ROUTES.about }} />
      <DoctorsSection />
    </>
  );
}
