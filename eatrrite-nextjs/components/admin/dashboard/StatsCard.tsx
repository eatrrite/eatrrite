import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { StatsCardModel } from "@/types/admin/dashboard";
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
    <article className="rounded-2xl border border-border bg-card p-5 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
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
        <p className="mt-4 flex items-center gap-1 text-sm">
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
        <p className="mt-4 text-sm text-muted-foreground">{card.trendLabel}</p>
      )}
    </article>
  );
}
