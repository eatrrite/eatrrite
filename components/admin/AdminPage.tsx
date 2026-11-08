"use client";

import type { ReactNode } from "react";
import { cn } from "cn";
import { HeroMotion } from "@/components/motion/FadeIn";

type AdminPageProps = {
  children: ReactNode;
  className?: string;
};

/** Shared left-aligned admin page frame (padding lives on AdminShell main). */
export function AdminPage({ children, className }: AdminPageProps) {
  return (
    <div className={cn("w-full space-y-6 text-left", className)}>
      {children}
    </div>
  );
}

type AdminMotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Page-body entrance matching `HeroMotion` defaults. */
export function AdminMotion({
  children,
  className,
  delay = 0.45,
  y = 20,
}: AdminMotionProps) {
  return (
    <HeroMotion delay={delay} y={y} className={className}>
      {children}
    </HeroMotion>
  );
}
