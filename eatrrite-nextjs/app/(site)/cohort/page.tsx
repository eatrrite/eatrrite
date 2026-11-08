import type { Metadata } from "next";
import { pageMetadata } from "@/utils/seo";
import { CohortCompare } from "@/components/cohort/CohortCompare";
import { CohortConsult } from "@/components/cohort/CohortConsult";
import { CohortCta } from "@/components/cohort/CohortCta";
import { CohortFaq } from "@/components/cohort/CohortFaq";
import { CohortFit } from "@/components/cohort/CohortFit";
import { CohortGuide } from "@/components/cohort/CohortGuide";
import { CohortHero } from "@/components/cohort/CohortHero";
import { CohortSticky } from "@/components/cohort/CohortSticky";
import { CohortVideos } from "@/components/cohort/CohortVideos";
import copy from "@/constants/cohort/content.json";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = pageMetadata({
  title: "Lifestyle Reversal Cohort | Eat Rrite",
  description: "Apply for Eat Rrite's women's hormonal health and lifestyle reversal cohort. ₹800 consultation. 10 spots.",
  path: ROUTES.cohort,
});

// Copies cohort.php: a landing page (not in the menu) that books the ₹800 consultation.
// The booking buttons open the normal booking page instead of a modal.
export default function CohortPage() {
  return (
    <>
      <CohortHero />
      <CohortFit />
      <CohortCompare />
      <CohortGuide />
      <CohortConsult />
      <CohortVideos />
      <CohortCta copy={copy.investment} food={6} />
      <CohortFaq />
      <CohortCta id="apply" copy={copy.cta} food={7} />
      <CohortSticky />
    </>
  );
}
