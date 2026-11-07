"use client";

import { Trash2 } from "lucide-react";
import { TimeSelect } from "@/components/admin/forms/TimeSelect";
import { Button } from "@/components/ui/button";
import type { ScheduleTimeSlot, Weekday } from "@/types/admin/admin";

type ScheduleTimeSlotRowProps = {
  day: Weekday;
  slot: ScheduleTimeSlot;
  canRemove: boolean;
  onChange: (
    slotId: string,
    patch: Partial<Omit<ScheduleTimeSlot, "id">>,
  ) => void;
  onRemove: (slotId: string) => void;
};

export function ScheduleTimeSlotRow({
  day,
  slot,
  canRemove,
  onChange,
  onRemove,
}: ScheduleTimeSlotRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <div className="min-w-[8.5rem] flex-1 sm:max-w-[11rem]">
        <TimeSelect
          id={`${day}-${slot.id}-open`}
          value={slot.openTime}
          onChange={(openTime) => onChange(slot.id, { openTime })}
        />
      </div>
      <span className="text-sm text-muted-foreground">–</span>
      <div className="min-w-[8.5rem] flex-1 sm:max-w-[11rem]">
        <TimeSelect
          id={`${day}-${slot.id}-close`}
          value={slot.closeTime}
          onChange={(closeTime) => onChange(slot.id, { closeTime })}
        />
      </div>
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label="Remove time slot"
        disabled={!canRemove}
        onClick={() => onRemove(slot.id)}
      >
        <Trash2 className="size-3.5 text-destructive" />
      </Button>
    </div>
  );
}
