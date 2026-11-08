"use client";

import type { ClinicAppointment } from "@/types/admin/appointment";
import { CalendarAppointmentBlock } from "@/components/admin/calendar/CalendarAppointmentBlock";
import { CalendarDayEmptySlots } from "@/components/admin/calendar/CalendarDayEmptySlots";
import { appointmentBlockLayout } from "@/utils/admin/calendarTime";
import { cn } from "cn";

type CalendarWeekDayColumnProps = {
  isSelected: boolean;
  appointments: ClinicAppointment[];
  leadName: (leadId: string) => string;
  onSelectDate: () => void;
  onSelectAppointment: (appointment: ClinicAppointment) => void;
  onEmptySlot?: (time: string) => void;
};

export function CalendarWeekDayColumn({
  isSelected,
  appointments,
  leadName,
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
            leadName={leadName(item.leadId)}
            topPx={layout.topPx}
            heightPx={layout.heightPx}
            onSelect={() => onSelectAppointment(item)}
          />
        );
      })}
    </div>
  );
}
