"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// A range calendar with Cancel and Apply, for inside a popover: pick a start and an end, then
// apply. A single picked day applies as a one-day range. Two months side by side from sm up.
export function RangeCalendar({
  initial,
  onApply,
  onCancel,
}: {
  initial?: DateRange;
  onApply: (range: DateRange) => void;
  onCancel: () => void;
}) {
  const twoMonths = useMediaQuery("(min-width: 640px)");
  const [draft, setDraft] = useState<DateRange | undefined>(initial);
  return (
    <>
      <Calendar
        mode="range"
        numberOfMonths={twoMonths ? 2 : 1}
        defaultMonth={draft?.from}
        selected={draft}
        onSelect={setDraft}
        className="rounded-lg bg-transparent"
      />
      <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-2.5">
        <p className="text-xs text-muted-foreground">Pick a start and end date, then apply.</p>
        <div className="flex shrink-0 items-center gap-1.5">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={!draft?.from}
            onClick={() => draft?.from && onApply({ from: draft.from, to: draft.to ?? draft.from })}
          >
            Apply
          </Button>
        </div>
      </div>
    </>
  );
}
