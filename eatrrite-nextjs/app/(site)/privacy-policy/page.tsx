import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { PageSection } from "@/components/shared/section/PageSection";
import { pageFood } from "@/constants/home/floatingFood";
import privacy from "@/constants/legal/privacy.json";
import { ROUTES } from "@/constants/routes";
import { pageMetadata } from "@/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Eat Rrite",
  description: "What Eat Rrite collects when you book or contact us, why, who it is shared with, and how to withdraw consent or ask for deletion.",
  path: ROUTES.privacy,
});

// Brief §8.3. Every consent box links here. Mukta's lawyer checks the final wording.
export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner title="Privacy Policy" path={ROUTES.privacy} />
      <PageSection tone="white" food={pageFood(3)}>
        <div className="max-w-3xl">
          <p className="m-0 text-sm text-muted-foreground">Last updated: {privacy.updated}</p>
          <p className="mt-4 mb-0 text-text">{privacy.intro}</p>
          {privacy.sections.map((section) => (
            <section key={section.title} className="mt-10">
              <h2 className="m-0 font-heading text-2xl font-bold text-ink">{section.title}</h2>
              <ul className="mt-4 mb-0 grid gap-2 pl-5 text-text">
                {section.items.map((item) => (
                  <li key={item} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </PageSection>
    </>
  );
}
