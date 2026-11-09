"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

// reference design reveal (same ease and trigger point), plus a blur that clears
// as the element slides up and fades in.
const ease = [0.22, 1, 0.36, 1] as const;

// Starts as soon as the element's top edge rises 8% above the bottom of the screen. Measuring a
// share of the element (amount) made tall blocks, like the contact page's form, wait far too long.
const viewport = { once: true, amount: 0, margin: "0px 0px -8% 0px" } as const;

type BlurInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  duration?: number;
  y?: number;
};

export function BlurIn({ delay = 0, duration = 0.7, y = 24, children, ...props }: BlurInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewport}
      transition={{ duration, delay, ease }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type BlurInItemProps = HTMLMotionProps<"li"> & { delay?: number };

// Same reveal for list items, so lists keep valid <ul>/<ol> markup.
export function BlurInItem({ delay = 0, children, ...props }: BlurInItemProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewport}
      transition={{ duration: 0.7, delay, ease }}
      {...props}
    >
      {children}
    </motion.li>
  );
}
