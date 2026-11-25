import type { Metadata } from "next";
import { pageMetadata } from "@/utils/seo";
import { ROUTES } from "@/constants/routes";
import { CredentialsSection } from "@/components/about/CredentialsSection";
import { MissionSection } from "@/components/about/MissionSection";
import { StorySection } from "@/components/about/StorySection";
import { PageBanner } from "@/components/layout/PageBanner";
import { JsonLd } from "@/components/shared/JsonLd";
import { personData } from "@/utils/structuredData";
import { getPage } from "@/features/cms/services/cmsContent";

export const metadata: Metadata = pageMetadata({
  title: "Mukta Patil: Nutritionist, Yoga Teacher & Life Coach",
  description: "Founder of Eat Rrite since 2018. Nutrition, yoga and counselling for whole-person health, online across India and abroad.",
  path: ROUTES.about,
});

export default async function AboutPage() {
  const credentials = await getPage("credentials");
  return (
    <>
      <JsonLd data={personData(credentials.articles)} />
      <PageBanner title="About Us" path={ROUTES.about} />
      <StorySection />
      <CredentialsSection />
      <MissionSection />
    </>
  );
}
