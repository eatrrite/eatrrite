import { MotionConfig } from "framer-motion";
import { FloatActions } from "@/components/site/float-actions";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { TopBar } from "@/components/site/top-bar";

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
