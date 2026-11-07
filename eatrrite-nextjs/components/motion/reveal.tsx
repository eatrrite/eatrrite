"use client";

import { motion } from "framer-motion";
import { easePower3Out, revealPresets, type RevealPreset } from "@/lib/motion";

// Framer Motion version of revealOnEnter() from the PHP main.js.
// It animates this wrapper, so hover transforms on the child keep working.
// `immediate` runs on load instead of on scroll, as the PHP hero does.
export function Reveal({
  children,
  className,
  preset = "default",
  y,
  duration,
  delay = 0,
  immediate = false,
}: {
  children: React.ReactNode;
  className?: string;
  preset?: RevealPreset;
  y?: number;
  duration?: number;
  delay?: number;
  immediate?: boolean;
}) {
  const p = revealPresets[preset];
  const shown = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: y ?? p.y }}
      {...(immediate
        ? { animate: shown }
        : {
            whileInView: shown,
            viewport: { once: true, amount: p.amount, margin: p.margin },
          })}
      transition={{ duration: duration ?? p.duration, delay, ease: easePower3Out }}
    >
      {children}
    </motion.div>
  );
}
