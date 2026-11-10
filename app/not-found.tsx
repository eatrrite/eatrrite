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
import { whatsappLink } from "@/constants/whatsapp";
import { Button } from "@/components/ui/button";

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
        <PageSection tone="beige" food={pageFood(0)}>
          <SectionIntro eyebrow="Error 404" title="This page has moved" lead="Find what you need in our programs, book a consultation, or message us on WhatsApp." count={404} center />
          <BlurIn delay={0.2} className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href={ROUTES.programs} variant="outline" size="xl">Programs</LinkButton>
            <LinkButton href={ROUTES.appointment} size="xl">Book a Consultation</LinkButton>
            <Button variant="outline" size="xl" nativeButton={false} render={<a href={whatsappLink("Hi, I followed a link to your website that has moved.")} target="_blank" rel="noopener" />}>
              WhatsApp
            </Button>
          </BlurIn>
        </PageSection>
      </main>
      <SiteFooter />
      <FloatActions />
    </>
  );
}
