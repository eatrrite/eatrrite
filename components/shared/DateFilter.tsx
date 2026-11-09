"use client";

import { useState } from "react";
import { CalendarDays, Check, ChevronDown, ChevronLeft, X } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { RangeCalendar } from "@/components/shared/RangeCalendar";
import { rangeLabel } from "@/components/shared/DateRangePicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "cn";

type Preset<T extends string> = { value: T; label: string };

type DateFilterProps<T extends string> = {
  presets: readonly Preset<T>[];
  /** The chosen preset; ignored while a custom range is set. */
  preset: T;
  range?: DateRange;
  onPreset: (preset: T) => void;
  onRange: (range: DateRange) => void;
  /** Accessible name, e.g. "Appointment date". */
  label: string;
};

const ITEM =
  "flex w-full cursor-pointer items-center justify-between gap-3 rounded-md py-2 pr-2 pl-2.5 text-left text-sm whitespace-nowrap outline-none hover:bg-accent focus-visible:bg-accent";

// One control for a list's date filter: the presets (All dates, Today, …) and "Custom range…",
// which opens a range calendar in the same menu. The button always shows the one filter in use,
// a preset's name or the picked dates, so two date filters can never disagree. While a custom
// range is in use, an X on the button's left (behind a thin divider) clears it back to the first
// preset (All dates), as the old separate range picker did.
export function DateFilter<T extends string>({
  presets,
  preset,
  range,
  onPreset,
  onRange,
  label,
}: DateFilterProps<T>) {
  const [open, setOpen] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const custom = Boolean(range?.from);
  const current = custom
    ? rangeLabel(range)
    : (presets.find((p) => p.value === preset)?.label ?? "");

  const toggle = (next: boolean) => {
    setOpen(next);
    if (next) setCalendar(custom); // reopening a custom range starts on its calendar
  };

  return (
    <div className="flex h-8 shrink-0 items-center rounded-lg border border-border bg-card">
      {custom ? (
        <>
          <button
            type="button"
            aria-label="Clear date range"
            className="inline-flex h-full w-8 shrink-0 cursor-pointer items-center justify-center rounded-l-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            onClick={() => onPreset(presets[0].value)}
          >
            <X className="size-3.5" />
          </button>
          <span aria-hidden className="h-4 w-px bg-border" />
        </>
      ) : null}
      <Popover open={open} onOpenChange={toggle}>
        <PopoverTrigger
          aria-label={`${label}: ${current}`}
          data-slot="select-trigger"
          data-size="sm"
          className={cn(
            "group/select flex h-full w-auto shrink-0 cursor-pointer items-center justify-between gap-1.5 py-2 pr-2.5 pl-3 text-sm whitespace-nowrap text-primary outline-none transition-colors hover:bg-card/30 focus-visible:ring-3 focus-visible:ring-ring/50",
            custom ? "rounded-r-lg" : "rounded-lg",
          )}
        >
          {custom ? (
            <CalendarDays className="size-3.5 text-muted-foreground" />
          ) : null}
          <span>{current}</span>
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-150",
              open && "rotate-180",
            )}
          />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={cn("p-1.5", calendar ? "w-auto p-0" : "w-56")}
        >
          {calendar ? (
            <>
              <button
                type="button"
                className={cn(
                  ITEM,
                  "justify-start rounded-none border-b border-border px-3 text-muted-foreground",
                )}
                onClick={() => setCalendar(false)}
              >
                <ChevronLeft className="size-4" />
                Back to presets
              </button>
              <RangeCalendar
                initial={range}
                onCancel={() => setOpen(false)}
                onApply={(picked) => {
                  onRange(picked);
                  setOpen(false);
                }}
              />
            </>
          ) : (
            <div role="menu" aria-label={label}>
              {presets.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={!custom && item.value === preset}
                  className={ITEM}
                  onClick={() => {
                    onPreset(item.value);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  {!custom && item.value === preset ? (
                    <Check className="size-4 text-primary" />
                  ) : null}
                </button>
              ))}
              <div className="my-1 h-px bg-border" />
              <button
                type="button"
                role="menuitemradio"
                aria-checked={custom}
                className={ITEM}
                onClick={() => setCalendar(true)}
              >
                <span className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-muted-foreground" />
                  {custom ? rangeLabel(range) : "Custom range…"}
                </span>
                {custom ? <Check className="size-4 text-primary" /> : null}
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
