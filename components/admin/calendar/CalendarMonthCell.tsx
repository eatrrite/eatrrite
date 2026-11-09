"use client";

import type { CalendarMonthCell as MonthCell } from "@/utils/admin/calendarMonth";
import { cn } from "cn";

const MAX_DOTS = 8;

type CalendarMonthCellProps = {
  cell: MonthCell;
  dots: string[];
  onSelect: (date: Date) => void;
};

export function CalendarMonthCell({
  cell,
  dots,
  onSelect,
}: CalendarMonthCellProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(cell.date)}
      className={cn(
        "flex h-full min-h-0 flex-col items-center gap-1 rounded-xl border border-transparent p-1 transition-colors sm:gap-1.5 sm:p-1.5",
        cell.isSelected && "bg-primary/5",
        !cell.isSelected && "hover:bg-mint",
      )}
    >
      <span
        className={cn(
          "inline-flex size-6 items-center justify-center rounded-full text-xs font-medium sm:size-8 sm:text-sm",
          !cell.inCurrentMonth && "text-muted-foreground/45",
          cell.inCurrentMonth && !cell.isSelected && "text-foreground",
          cell.isSelected && "bg-primary text-primary-foreground",
          cell.isToday && !cell.isSelected && "ring-1 ring-primary/40",
        )}
      >
        {cell.dayNumber}
      </span>
      {/* One dot per appointment, up to two rows of four: a full day (7 under the booking
          rules) shows every dot. The two-row space is always kept, so all cells line up. */}
      <span className="flex h-4 max-w-9 flex-wrap content-start justify-center gap-1">
        {dots.slice(0, MAX_DOTS).map((dotClass, index) => (
          <span key={`${dotClass}-${index}`} className={cn("size-1.5 rounded-full", dotClass)} />
        ))}
      </span>
      {dots.length > 0 ? <span className="sr-only">{dots.length} appointments</span> : null}
    </button>
  );
}
