import { MotionConfig } from "framer-motion";
import { FloatActions } from "@/components/layout/FloatActions";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TopBar } from "@/components/layout/TopBar";
import { Toaster } from "@/components/ui/sonner";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <TopBar />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <FloatActions />
      {/* Offsets keep toasts clear of the sticky header (top) and the call and WhatsApp buttons (bottom right). */}
      <Toaster offset={{ top: 96, right: 92, bottom: 24 }} mobileOffset={{ top: 96, left: 16, right: 16, bottom: 152 }} />
    </MotionConfig>
  );
}
