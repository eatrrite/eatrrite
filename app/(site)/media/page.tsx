import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { CredentialRows } from "@/components/shared/media/CredentialRows";
import { ReadCards } from "@/components/shared/media/ReadCards";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import { pageFood } from "@/constants/home/floatingFood";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mukta Patil in the Media | Eat Rrite",
  description: "Mukta Patil's columns in The New Indian Express, talks and press coverage.",
  path: ROUTES.media,
});

// /media (brief §6.3, §5.3). Phase 1: where Mukta has been featured and spoken, and the
// online articles and interviews (links to the publishers, never their text). The reprinted
// 2019 columns, clippings and video blocks are added in Phase 2.
export default function MediaPage() {
  return (
    <>
      <PageBanner title="Media" path={ROUTES.media} />
      <PageSection tone="white" food={pageFood(2)}>
        <SectionIntro eyebrow="In the media" title="Columns, interviews and talks" lead="From her own healing to classrooms, newspapers and stages across India." />
        <div className="mt-10">
          <CredentialRows />
        </div>
      </PageSection>
      <PageSection tone="beige" food={pageFood(4)}>
        <SectionIntro eyebrow="Read" title="Online articles and interviews" />
        <div className="mt-10">
          <ReadCards />
        </div>
      </PageSection>
    </>
  );
}
