import type { Metadata } from "next";
import { FloatActions } from "@/components/layout/FloatActions";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TopBar } from "@/components/layout/TopBar";
import { BlurIn } from "@/components/motion/BlurIn";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { PageSection } from "@/components/shared/section/PageSection";
import { SectionIntro } from "@/components/shared/section/SectionIntro";
import { pageFood } from "@/constants/home/floatingFood";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Page not found | Eat Rrite",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main>
        <PageSection tone="mint" food={pageFood(0)}>
          <SectionIntro eyebrow="Error 404" title="We could not find that page" lead="It may have moved. You can go back to the home page or book a consultation." count={404} center />
          <BlurIn delay={0.2} className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href={ROUTES.home} variant="outline" size="xl">Back to Home</LinkButton>
            <LinkButton href={ROUTES.appointment} size="xl">Get Consultation</LinkButton>
          </BlurIn>
        </PageSection>
      </main>
      <SiteFooter />
      <FloatActions />
    </>
  );
}
