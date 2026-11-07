import type { Metadata } from "next";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { FloatActions } from "@/components/layout/FloatActions";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TopBar } from "@/components/layout/TopBar";

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
        <section className="er-section bg-cream text-center">
          <div className="er-container">
            <h1 className="type-section mb-5">We could not find that page</h1>
            <p className="type-lead mx-auto mb-10 max-w-[600px]">
              It may have moved. You can go back to the home page or book a consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <ButtonLink href="/">Back to Home</ButtonLink>
              <ButtonLink variant="accent" href="/appointment">Get Consultation</ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatActions />
    </>
  );
}
