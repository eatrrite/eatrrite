"use client";

import type { ReactNode } from "react";
import { HeroMotion } from "@/components/motion/FadeIn";

type AdminPageHeaderProps = {
  eyebrow?: string;
  lead?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
};

/** Shared admin page title row; pass actions as `children`. */
export function AdminPageHeader({
  eyebrow,
  lead,
  title,
  description,
  children,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div className="min-w-0">
        {eyebrow ? (
          <HeroMotion delay={0.05}>
            <p className="type-eyebrow">
              {eyebrow}
            </p>
          </HeroMotion>
        ) : null}
        {lead ? (
          <HeroMotion delay={eyebrow ? 0.12 : 0.05}>
            <div className="font-heading text-lg text-muted-foreground sm:text-xl">
              {lead}
            </div>
          </HeroMotion>
        ) : null}
        <HeroMotion delay={eyebrow || lead ? 0.18 : 0.05}>
          <h2 className="mt-1 font-heading text-[1.75rem] leading-tight font-bold tracking-tight text-ink sm:text-[2.15rem]">
            {title}
          </h2>
        </HeroMotion>
        {/* The gold rule the website and emails put under a heading. */}
        <HeroMotion delay={eyebrow || lead ? 0.24 : 0.1}>
          <span aria-hidden className="mt-3 block h-[3px] w-12 rounded-full bg-accent" />
        </HeroMotion>
        {description ? (
          <HeroMotion delay={0.28}>
            <div className="mt-2 max-w-2xl text-muted-foreground">
              {description}
            </div>
          </HeroMotion>
        ) : null}
      </div>
      {children ? (
        <HeroMotion delay={0.28} className="w-full shrink-0 xl:w-auto">
          {children}
        </HeroMotion>
      ) : null}
    </div>
  );
}
