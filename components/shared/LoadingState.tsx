import { Loader2 } from "lucide-react";
import { cn } from "cn";

// Shown while a page or card waits for the database: a spinner and one short line.
export function LoadingState({ label = "Loading…", className }: { label?: string; className?: string }) {
  return (
    <div role="status" aria-live="polite" className={cn("flex flex-col items-center justify-center gap-3 py-16 text-center", className)}>
      <Loader2 aria-hidden className="size-6 animate-spin text-primary" />
      <p className="m-0 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
