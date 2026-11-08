"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
};

function rangeLabel(range?: DateRange) {
  if (!range?.from) return "Select date range";
  if (!range.to) return format(range.from, "LLL d, yyyy");
  return `${format(range.from, "LLL d, yyyy")} - ${format(range.to, "LLL d, yyyy")}`;
}

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateRange | undefined>(value);
  const empty = !value?.from;

  const closeWithoutApply = () => {
    setDraft(value);
    setOpen(false);
  };

  return (
    <div
      className={cn(
        "inline-flex h-8 shrink-0 items-center rounded-full border border-border bg-card",
        className,
      )}
    >
      {!empty ? (
        <button
          type="button"
          aria-label="Clear date range"
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-l-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          onClick={() => {
            setDraft(undefined);
            onChange(undefined);
            setOpen(false);
          }}
        >
          <X className="size-3.5" />
        </button>
      ) : null}

      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          setDraft(value);
        }}
      >
        <PopoverTrigger
          className={cn(
            "inline-flex h-full cursor-pointer items-center gap-1.5 px-3 text-sm whitespace-nowrap outline-none transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50",
            empty
              ? "rounded-full text-muted-foreground"
              : "rounded-r-full text-foreground",
          )}
        >
          <CalendarIcon className="size-3.5 shrink-0 text-muted-foreground" />
          <span>{rangeLabel(value)}</span>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-auto p-0">
          <Calendar
            mode="range"
            numberOfMonths={2}
            defaultMonth={draft?.from ?? value?.from}
            selected={draft}
            onSelect={setDraft}
            className="rounded-lg bg-transparent"
          />
          <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-2.5">
            <p className="text-xs text-muted-foreground">
              Pick a start and end date, then apply.
            </p>
            <div className="flex shrink-0 items-center gap-1.5">
              <Button type="button" variant="ghost" size="sm" onClick={closeWithoutApply}>
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={!draft?.from}
                onClick={() => {
                  if (!draft?.from) return;
                  onChange({ from: draft.from, to: draft.to ?? draft.from });
                  setOpen(false);
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
