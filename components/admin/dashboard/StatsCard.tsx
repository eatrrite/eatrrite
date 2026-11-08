import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { StatsCardModel } from "@/types/admin/dashboard";
import { ICON_TONES } from "@/constants/admin/tones";
import { cn } from "cn";

type StatsCardProps = {
  card: StatsCardModel;
};

export function StatsCard({ card }: StatsCardProps) {
  const Icon = card.icon;
  const trendUp = (card.trendPercent ?? 0) >= 0;
  const trendText =
    card.trendPercent === null
      ? null
      : `${trendUp ? "+" : ""}${card.trendPercent}%`;

  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-xs sm:p-5">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <div className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-full", ICON_TONES[card.tone])}>
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{card.label}</p>
          <p className="mt-0.5 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {card.value}
          </p>
        </div>
      </div>

      {trendText ? (
        <p className="mt-3 flex flex-wrap items-center gap-x-1 text-sm sm:mt-4">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              trendUp ? "text-primary" : "text-destructive",
            )}
          >
            {trendUp ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownRight className="size-3.5" />
            )}
            {trendText}
          </span>
          <span className="text-muted-foreground">{card.trendLabel}</span>
        </p>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground sm:mt-4">{card.trendLabel}</p>
      )}
    </article>
  );
}
