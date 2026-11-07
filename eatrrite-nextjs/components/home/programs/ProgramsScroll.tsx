"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "cn";
import home from "@/constants/home/content.json";
import programs from "@/constants/programs/programs.json";
import { LinkButton } from "@/components/shared/section/LinkButton";
import { ProgramChapter } from "./ProgramChapter";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Sticky intro rail + scroll-triggered program chapters.
// Never put transform/filter on the sticky aside — that kills position:sticky.
export function ProgramsScroll() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const block = home.programs;

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const chapters = gsap.utils.toArray<HTMLElement>("[data-program-chapter]");

      chapters.forEach((chapter, index) => {
        const media = chapter.querySelector<HTMLElement>("[data-chapter-media]");
        const image = chapter.querySelector<HTMLElement>("[data-chapter-image]");
        const copy = chapter.querySelector<HTMLElement>("[data-chapter-copy]");
        if (!media || !copy) return;

        if (reduced) {
          gsap.set([media, copy], { clearProps: "all" });
        } else {
          gsap.fromTo(
            media,
            { opacity: 0, y: 56 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              overwrite: "auto",
              scrollTrigger: {
                trigger: chapter,
                start: "top 88%",
                end: "top 40%",
                toggleActions: "play none none none",
                // Catch chapters already past the start (fast scroll / refresh).
                immediateRender: false,
                onRefresh(self) {
                  if (self.progress > 0) self.animation?.progress(1);
                },
              },
            },
          );

          gsap.fromTo(
            copy,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.08,
              ease: "power3.out",
              overwrite: "auto",
              scrollTrigger: {
                trigger: chapter,
                start: "top 88%",
                end: "top 40%",
                toggleActions: "play none none none",
                immediateRender: false,
                onRefresh(self) {
                  if (self.progress > 0) self.animation?.progress(1);
                },
              },
            },
          );

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.12 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: chapter,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.7,
                },
              },
            );
          }
        }

        ScrollTrigger.create({
          trigger: chapter,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) setActive(index);
          },
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      refresh();
      window.addEventListener("load", refresh);
      const imgs = root.current?.querySelectorAll("img") ?? [];
      imgs.forEach((img) => {
        if (!img.complete) img.addEventListener("load", refresh, { once: true });
      });

      return () => window.removeEventListener("load", refresh);
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="grid items-start gap-10 lg:grid-cols-[minmax(16rem,34rem)_minmax(0,1fr)] lg:gap-14 xl:gap-20"
    >
      <aside className="relative z-20 lg:sticky lg:top-28 lg:self-start">
        <p className="mb-0 font-script text-2xl leading-none text-primary sm:text-3xl">
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
                  "flex w-full cursor-pointer items-center gap-3 rounded-[calc(var(--radius-lg)/2)] px-3 py-2.5 text-left transition-colors",
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
