import { MotionProvider } from "@/components/motion/MotionProvider";
import { FloatActions } from "@/components/layout/FloatActions";
import { getCollection } from "@/features/cms/services/cmsContent";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TopBar } from "@/components/layout/TopBar";
import { LazyToaster } from "@/components/ui/LazyToaster";
import { JsonLd } from "@/components/shared/JsonLd";
import { organizationData } from "@/utils/structuredData";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const programs = await getCollection("programs");
  return (
    <MotionProvider>
      <JsonLd data={organizationData()} />
      <TopBar />
      <SiteHeader />
      <main>{children}</main>
      {/* Bottom padding on phones keeps the footer clear of the sticky WhatsApp / Book bar. */}
      <div className="pb-20 lg:pb-0">
        <SiteFooter />
      </div>
      <FloatActions programs={programs.map(({ slug, short }) => ({ slug, short }))} />
      <GoogleAnalytics />
      {/* Offsets keep toasts clear of the sticky header (top), the WhatsApp button (desktop) and the bottom bar (phones). */}
      <LazyToaster offset={{ top: 96, right: 92, bottom: 24 }} mobileOffset={{ top: 96, left: 16, right: 16, bottom: 88 }} />
    </MotionProvider>
  );
}
