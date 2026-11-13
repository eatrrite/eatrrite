"use client";

import { cn } from "cn";
import { todayIst } from "@/features/appointment/utils/istTime";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const pad = (n: number) => String(n).padStart(2, "0");

// One month of days. A day is enabled when it has at least one open slot.
export function CalendarGrid({
  year,
  month,
  selected,
  open,
  onSelect,
}: {
  year: number;
  month: number;
  /** Open times by date, from the server. A day is enabled when it has at least one. */
  open: Record<string, string[]>;
  selected: string | null;
  onSelect: (date: string) => void;
}) {
  const blanks = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const today = todayIst();
  return (
    <>
      <div className="mt-3 mb-2 grid grid-cols-7 gap-1.5">
        {WEEKDAYS.map((d) => (
          <span key={d} className="text-center text-xs font-semibold text-slot-weekday">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: blanks }, (_, i) => <span key={`blank-${i}`} />)}
        {Array.from({ length: days }, (_, i) => {
          const date = `${year}-${pad(month + 1)}-${pad(i + 1)}`;
          const usable = (open[date]?.length ?? 0) > 0;
          const isSelected = date === selected;
          return (
            <button
              key={date}
              type="button"
              disabled={!usable}
              onClick={() => onSelect(date)}
              className={cn(
                "h-10 rounded-xs font-semibold text-primary transition-colors",
                usable ? "cursor-pointer hover:translate-y-[-1px] hover:border-primary hover:border" : "cursor-default text-slot-muted",
                date === today && "shadow-[inset_0_0_0_1px_var(--er-color-primary)]",
                isSelected && "bg-primary text-white hover:bg-primary"
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </>
  );
}
