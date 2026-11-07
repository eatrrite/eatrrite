import type { ReactNode } from "react";
import { cn } from "cn";

type DashboardCardProps = {
  children: ReactNode;
  className?: string;
};

export function DashboardCard({ children, className }: DashboardCardProps) {
  return (
    <section
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-xs",
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
};

export function DashboardCardHeader({
  icon,
  title,
  subtitle,
  action,
}: DashboardCardHeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="font-heading text-base font-bold text-foreground">
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
