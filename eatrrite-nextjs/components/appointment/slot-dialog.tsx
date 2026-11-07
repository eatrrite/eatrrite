"use client";

import { useState } from "react";
import { cn } from "cn";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { slotsFor } from "@/lib/data/slots";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const arial = "[font-family:Arial,sans-serif]";
const iconBtn = `size-9 cursor-pointer rounded-[10px] border-0 bg-slot-icon text-[22px] leading-none text-primary disabled:cursor-default disabled:opacity-35 ${arial}`;

const startOfToday = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

// Copies calendar-modal.php and its appointment.css rules. Slots are a preview
// until Phase 4 connects real availability.
export function SlotDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (label: string) => void;
}) {
  const today = startOfToday();
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState("");

  const blanks = month.getDay();
  const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const times = day ? slotsFor(day) : [];
  const dayLabel = day?.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  const atThisMonth = month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <header className="flex items-center justify-between gap-3">
          <div>
            <p className="m-0 text-[11px] tracking-[0.08em] text-muted-foreground uppercase">Choose a slot</p>
            <DialogTitle className="m-0 font-heading text-[22px] leading-[1.2] font-bold text-primary">Date and time</DialogTitle>
          </div>
          <DialogClose className={iconBtn} aria-label="Close">×</DialogClose>
        </header>

        <div className="mt-4">
          <div className="flex items-center justify-between gap-3">
            <button type="button" className={iconBtn} aria-label="Previous month" disabled={atThisMonth} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>‹</button>
            <h3 className="m-0 text-[22px] text-primary">
              {month.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
            </h3>
            <button type="button" className={iconBtn} aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>›</button>
          </div>
          <div className="mt-3 mb-2 grid grid-cols-7 gap-1.5">
            {WEEKDAYS.map((d) => (
              <span key={d} className="text-center text-[11px] font-semibold text-slot-weekday">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: blanks }, (_, i) => <span key={`b${i}`} />)}
            {Array.from({ length: count }, (_, i) => {
              const date = new Date(month.getFullYear(), month.getMonth(), i + 1);
              const usable = date >= today && slotsFor(date).length > 0;
              const selected = day?.getTime() === date.getTime();
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!usable}
                  onClick={() => { setDay(date); setTime(""); }}
                  className={cn(
                    "h-[42px] rounded-xs border-0 bg-transparent font-semibold text-primary",
                    arial,
                    usable ? "cursor-pointer" : "cursor-default text-slot-muted",
                    date.getTime() === today.getTime() && "shadow-[inset_0_0_0_1px_var(--er-color-slot-today)]",
                    selected ? "bg-primary text-white" : usable && "hover:bg-slot-hover focus-visible:bg-slot-hover"
                  )}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-[18px] border-t border-slot-line pt-4">
          <div className="flex items-center justify-between gap-3">
            <strong className="text-primary">{dayLabel ?? "Select a date"}</strong>
            {day ? <span className="text-[13px] text-muted-foreground">{times.length} slots open</span> : null}
          </div>
          {day ? (
            <div className="mt-3 grid grid-cols-3 gap-2 min-[576px]:grid-cols-4">
              {times.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={cn(
                    "h-[42px] cursor-pointer rounded-[10px] border text-[13px] font-semibold",
                    arial,
                    t === time
                      ? "border-primary bg-primary text-white"
                      : "border-slot-border bg-white text-primary hover:border-primary hover:bg-slot-time-hover"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <footer className="mt-[18px] flex items-center justify-between gap-3">
          <DialogClose className={`h-11 cursor-pointer rounded-[10px] border-0 bg-transparent px-4 font-semibold text-text ${arial}`}>
            Cancel
          </DialogClose>
          <button
            type="button"
            disabled={!day || !time}
            onClick={() => { onConfirm(`${dayLabel} · ${time}`); onOpenChange(false); }}
            className={`h-11 min-w-[140px] cursor-pointer rounded-[10px] border-0 bg-primary px-4 font-semibold text-white disabled:cursor-default disabled:opacity-45 ${arial}`}
          >
            Confirm slot
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
