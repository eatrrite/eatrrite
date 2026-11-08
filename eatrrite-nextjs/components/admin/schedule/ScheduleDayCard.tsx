"use client";

import { Coffee, Plus } from "lucide-react";
import { ScheduleTimeSlotRow } from "@/components/admin/schedule/ScheduleTimeSlotRow";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { WEEKDAY_LABELS } from "@/constants/admin/schedule/weekdays";
import type { DaySchedule, ScheduleTimeSlot } from "@/types/admin/schedule";
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

  return (
    <article className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2.5">
          <h3 className="font-heading text-base font-bold text-foreground">
            {label}
          </h3>
          <span
            className={cn(
              "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
              day.isOpen
                ? "bg-accent-green/15 text-primary"
                : "bg-muted text-muted-foreground",
            )}
          >
            {day.isOpen ? "Open" : "Closed"}
          </span>
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
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-muted/40 px-4 py-5 text-sm text-muted-foreground">
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
