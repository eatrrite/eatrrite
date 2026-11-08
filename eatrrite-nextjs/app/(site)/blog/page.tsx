import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { EmptyState } from "@/components/shared/EmptyState";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { PageSection } from "@/components/shared/section/PageSection";
import { pageFood } from "@/constants/home/floatingFood";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nutrition & Wellness Blog by Mukta Patil | Eat Rrite",
  description: "Nutrition research, healthy eating habits and holistic wellness tips from Eat Rrite.",
  path: ROUTES.blog,
});

// The 3 placeholder posts are removed (brief §5.1). Mukta's articles arrive here in Phase 2;
// until then the page points to her columns and interviews on /media.
export default function BlogPage() {
  return (
    <>
      <PageBanner title="Blog" path={ROUTES.blog} />
      <PageSection tone="white" food={pageFood(5)}>
        <EmptyState
          image="search"
          title="Articles are on their way"
          description="Meanwhile, read Mukta's columns and interviews."
          action={<LinkButton href={ROUTES.media}>See Mukta in the media</LinkButton>}
        />
      </PageSection>
    </>
  );
}
