"use client";

import { cn } from "cn";
import { useSlotTimes } from "@/features/appointment/hooks/useSlotTimes";
import { displayDate, displayTime } from "@/features/appointment/utils/istTime";

// Open times for one day, loaded from the server so taken slots are hidden.
export function TimeGrid({
  date,
  selected,
  onSelect,
}: {
  date: string | null;
  selected: string;
  onSelect: (time: string) => void;
}) {
  const { loading, times } = useSlotTimes(date);
  const meta = loading ? "Loading…" : times === null ? "" : `${times.length} slots open`;
  return (
    <div className="mt-4 border-t border-slot-line pt-4">
      <div className="flex items-center justify-between gap-3">
        <strong className="text-primary">{date ? displayDate(date) : "Select a date"}</strong>
        {date ? <span className="text-sm text-muted-foreground">{meta}</span> : null}
      </div>
      {times === null ? (
        <p className="mt-3 mb-0 text-sm text-muted-foreground">Unable to load available slots.</p>
      ) : null}
      {date && !loading && times?.length === 0 ? (
        <p className="mt-3 mb-0 text-sm text-muted-foreground">No consultation slots on this date.</p>
      ) : null}
      <div className="mt-3 grid grid-cols-3 gap-2 min-[576px]:grid-cols-4">
        {(times ?? []).map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => onSelect(time)}
            className={cn(
              "h-10 cursor-pointer rounded-xs border text-sm font-semibold transition-colors",
              time === selected
                ? "border-primary bg-primary text-white"
                : "border-slot-border bg-white text-primary hover:border-primary hover:bg-slot-time-hover"
            )}
          >
            {displayTime(time)}
          </button>
        ))}
      </div>
    </div>
  );
}
