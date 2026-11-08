"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "cn";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Reveal only after content has clearly entered the viewport. */
const inViewViewport = {
  once: true,
  amount: 0.3,
  // Shrink the root from the bottom so the trigger sits ~1/5 up the
  // screen—not at the fold where content has barely entered.
  margin: "0px 0px -20% 0px",
} as const;

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.65,
  y = 32,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewViewport}
      transition={{ duration, delay, ease }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function HeroMotion({
  children,
  className,
  delay = 0,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
