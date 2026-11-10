"use client";

import { Fragment } from "react";
import { useHeroSlide } from "@/components/home/hero/HeroSlideContext";
import { BrushMark } from "./BrushMark";
import { cn } from "cn";

export type HeroSlideCopy = { title: string; highlight: string };

/** Gap between one letter's reveal and the next; a full headline writes in about 2 seconds. */
export const LETTER_STEP_MS = 15;

// One size for every slide, so the headlines look alike and nothing below moves. The width is in
// ch (it grows with the font), set so each headline wraps to three lines on tablets and up. Slide 1
// is shorter copy, so it uses a tighter max-w to fill those three lines instead of leaving a gap.
// Size classes come before leading-*: tailwind-merge drops a leading-* that comes before a text-* size.
const TITLE =
  "text-[1.85rem] sm:text-[2.25rem] lg:text-[2.35rem] xl:text-[2.5rem] m-0 font-heading leading-[1.12] font-bold tracking-tight text-white";

// The hero headline for the current slide: white words, then the gold words with the brush mark.
// Each letter reveals in turn (slide up, fade in, blur clears, as the site's headings do), so the
// line seems to write itself. All headlines share one grid cell; only the current one is the H1.
export function HeroTitle({ slides }: { slides: HeroSlideCopy[] }) {
  const { active } = useHeroSlide();
  return (
    <div className="grid">
      {slides.map((slide, i) => {
        const current = i === active;
        const Tag = current ? "h1" : "p";
        const full = `${slide.title} ${slide.highlight}`;
        return (
          <Tag
            key={full}
            aria-hidden={!current}
            aria-label={current ? full : undefined}
            className={cn(
              TITLE,
              i === 0 ? "max-w-[14ch]" : "max-w-[22ch]",
              "[grid-area:1/1] self-start transition-opacity duration-500 motion-reduce:transition-none",
              current ? "hero-title-active opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <span aria-hidden>
              <Letters text={slide.title} start={0} />{" "}
              <span className="text-accent">
                <Letters text={slide.highlight} start={slide.title.length + 1} brush />
              </span>
            </span>
          </Tag>
        );
      })}
    </div>
  );
}

// Splits a line into words (never broken inside, hyphens included) and letters, each letter with
// its own delay. `start` is the letter count before this line, so the gold part follows the white.
function Letters({ text, start, brush = false }: { text: string; start: number; brush?: boolean }) {
  let index = start;
  const words = text.split(" ");
  return words.map((word, w) => {
    const last = brush && w === words.length - 1;
    const letters = [...word].map((char, c) => (
      <span key={c} className="hero-letter inline-block" style={{ animationDelay: `${index++ * LETTER_STEP_MS}ms` }}>
        {char}
      </span>
    ));
    index++; // the space after the word
    return (
      <Fragment key={`${word}-${w}`}>
        {w > 0 ? " " : null}
        <span className="inline-block whitespace-nowrap">
          {letters}
          {last ? (
            <span className="hero-letter ml-3 inline-block" style={{ animationDelay: `${index * LETTER_STEP_MS}ms` }}>
              <BrushMark width={56} className="inline-block h-[0.8em] w-auto align-[-0.05em] text-accent" />
            </span>
          ) : null}
        </span>
      </Fragment>
    );
  });
}
