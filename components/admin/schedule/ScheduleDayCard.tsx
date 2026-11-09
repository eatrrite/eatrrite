"use client";

import { Coffee, Plus } from "lucide-react";
import { ScheduleTimeSlotRow } from "@/components/admin/schedule/ScheduleTimeSlotRow";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { WEEKDAY_LABELS } from "@/constants/admin/schedule/weekdays";
import type { DaySchedule, ScheduleTimeSlot } from "@/types/admin/schedule";
import { openHours } from "@/utils/admin/scheduleHours";
import { cn } from "cn";

type ScheduleDayCardProps = {
  day: DaySchedule;
  onToggle: (isOpen: boolean) => void;
  onAddSlot: () => void;
  onChangeSlot: (
    slotId: string,
    patch: Partial<Omit<ScheduleTimeSlot, "id">>,
  ) => void;
  onRemoveSlot: (slotId: string) => void;
};

export function ScheduleDayCard({
  day,
  onToggle,
  onAddSlot,
  onChangeSlot,
  onRemoveSlot,
}: ScheduleDayCardProps) {
  const label = WEEKDAY_LABELS[day.day];
  const hours = day.isOpen ? openHours(day.slots) : null;

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card p-4 transition-[border-color,box-shadow] duration-300 sm:p-5",
        day.isOpen
          ? "border-border/80 shadow-[0_14px_40px_-28px_rgba(1,78,78,0.35)] hover:border-primary/20"
          : "border-dashed border-border bg-card/70",
      )}
    >
      {/* Open days carry a teal edge; closed days stay quiet. */}
      {day.isOpen ? <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-primary" /> : null}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden
            className={cn(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-xl font-heading text-sm font-bold",
              day.isOpen ? "bg-primary text-accent" : "bg-muted text-muted-foreground",
            )}
          >
            {label.slice(0, 2)}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <h3 className={cn("font-heading text-lg font-bold", day.isOpen ? "text-ink" : "text-muted-foreground")}>
                {label}
              </h3>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                  day.isOpen ? "bg-accent-green/15 text-primary" : "bg-muted text-muted-foreground",
                )}
              >
                <span aria-hidden className={cn("size-1.5 rounded-full", day.isOpen ? "bg-accent-green" : "bg-muted-foreground/50")} />
                {day.isOpen ? "Open" : "Closed"}
              </span>
            </div>
            {hours ? <p className="mt-0.5 text-xs text-muted-foreground">{hours}</p> : null}
          </div>
        </div>
        <Switch
          checked={day.isOpen}
          onCheckedChange={onToggle}
          aria-label={`${label} open`}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 space-y-2.5">
          {day.isOpen ? (
            day.slots.map((slot) => (
              <ScheduleTimeSlotRow
                key={slot.id}
                day={day.day}
                slot={slot}
                canRemove={day.slots.length > 1}
                onChange={onChangeSlot}
                onRemove={onRemoveSlot}
              />
            ))
          ) : (
            <div className="flex items-center gap-3 rounded-xl bg-muted/40 px-4 py-4 text-sm text-muted-foreground">
              <Coffee className="size-4 shrink-0" />
              Consultations are closed on {label}.
            </div>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0 gap-1.5 self-start"
          disabled={!day.isOpen}
          onClick={onAddSlot}
        >
          <Plus className="size-3.5" />
          Add Time Slot
        </Button>
      </div>
    </article>
  );
}
