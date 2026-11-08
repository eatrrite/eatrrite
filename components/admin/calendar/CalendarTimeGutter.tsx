"use client";

import {
  CALENDAR_HOUR_HEIGHT_PX,
  CALENDAR_TIMELINE_EDGE_PAD_PX,
} from "@/constants/admin/calendar/layout";
import { calendarHourMarks } from "@/utils/admin/calendarTime";
import { formatTimeLabel } from "@/utils/admin/time";

export function CalendarTimeGutter() {
  const hours = calendarHourMarks();

  return (
    <div className="relative w-14 shrink-0 sm:w-16">
      {hours.map((hour, index) => (
        <p
          key={hour}
          className="absolute right-2 -translate-y-1/2 text-[10px] text-muted-foreground sm:text-xs"
          style={{
            top: CALENDAR_TIMELINE_EDGE_PAD_PX + index * CALENDAR_HOUR_HEIGHT_PX,
          }}
        >
          {formatTimeLabel(`${String(hour).padStart(2, "0")}:00`)}
        </p>
      ))}
    </div>
  );
}
