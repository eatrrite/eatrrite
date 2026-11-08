import { MotionConfig } from "framer-motion";
import { FloatActions } from "@/components/layout/FloatActions";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TopBar } from "@/components/layout/TopBar";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/shared/JsonLd";
import { organizationData } from "@/utils/structuredData";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <JsonLd data={organizationData()} />
      <TopBar />
      <SiteHeader />
      <main>{children}</main>
      {/* Bottom padding on phones keeps the footer clear of the sticky WhatsApp / Book bar. */}
      <div className="pb-20 lg:pb-0">
        <SiteFooter />
      </div>
      <FloatActions />
      {/* Offsets keep toasts clear of the sticky header (top), the WhatsApp button (desktop) and the bottom bar (phones). */}
      <Toaster offset={{ top: 96, right: 92, bottom: 24 }} mobileOffset={{ top: 96, left: 16, right: 16, bottom: 88 }} />
    </MotionConfig>
  );
}
