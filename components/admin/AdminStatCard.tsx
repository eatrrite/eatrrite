type AdminStatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
};

export function AdminStatCard({ label, value, hint }: AdminStatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-heading text-3xl font-bold text-foreground">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
