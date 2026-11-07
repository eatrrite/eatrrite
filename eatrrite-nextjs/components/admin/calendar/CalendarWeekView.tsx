"use client";

import { useMemo } from "react";
import type { Appointment } from "@/types/admin/admin";
import { CalendarHourLines } from "@/components/admin/calendar/CalendarHourLines";
import { CalendarTimeGutter } from "@/components/admin/calendar/CalendarTimeGutter";
import { CalendarWeekDayColumn } from "@/components/admin/calendar/CalendarWeekDayColumn";
import { CALENDAR_TIMELINE_EDGE_PAD_PX } from "@/constants/admin/calendar/layout";
import {
  appointmentsOnDate,
  groupAppointmentsByDate,
} from "@/utils/admin/calendarAppointments";
import {
  calendarGridHeightPx,
  calendarTimelineOuterHeightPx,
} from "@/utils/admin/calendarTime";
import { buildWeekDays } from "@/utils/admin/calendarWeek";
import { cn } from "cn";

type CalendarWeekViewProps = {
  cursor: Date;
  selected: Date;
  today: Date;
  appointments: Appointment[];
  patientName: (patientId: string) => string;
  onSelectDate: (date: Date) => void;
  onSelectAppointment: (appointment: Appointment) => void;
  onEmptySlot: (date: Date, time: string) => void;
};

export function CalendarWeekView({
  cursor,
  selected,
  today,
  appointments,
  patientName,
  onSelectDate,
  onSelectAppointment,
  onEmptySlot,
}: CalendarWeekViewProps) {
  const days = useMemo(
    () => buildWeekDays(cursor, selected, today),
    [cursor, selected, today],
  );
  const byDate = useMemo(
    () => groupAppointmentsByDate(appointments),
    [appointments],
  );
  const gridHeight = calendarGridHeightPx();
  const outerHeight = calendarTimelineOuterHeightPx();

  return (
    <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="grid shrink-0 grid-cols-[3.5rem_repeat(7,minmax(0,1fr))] gap-0 sm:grid-cols-[4rem_repeat(7,minmax(0,1fr))]">
        <div />
        {days.map((day) => (
          <button
            key={day.dateKey}
            type="button"
            onClick={() => onSelectDate(day.date)}
            className="flex flex-col items-center gap-1 pb-2"
          >
            <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">
              {day.weekdayShort}
            </span>
            <span
              className={cn(
                "inline-flex size-7 items-center justify-center rounded-full text-sm font-medium sm:size-8",
                day.isSelected && "bg-primary text-primary-foreground",
                !day.isSelected && day.isToday && "ring-1 ring-primary/40",
                !day.isSelected && "text-foreground",
              )}
            >
              {day.dayNumber}
            </span>
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto">
        <div
          className="flex min-w-[32rem] sm:min-w-[36rem]"
          style={{ height: outerHeight }}
        >
          <CalendarTimeGutter />
          <div
            className="relative grid flex-1 grid-cols-7"
            style={{
              marginTop: CALENDAR_TIMELINE_EDGE_PAD_PX,
              marginBottom: CALENDAR_TIMELINE_EDGE_PAD_PX,
              height: gridHeight,
            }}
          >
            <CalendarHourLines />
            {days.map((day) => (
              <CalendarWeekDayColumn
                key={day.dateKey}
                isSelected={day.isSelected}
                appointments={appointmentsOnDate(byDate, day.dateKey)}
                patientName={patientName}
                onSelectDate={() => onSelectDate(day.date)}
                onSelectAppointment={onSelectAppointment}
                onEmptySlot={(time) => onEmptySlot(day.date, time)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
