"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { CalendarDayAppointmentCard } from "@/components/admin/calendar/CalendarDayAppointmentCard";
import { CalendarDayHiddenSlots } from "@/components/admin/calendar/CalendarDayHiddenSlots";
import { toDateValue } from "@/utils/admin/date";
import { Button } from "@/components/ui/button";
import type { Appointment } from "@/types/admin/appointment";
import { parseTimeToMinutes } from "@/utils/admin/calendarTime";

type CalendarDayDetailsPanelProps = {
  selectedDate: Date;
  appointments: Appointment[];
  leadName: (leadId: string) => string;
  canAdd: boolean;
  onAdd: () => void;
  onOpenAppointment: (appointment: Appointment) => void;
};

export function CalendarDayDetailsPanel({
  selectedDate,
  appointments,
  leadName,
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
      {/* Teal band with the chosen day, like the website's banners. */}
      <div className="relative -mx-4 -mt-4 flex shrink-0 items-center justify-between gap-3 overflow-hidden bg-linear-to-br from-primary to-primary-dark px-4 py-4 text-white sm:-mx-5 sm:-mt-5 sm:px-5">
        <div aria-hidden className="absolute -top-10 -right-6 size-32 rounded-full bg-accent/20 blur-2xl" />
        <div className="relative min-w-0">
          <p className="m-0 type-eyebrow text-lg text-accent">{format(selectedDate, "EEEE")}</p>
          <p className="truncate font-heading text-lg font-bold text-white">
            {format(selectedDate, "d MMMM yyyy")}
          </p>
          <p className="mt-0.5 text-sm text-white/75">
            {count === 0
              ? "No appointments"
              : `${count} appointment${count === 1 ? "" : "s"}`}
          </p>
        </div>
        <Button
          type="button"
          variant="accent"
          size="sm"
          className="relative shrink-0 gap-1.5"
          disabled={!canAdd}
          onClick={onAdd}
        >
          <Plus className="size-3.5" />
          <span className="sm:hidden">Add</span>
          <span className="hidden sm:inline">Add Appointment</span>
        </Button>
      </div>

      <CalendarDayHiddenSlots date={toDateValue(selectedDate)} />

      <div className="mt-4 flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto">
        {count === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border bg-mint/40 px-4">
            <EmptyState size="sm" image="appointments" title="Nothing booked this day" description="Add an appointment to get started." />
          </div>
        ) : (
          sorted.map((item) => (
            <CalendarDayAppointmentCard
              key={item.id}
              appointment={item}
              leadName={leadName(item.leadId)}
              onOpen={() => onOpenAppointment(item)}
            />
          ))
        )}
      </div>
    </div>
  );
}
