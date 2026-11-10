import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { cn } from "cn";
import credentials from "@/constants/about/credentials.json";

// Mukta's profile badge over her photo on Home and About. Compact beige plate so it
// sits as a premium caption, not a full-width bar across the image. The Eat Rrite logo mark
// sits on a white disc with a gold ring, so its colours stand out on the beige plate.
export function FounderBadge({ className }: { className?: string }) {
  const { badge } = credentials;
  return (
    <div
      className={cn(
        "inline-flex w-fit max-w-[min(calc(100%-1.5rem),17.5rem)] items-center gap-2.5 rounded-xl border border-accent/50 bg-beige py-2 pr-3 pl-2 shadow-[0_12px_28px_-14px_rgba(1,78,78,0.35)] sm:max-w-[19rem] sm:gap-3 sm:rounded-2xl sm:py-2.5 sm:pr-3.5 sm:pl-2.5",
        className,
      )}
    >
      <span
        aria-hidden
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white p-1.5 shadow-xs ring-2 ring-accent/50 sm:size-12"
      >
        <Image src="/images/logo/logo-mark.png" alt="" width={96} height={80} className="h-auto w-full object-contain" />
      </span>
      <span className="min-w-0">
        <span className="flex min-w-0 items-center gap-1 sm:gap-1.5">
          <span className="truncate font-heading text-sm font-bold text-ink sm:text-[15px]">
            {badge.name}
          </span>
          <BadgeCheck
            aria-label="Verified"
            className="size-4 shrink-0 fill-primary text-white sm:size-5"
          />
        </span>
        <span className=" block truncate text-[10px] leading-snug text-muted-foreground sm:text-[11px]">
          <span className="sm:hidden">{badge.note.split(",")[0]}</span>
          <span className="hidden sm:inline">{badge.note}</span>
        </span>
        <span className=" block truncate text-[11px] leading-snug text-text/80 sm:text-xs">
          {badge.role}
        </span>
      </span>
    </div>
  );
}
