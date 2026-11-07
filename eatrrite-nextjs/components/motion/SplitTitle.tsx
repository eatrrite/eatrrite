"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "cn";
import { easePower3Out, splitTitle } from "@/constants/motion";

const char: Variants = {
  hidden: { opacity: 0, y: `${splitTitle.yPercent}%` },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: splitTitle.duration, ease: easePower3Out },
  },
};

// Framer Motion version of the .split-title letter reveal from the PHP main.js.
// The heading is what gets observed. Letters start clipped, so they never
// count as in view on their own. `immediate` runs on load, as the PHP hero does.
export function SplitTitle({
  text,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  immediate = false,
}: {
  text: string;
  as?: "h1" | "h2";
  className?: string;
  lineClassName?: string;
  delay?: number;
  immediate?: boolean;
}) {
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        className={cn(
          "flex flex-wrap gap-x-[0.28em] gap-y-[0.05em] perspective-[400px]",
          lineClassName
        )}
        initial="hidden"
        {...(immediate
          ? { animate: "shown" }
          : {
              whileInView: "shown",
              viewport: {
                once: true,
                amount: splitTitle.amount,
                margin: splitTitle.margin,
              },
            })}
        variants={{
          shown: {
            transition: {
              delayChildren: delay,
              staggerChildren: splitTitle.stagger,
            },
          },
        }}
      >
        {text.split(/\s+/).map((word, w) => (
          <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-top">
            {Array.from(word).map((letter, c) => (
              <motion.span key={c} className="relative inline-block" variants={char}>
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
