import type { HTMLAttributes } from "react";
import { Appear } from "@/components/motion/Appear";

// reference design reveal (same ease and trigger point), plus a blur that clears
// as the element slides up and fades in. Trigger point: revealViewport in constants/motion.ts
// (pass `viewport` to override).

type BlurInProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  duration?: number;
  y?: number;
  viewport?: { margin?: string };
};

export function BlurIn({ delay = 0, duration = 0.7, y = 24, ...props }: BlurInProps) {
  return <Appear delay={delay} duration={duration} y={y} blur={8} {...props} />;
}

type BlurInItemProps = HTMLAttributes<HTMLLIElement> & { delay?: number };

// Same reveal for list items, so lists keep valid <ul>/<ol> markup.
export function BlurInItem({ delay = 0, ...props }: BlurInItemProps) {
  return <Appear as="li" delay={delay} duration={0.7} y={24} blur={8} {...props} />;
}
