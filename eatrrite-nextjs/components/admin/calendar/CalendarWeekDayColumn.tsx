"use client";

import type { Appointment } from "@/types/admin/admin";
import { CalendarAppointmentBlock } from "@/components/admin/calendar/CalendarAppointmentBlock";
import { CalendarDayEmptySlots } from "@/components/admin/calendar/CalendarDayEmptySlots";
import { appointmentBlockLayout } from "@/utils/admin/calendarTime";
import { cn } from "cn";

type CalendarWeekDayColumnProps = {
  isSelected: boolean;
  appointments: Appointment[];
  patientName: (patientId: string) => string;
  onSelectDate: () => void;
  onSelectAppointment: (appointment: Appointment) => void;
  onEmptySlot?: (time: string) => void;
};

export function CalendarWeekDayColumn({
  isSelected,
  appointments,
  patientName,
  onSelectDate,
  onSelectAppointment,
  onEmptySlot,
}: CalendarWeekDayColumnProps) {
  return (
    <div
      role="presentation"
      onClick={onSelectDate}
      className={cn(
        "relative min-h-0 cursor-pointer border-l border-border/60 first:border-l-0",
        isSelected && "bg-primary/[0.04]",
      )}
    >
      {onEmptySlot ? (
        <CalendarDayEmptySlots
          onEmptySlot={(time) => {
            onSelectDate();
            onEmptySlot(time);
          }}
        />
      ) : null}
      {appointments.map((item) => {
        const layout = appointmentBlockLayout(item.time);
        if (!layout) return null;
        return (
          <CalendarAppointmentBlock
            key={item.id}
            appointment={item}
            patientName={patientName(item.patientId)}
            topPx={layout.topPx}
            heightPx={layout.heightPx}
            onSelect={() => onSelectAppointment(item)}
          />
        );
      })}
    </div>
  );
}
