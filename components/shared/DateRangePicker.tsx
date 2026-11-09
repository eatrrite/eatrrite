"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { RangeCalendar } from "@/components/shared/RangeCalendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "cn";

type DateRangePickerProps = {
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
  className?: string;
  /** Which edge of the button the calendar lines up with. */
  align?: "start" | "end";
};

export function rangeLabel(range?: DateRange) {
  if (!range?.from) return "Select date range";
  if (!range.to) return format(range.from, "LLL d, yyyy");
  return `${format(range.from, "LLL d, yyyy")} - ${format(range.to, "LLL d, yyyy")}`;
}

// "Select date range" button with a range calendar: pick a start and end, then Apply; X clears.
// Used by the dashboard and the Leads and Appointments lists.
export function DateRangePicker({
  value,
  onChange,
  className,
  align = "end",
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const empty = !value?.from;

  return (
    <div
      className={cn(
        "inline-flex h-8 shrink-0 items-center rounded-full border border-border bg-background",
        className,
      )}
    >
      {!empty ? (
        <button
          type="button"
          aria-label="Clear date range"
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-l-full text-primary transition-colors hover:bg-muted hover:text-foreground"
          onClick={() => {
            onChange(undefined);
            setOpen(false);
          }}
        >
          <X className="size-3.5" />
        </button>
      ) : null}

      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger
          className={cn(
            "inline-flex h-full cursor-pointer items-center gap-1.5 px-3 text-sm whitespace-nowrap outline-none transition-colors bg-card hover:bg-card/30 focus-visible:ring-3 focus-visible:ring-ring/50",
            empty
              ? "rounded-full text-primary"
              : "rounded-r-full text-primary",
          )}
        >
          <CalendarIcon className="size-3.5 shrink-0 text-primary" />
          <span>{rangeLabel(value)}</span>
        </PopoverTrigger>
        <PopoverContent align={align} className="w-auto p-0">
          {open ? (
            <RangeCalendar
              initial={value}
              onCancel={() => setOpen(false)}
              onApply={(range) => {
                onChange(range);
                setOpen(false);
              }}
            />
          ) : null}
        </PopoverContent>
      </Popover>
    </div>
  );
}
