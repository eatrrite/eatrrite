import { cn } from "cn";
import { CountUp } from "@/components/admin/dashboard/CountUp";

type AdminStatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
};

export function AdminStatCard({ label, value, hint, className }: AdminStatCardProps) {
  return (
    <div className={cn("group relative min-w-0 overflow-hidden rounded-2xl border border-border/80 bg-card p-4 shadow-[0_14px_40px_-28px_rgba(1,78,78,0.35)] transition-[translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/25 sm:p-5", className)}>
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100" />
      <p className="text-[11px] font-semibold tracking-[0.08em] text-primary/70 uppercase">
        {label}
      </p>
      <p className="mt-2 font-heading text-3xl font-bold text-ink">
        <CountUp value={String(value)} />
      </p>
      {hint ? (
        <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
