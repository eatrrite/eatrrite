"use client";

import { cn } from "cn";
import { EmptyState } from "@/components/shared/EmptyState";
import { displayDate, displayTime } from "@/features/appointment/utils/istTime";

// Open times for one day, from the server, so booked and held slots are hidden.
export function TimeGrid({
  date,
  times: allTimes,
  loading,
  error,
  selected,
  onSelect,
}: {
  date: string | null;
  times: Record<string, string[]>;
  loading: boolean;
  error: string;
  selected: string;
  onSelect: (time: string) => void;
}) {
  const times = date ? (allTimes[date] ?? []) : [];
  return (
    <div className="mt-4 border-t border-slot-line pt-4">
      <div className="flex items-center justify-between gap-3">
        <strong className="text-primary">{date ? displayDate(date) : "Select a date"}</strong>
        {date ? <span className="text-sm text-muted-foreground">{loading ? "Loading…" : `${times.length} slots open`}</span> : null}
      </div>
      {error ? <EmptyState size="sm" image="error" title="Slots could not load" description={error} /> : null}
      {date && !loading && !error && times.length === 0 ? (
        <EmptyState size="sm" image="slots" title="No slots on this date" description="Pick another highlighted date." />
      ) : null}
      <div className="mt-3 grid grid-cols-3 gap-2 min-[576px]:grid-cols-4">
        {times.map((time) => (
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
