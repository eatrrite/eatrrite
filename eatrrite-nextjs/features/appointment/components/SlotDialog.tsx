"use client";

import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { todayIst } from "@/features/appointment/utils/istTime";
import type { BookingSlot } from "@/features/appointment/types/booking";
import { CalendarGrid } from "./CalendarGrid";
import { TimeGrid } from "./TimeGrid";

const iconButton =
  "size-9 cursor-pointer rounded-xs bg-slot-icon text-xl leading-none text-primary disabled:cursor-default disabled:opacity-35";

// Date and time picker, copying calendar-modal.php.
export function SlotDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (slot: BookingSlot) => void;
}) {
  const [today] = useState(todayIst);
  const [month, setMonth] = useState({ year: Number(today.slice(0, 4)), month: Number(today.slice(5, 7)) - 1 });
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState("");
  const atFirstMonth = `${month.year}-${String(month.month + 1).padStart(2, "0")}` === today.slice(0, 7);
  const label = new Date(Date.UTC(month.year, month.month, 1)).toLocaleDateString("en-IN", { month: "long", year: "numeric", timeZone: "UTC" });
  const shift = (by: number) => {
    const next = new Date(Date.UTC(month.year, month.month + by, 1));
    setMonth({ year: next.getUTCFullYear(), month: next.getUTCMonth() });
  };
  const pickDate = (value: string) => {
    setDate(value);
    setTime("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="block max-h-[calc(100vh-32px)] w-[min(560px,calc(100%-24px))] max-w-none overflow-auto rounded-md p-5 text-base sm:max-w-none"
      >
        <header className="flex items-center justify-between gap-3">
          <div>
            <p className="m-0 text-xs tracking-[0.08em] text-muted-foreground uppercase">Choose a slot</p>
            <DialogTitle className="m-0 font-heading text-2xl font-bold text-primary">Date and time</DialogTitle>
          </div>
          <DialogClose className={iconButton} aria-label="Close">×</DialogClose>
        </header>
        <div className="mt-4 flex items-center justify-between gap-3">
          <button type="button" className={iconButton} aria-label="Previous month" disabled={atFirstMonth} onClick={() => shift(-1)}>‹</button>
          <h3 className="m-0 text-xl text-primary">{label}</h3>
          <button type="button" className={iconButton} aria-label="Next month" onClick={() => shift(1)}>›</button>
        </div>
        <CalendarGrid year={month.year} month={month.month} selected={date} onSelect={pickDate} />
        <TimeGrid date={date} selected={time} onSelect={setTime} />
        <footer className="mt-4 flex items-center justify-between gap-3">
          <DialogClose className="h-11 cursor-pointer rounded-xs px-4 font-semibold text-text">Cancel</DialogClose>
          <button
            type="button"
            disabled={!date || !time}
            onClick={() => date && (onConfirm({ date, time }), onOpenChange(false))}
            className="h-11 min-w-36 cursor-pointer rounded-xs bg-primary px-4 font-semibold text-white disabled:cursor-default disabled:opacity-45"
          >
            Confirm slot
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
