import type { ReactNode } from "react";
import { cn } from "cn";

type CalendarPanelProps = {
  children: ReactNode;
  className?: string;
};

/** Shared white card shell for calendar left/right panels. */
export function CalendarPanel({ children, className }: CalendarPanelProps) {
  return (
    <section
      className={cn(
        "flex min-h-0 flex-col rounded-2xl border border-border bg-card p-4 shadow-xs sm:p-5",
        className,
      )}
    >
      {children}
    </section>
  );
}
