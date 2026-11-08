"use client";

import { useMemo } from "react";
import type { ClinicAppointment } from "@/types/admin/appointment";
import { CalendarMonthCell } from "@/components/admin/calendar/CalendarMonthCell";
import {
  dayStatusDotClasses,
  groupAppointmentsByDate,
} from "@/utils/admin/calendarAppointments";
import {
  WEEKDAY_SHORT,
  buildMonthCells,
} from "@/utils/admin/calendarMonth";

type CalendarMonthViewProps = {
  month: Date;
  selected: Date;
  today: Date;
  appointments: ClinicAppointment[];
  onSelectDate: (date: Date) => void;
};

export function CalendarMonthView({
  month,
  selected,
  today,
  appointments,
  onSelectDate,
}: CalendarMonthViewProps) {
  const cells = useMemo(
    () => buildMonthCells(month, selected, today),
    [month, selected, today],
  );
  const byDate = useMemo(
    () => groupAppointmentsByDate(appointments),
    [appointments],
  );

  return (
    <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="grid shrink-0 grid-cols-7 gap-1 border-b border-border pb-2">
        {WEEKDAY_SHORT.map((label) => (
          <p
            key={label}
            className="text-center text-xs font-medium text-muted-foreground"
          >
            {label}
          </p>
        ))}
      </div>
      <div className="mt-1 grid min-h-0 flex-1 grid-cols-7 grid-rows-6 gap-1">
        {cells.map((cell) => (
          <CalendarMonthCell
            key={cell.dateKey}
            cell={cell}
            dots={dayStatusDotClasses(byDate.get(cell.dateKey) ?? [])}
            onSelect={onSelectDate}
          />
        ))}
      </div>
    </div>
  );
}
