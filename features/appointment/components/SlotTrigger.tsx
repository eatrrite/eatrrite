"use client";

import { cn } from "cn";
import { displayDate, displayTime } from "@/features/appointment/utils/istTime";
import type { BookingSlot } from "@/features/appointment/types/booking";

// The "Appointment slot" button that opens the picker.
export function SlotTrigger({ slot, onOpen }: { slot: BookingSlot | null; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "flex min-h-16 w-full cursor-pointer flex-col items-start gap-1 rounded-lg border px-3 py-2.5 text-left transition-colors hover:border-solid hover:border-primary",
        slot ? "border-solid border-primary bg-white" : "border-dashed border-primary/35 bg-white/70"
      )}
    >
      <span className="text-sm font-medium text-ink">Appointment slot</span>
      <span className={cn("text-sm", slot ? "font-semibold text-primary" : "text-muted-foreground")}>
        {slot ? `${displayDate(slot.date)} · ${displayTime(slot.time)}` : "Select date and time"}
      </span>
    </button>
  );
}
