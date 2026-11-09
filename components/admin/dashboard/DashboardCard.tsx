import type { ReactNode } from "react";
import { ICON_TONES, type IconTone } from "@/constants/admin/tones";
import { cn } from "cn";

type DashboardCardProps = {
  children: ReactNode;
  className?: string;
};

export function DashboardCard({ children, className }: DashboardCardProps) {
  return (
    <section
      className={cn(
        "relative flex h-full min-w-0 flex-col rounded-2xl border border-border/80 bg-card p-4 shadow-[0_14px_40px_-28px_rgba(1,78,78,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-primary/20 hover:shadow-[0_20px_44px_-26px_rgba(1,78,78,0.4)] sm:p-5",
        className,
      )}
    >
      {children}
    </section>
  );
}

type DashboardCardHeaderProps = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  tone?: IconTone;
};

export function DashboardCardHeader({
  icon,
  title,
  subtitle,
  action,
  tone = "teal",
}: DashboardCardHeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <span className={cn("mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-black/5 ring-inset", ICON_TONES[tone])}>
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-bold text-ink">
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
