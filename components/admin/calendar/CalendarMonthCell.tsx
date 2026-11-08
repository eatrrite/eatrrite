"use client";

import type { CalendarMonthCell as MonthCell } from "@/utils/admin/calendarMonth";
import { cn } from "cn";

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
      {dots.length > 0 ? (
        <span className="flex items-center justify-center gap-1">
          {dots.slice(0, 4).map((dotClass, index) => (
            <span
              key={`${dotClass}-${index}`}
              className={cn("size-1.5 rounded-full", dotClass)}
            />
          ))}
        </span>
      ) : (
        <span className="h-1.5" aria-hidden />
      )}
    </button>
  );
}
