"use client";

import { cn } from "cn";
import { displayDate, displayTime } from "@/utils/istTime";
import type { Slot } from "./SlotDialog";

// The "Appointment slot" button that opens the picker.
export function SlotTrigger({ slot, onOpen }: { slot: Slot | null; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "flex min-h-16 w-full cursor-pointer flex-col items-start gap-1 rounded-xs border px-4 py-2.5 text-left transition-colors hover:border-solid hover:border-primary hover:bg-white",
        slot ? "border-solid border-primary bg-white" : "border-dashed border-primary/35 bg-white/72"
      )}
    >
      <span className="type-field-label leading-normal text-text">Appointment slot</span>
      <span className={cn("leading-normal", slot ? "font-semibold text-primary" : "font-medium text-muted-foreground")}>
        {slot ? `${displayDate(slot.date)} · ${displayTime(slot.time)}` : "Select date and time"}
      </span>
    </button>
  );
}
