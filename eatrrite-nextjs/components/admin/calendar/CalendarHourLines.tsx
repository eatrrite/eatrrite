"use client";

import { CALENDAR_HOUR_HEIGHT_PX } from "@/constants/admin/calendar/layout";
import { calendarHourMarks } from "@/utils/admin/calendarTime";

/** Horizontal dashed hour rules for week/day grids. */
export function CalendarHourLines() {
  const hours = calendarHourMarks();

  return (
    <div className="pointer-events-none absolute inset-0">
      {hours.map((hour, index) => (
        <div
          key={hour}
          className="absolute inset-x-0 border-t border-dashed border-border/70"
          style={{ top: index * CALENDAR_HOUR_HEIGHT_PX }}
        />
      ))}
    </div>
  );
}
