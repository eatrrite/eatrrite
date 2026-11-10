"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "cn";
import home from "@/constants/home/content.json";
import programs from "@/constants/programs/programs.json";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { ProgramChapter } from "./ProgramChapter";

// Sticky intro rail + scroll-triggered program chapters.
// Never put transform/filter on the sticky aside — that kills position:sticky.
export function ProgramsScroll() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const block = home.programs;

  // GSAP loads when the section is within 800px of the screen (see programsMotion.ts).
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const observer = new IntersectionObserver(
      (records) => {
        if (!records.some((record) => record.isIntersecting)) return;
        observer.disconnect();
        import("./programsMotion").then((module) => {
          if (!cancelled) cleanup = module.setupProgramsMotion(element, setActive);
        });
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={root}
      className="grid items-start gap-10 lg:grid-cols-[minmax(16rem,34rem)_minmax(0,1fr)] lg:gap-14 xl:gap-20"
    >
      <aside className="relative z-20 lg:sticky lg:top-28 lg:self-start">
        <p className="mb-0 type-eyebrow text-accent-deep">
          {block.pill}
        </p>
        <h2 className="mt-3 mb-0 font-heading text-3xl leading-tight font-bold tracking-tight text-ink sm:text-4xl">
          {block.title}
        </h2>
        <p className="mt-4 mb-0 max-w-md text-text">{block.lead}</p>

        <ol className="mt-8 mb-0 hidden gap-1 p-0 lg:grid">
          {programs.map((program, index) => (
            <li key={program.slug}>
              <button
                type="button"
                onClick={() => {
                  const el = root.current?.querySelector(`[data-index="${index}"]`);
                  el?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                  active === index
                    ? "bg-white text-primary shadow-sm"
                    : "text-text hover:bg-white/70 hover:text-ink",
                )}
              >
                <span className="font-heading text-sm font-bold tabular-nums opacity-50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium">{program.short}</span>
              </button>
            </li>
          ))}
        </ol>

        <LinkButton href={block.cta.href} size="xl" className="mt-8">
          {block.cta.label}
        </LinkButton>
      </aside>

      <div className="min-w-0 divide-y divide-border/60">
        {programs.map((program, index) => (
          <ProgramChapter key={program.slug} program={program} index={index} />
        ))}
      </div>
    </div>
  );
}
