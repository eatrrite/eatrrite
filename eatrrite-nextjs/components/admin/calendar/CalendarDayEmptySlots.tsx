"use client";

import { CALENDAR_DAY_END_HOUR, CALENDAR_DAY_START_HOUR } from "@/constants/admin/calendar/views";
import { CALENDAR_HOUR_HEIGHT_PX } from "@/constants/admin/calendar/layout";
import { minutesToTimeValue } from "@/utils/admin/calendarTime";
import { formatTimeLabel } from "@/utils/admin/time";

type CalendarDayEmptySlotsProps = {
  onEmptySlot?: (time: string) => void;
};

/** Clickable hour rows behind appointment blocks (create flow in a later task). */
export function CalendarDayEmptySlots({ onEmptySlot }: CalendarDayEmptySlotsProps) {
  const hours: number[] = [];
  for (let hour = CALENDAR_DAY_START_HOUR; hour < CALENDAR_DAY_END_HOUR; hour++) {
    hours.push(hour);
  }

  return (
    <div className="absolute inset-0">
      {hours.map((hour, index) => {
        const time = minutesToTimeValue(hour * 60);
        return (
          <button
            key={hour}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onEmptySlot?.(time);
            }}
            aria-label={`Add appointment at ${formatTimeLabel(time)}`}
            className="absolute inset-x-0 border-0 bg-transparent transition-colors hover:bg-muted/40"
            style={{
              top: index * CALENDAR_HOUR_HEIGHT_PX,
              height: CALENDAR_HOUR_HEIGHT_PX,
            }}
          />
        );
      })}
    </div>
  );
}
