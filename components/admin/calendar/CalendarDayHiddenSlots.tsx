"use client";

import { useMemo } from "react";
import { EyeOff, Globe } from "lucide-react";
import { scheduleToWeekly } from "@/features/appointment/utils/scheduleWeekly";
import { availableTimes } from "@/features/appointment/utils/slots";
import { todayIst } from "@/features/appointment/utils/istTime";
import { useAdminStore } from "@/stores/useAdminStore";
import { formatTimeLabel } from "@/utils/admin/time";
import { cn } from "cn";

// The website's start times for one day. Tap a time to hide it from customers or show it again
// (the PHP admin's hide and show slots). Booked times are not listed: they are already taken.
export function CalendarDayHiddenSlots({ date }: { date: string }) {
  const days = useAdminStore((s) => s.days);
  const settings = useAdminStore((s) => s.settings);
  const appointments = useAdminStore((s) => s.appointments);
  const hiddenSlots = useAdminStore((s) => s.hiddenSlots);
  const toggle = useAdminStore((s) => s.toggleSlotHidden);

  const times = useMemo(() => {
    const occupied = appointments.filter((item) => item.status !== "cancelled");
    return availableTimes(date, { weekly: scheduleToWeekly(days), settings, occupied });
  }, [date, days, settings, appointments]);

  if (date < todayIst() || times.length === 0) return null;
  const isHidden = (time: string) => hiddenSlots.some((slot) => slot.date === date && slot.time === time);

  return (
    <section aria-label="Website slots" className="mt-4 shrink-0 rounded-xl border border-border/70 bg-mint/60 p-3">
      <p className="m-0 flex items-center gap-1.5 text-sm font-semibold text-ink"><Globe className="size-3.5 text-primary" />Website slots</p>
      <p className="mt-0.5 mb-2.5 text-xs text-muted-foreground">Tap a time to hide it from the booking page.</p>
      <div className="flex flex-wrap gap-1.5">
        {times.map((time) => {
          const hidden = isHidden(time);
          return (
            <button
              key={time}
              type="button"
              aria-pressed={hidden}
              title={hidden ? "Hidden: tap to show on the website" : "Shown: tap to hide from the website"}
              onClick={() => toggle(date, time)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs tabular-nums transition-colors",
                hidden ? "border-dashed border-border bg-muted text-muted-foreground line-through" : "border-primary/30 bg-card text-primary hover:border-primary hover:bg-primary hover:text-white",
              )}
            >
              {hidden ? <EyeOff className="size-3" /> : null}
              {formatTimeLabel(time)}
            </button>
          );
        })}
      </div>
    </section>
  );
}
