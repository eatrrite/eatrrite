import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CountUp } from "@/components/admin/dashboard/CountUp";
import type { StatsCardModel } from "@/types/admin/dashboard";
import { ICON_TONES } from "@/constants/admin/tones";
import { cn } from "cn";

type StatsCardProps = {
  card: StatsCardModel;
};

// One dashboard number: tinted icon tile, the number counting up, a faint oversized icon behind,
// and a teal line drawing across the top on hover (as on the website's cards).
export function StatsCard({ card }: StatsCardProps) {
  const Icon = card.icon;
  const trendUp = (card.trendPercent ?? 0) >= 0;
  const trendText = card.trendPercent === null ? null : `${trendUp ? "+" : ""}${card.trendPercent}%`;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-4 shadow-[0_14px_40px_-28px_rgba(1,78,78,0.35)] transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_22px_46px_-26px_rgba(1,78,78,0.45)] sm:p-5">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100" />
      <Icon aria-hidden strokeWidth={1.2} className="pointer-events-none absolute -right-4 -bottom-5 size-24 text-primary/[0.05] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />

      <div className="relative flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <div className={cn("inline-flex size-11 shrink-0 items-center justify-center rounded-2xl ring-1 ring-black/5 ring-inset", ICON_TONES[card.tone])}>
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{card.label}</p>
          <p className="mt-0.5 font-heading text-[1.6rem] leading-tight font-bold tracking-tight text-ink sm:text-[2rem]">
            <CountUp value={card.value} />
          </p>
        </div>
      </div>

      {trendText ? (
        <p className="relative mt-3 flex flex-wrap items-center gap-x-1.5 text-sm sm:mt-4">
          <span className={cn("inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold", trendUp ? "bg-primary/10 text-primary" : "bg-alert-bg text-alert-text")}>
            {trendUp ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {trendText}
          </span>
          <span className="text-muted-foreground">{card.trendLabel}</span>
        </p>
      ) : (
        <p className="relative mt-3 text-sm text-muted-foreground sm:mt-4">{card.trendLabel}</p>
      )}
    </article>
  );
}
