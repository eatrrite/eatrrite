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

/** Reveal as soon as the element's top edge rises 8% above the bottom of the screen (same as BlurIn). */
const inViewViewport = {
  once: true,
  amount: 0,
  margin: "0px 0px -8% 0px",
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
