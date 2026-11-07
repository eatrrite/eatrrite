import { MotionConfig } from "framer-motion";
import { FloatActions } from "@/components/layout/FloatActions";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TopBar } from "@/components/layout/TopBar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <TopBar />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <FloatActions />
    </MotionConfig>
  );
}
