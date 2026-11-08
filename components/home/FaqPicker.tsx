"use client";

import { useState } from "react";
import { cn } from "cn";
import home from "@/constants/home/content.json";

type FaqItem = { q: string; a: string };
const pad = (n: number) => String(n).padStart(2, "0");

// Question rail on one side, answer card on the other, as in the reference FaqPicker.
export function FaqPicker({ items = home.faq.items }: { items?: FaqItem[] }) {
  const ITEMS = items;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = ITEMS[activeIndex];
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
      <div className="order-2 flex flex-col justify-center rounded-xl border border-border bg-mint p-6 sm:p-8 lg:order-none">
        <p className="m-0 type-eyebrow">Good to know</p>
        <p className="mt-2 mb-0 text-xs text-muted-foreground tabular-nums">Question {pad(activeIndex + 1)} of {pad(ITEMS.length)}</p>
        <p aria-hidden className="mt-4 mb-0 font-heading text-xl font-bold text-ink sm:text-2xl">{active.q}</p>
        <p className="mt-4 mb-0 text-sm leading-relaxed text-text sm:text-base">{active.a}</p>
      </div>
      <ol className="relative order-1 m-0 grid gap-1 border-l border-border pl-5 lg:order-none">
        {ITEMS.map((item, index) => {
          const selected = index === activeIndex;
          return (
            <li key={item.q} className="relative">
              <span aria-hidden className={cn("absolute top-1/2 -left-[1.53rem] size-2.5 -translate-y-1/2 rounded-full border-2 border-white transition-colors", selected ? "bg-primary" : "bg-border")} />
              {/* Each question is an H3 (brief §5.1); the button inside picks it. */}
              <h3 className="m-0 text-base font-normal">
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveIndex(index)}
                className={cn("flex w-full cursor-pointer items-start justify-between gap-3 rounded-md px-3 py-3 text-left transition-colors", selected ? "bg-secondary text-ink" : "text-text hover:bg-soft hover:text-ink")}
              >
                <span className="font-heading text-base leading-snug font-bold sm:text-lg">{item.q}</span>
                <span className="shrink-0 pt-1 text-xs tabular-nums opacity-60">{pad(index + 1)}</span>
              </button>
              </h3>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
