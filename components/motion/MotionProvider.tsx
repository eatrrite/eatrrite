"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

// Honours "reduce motion", and loads Framer Motion's animation code after first paint instead of
// with the page. Scroll reveals no longer use it (see Appear.tsx); only the header and the
// floating food icons do.
const loadFeatures = () => import("@/components/motion/motionFeatures").then((module) => module.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures}>{children}</LazyMotion>
    </MotionConfig>
  );
}
