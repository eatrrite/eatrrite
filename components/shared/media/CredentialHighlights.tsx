import { BadgeCheck, Earth, Medal, StretchHorizontal, Sparkles, type LucideIcon } from "lucide-react";
import { BlurInItem } from "@/components/motion/BlurIn";
import credentials from "@/constants/about/credentials.json";
import { cn } from "cn";

// The "Highlights" row (brief §5.2) as small tiles, one per item, each with a clear matching icon.
const ICONS: [string, LucideIcon][] = [
  ["Since", BadgeCheck],
  ["countries", Earth],
  ["Yoga", StretchHorizontal],
  ["Award", Medal],
];
const iconFor = (text: string) => ICONS.find(([word]) => text.includes(word))?.[1] ?? Sparkles;

export function CredentialHighlights({ className }: { className?: string }) {
  const items = credentials.rows[0].text.split(" · ");
  return (
    <div className={className}>
      <p className="m-0 type-eyebrow">{credentials.rows[0].label}</p>
      <ul className={cn("mt-3 mb-0 grid gap-3 p-0 sm:grid-cols-2")}>
        {items.map((item, index) => {
          const Icon = iconFor(item);
          return (
            <BlurInItem key={item} delay={0.05 + index * 0.05} className="list-none">
              <div className="flex h-full items-center gap-3 rounded-lg border border-border bg-white p-3.5 transition-shadow duration-300 hover:shadow-card">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/20 text-primary ring-1 ring-accent/50">
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                <span className="text-sm leading-snug font-semibold text-ink">{item}</span>
              </div>
            </BlurInItem>
          );
        })}
      </ul>
    </div>
  );
}
