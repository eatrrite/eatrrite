"use client";

import { Plus } from "lucide-react";
import { format } from "date-fns";
import { CalendarDayAppointmentCard } from "@/components/admin/calendar/CalendarDayAppointmentCard";
import { Button } from "@/components/ui/button";
import type { Appointment } from "@/types/admin/admin";
import { parseTimeToMinutes } from "@/utils/admin/calendarTime";

type CalendarDayDetailsPanelProps = {
  selectedDate: Date;
  appointments: Appointment[];
  patientName: (patientId: string) => string;
  canAdd: boolean;
  onAdd: () => void;
  onOpenAppointment: (appointment: Appointment) => void;
};

export function CalendarDayDetailsPanel({
  selectedDate,
  appointments,
  patientName,
  canAdd,
  onAdd,
  onOpenAppointment,
}: CalendarDayDetailsPanelProps) {
  const sorted = [...appointments].sort(
    (a, b) =>
      (parseTimeToMinutes(a.time) ?? 0) - (parseTimeToMinutes(b.time) ?? 0),
  );
  const count = sorted.length;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-heading text-base font-bold text-foreground">
            {format(selectedDate, "EEEE, d MMM yyyy")}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {count === 0
              ? "No appointments"
              : `${count} appointment${count === 1 ? "" : "s"}`}
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="shrink-0 gap-1.5 text-primary"
          disabled={!canAdd}
          onClick={onAdd}
        >
          <Plus className="size-3.5" />
          <span className="sm:hidden">Add</span>
          <span className="hidden sm:inline">Add Appointment</span>
        </Button>
      </div>

      <div className="mt-4 flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto">
        {count === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
            No appointments on this day. Add one to get started.
          </div>
        ) : (
          sorted.map((item) => (
            <CalendarDayAppointmentCard
              key={item.id}
              appointment={item}
              patientName={patientName(item.patientId)}
              onOpen={() => onOpenAppointment(item)}
            />
          ))
        )}
      </div>
    </div>
  );
}
