import {
  CALENDAR_DAY_END_HOUR,
  CALENDAR_DAY_START_HOUR,
} from "@/constants/admin/calendar/views";
import {
  CALENDAR_HOUR_HEIGHT_PX,
  CALENDAR_TIMELINE_EDGE_PAD_PX,
} from "@/constants/admin/calendar/layout";
import { formatTimeLabel } from "@/utils/admin/time";

export function parseTimeToMinutes(time: string): number | null {
  const [hourRaw, minuteRaw] = time.split(":");
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
  return hour * 60 + minute;
}

export function minutesToTimeValue(totalMinutes: number): string {
  const clamped = Math.max(0, totalMinutes);
  const hour = Math.floor(clamped / 60) % 24;
  const minute = clamped % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

// When the call ends. `meetingMinutes` is the call length from the booking settings.
export function appointmentEndTime(startTime: string, meetingMinutes: number): string {
  const start = parseTimeToMinutes(startTime);
  if (start === null) return startTime;
  return minutesToTimeValue(start + meetingMinutes);
}

export function formatTimeRange(startTime: string, meetingMinutes: number): string {
  return `${formatTimeLabel(startTime)} - ${formatTimeLabel(appointmentEndTime(startTime, meetingMinutes))}`;
}

/** Hour marks for the gutter (inclusive start … end). */
export function calendarHourMarks(): number[] {
  const hours: number[] = [];
  for (let hour = CALENDAR_DAY_START_HOUR; hour <= CALENDAR_DAY_END_HOUR; hour++) {
    hours.push(hour);
  }
  return hours;
}

export function calendarGridHeightPx(): number {
  return (CALENDAR_DAY_END_HOUR - CALENDAR_DAY_START_HOUR) * CALENDAR_HOUR_HEIGHT_PX;
}

/** Timeline scroll content height including gutter label edge padding. */
export function calendarTimelineOuterHeightPx(): number {
  return calendarGridHeightPx() + CALENDAR_TIMELINE_EDGE_PAD_PX * 2;
}

export type BlockLayout = {
  topPx: number;
  heightPx: number;
};

/**
 * Absolute position within the working-day timeline. The block is the time the appointment
 * reserves (the call plus the prep buffer, 45 minutes), the same span the booking rules block.
 * The time shown on the block is still the call itself (`formatTimeRange`).
 */
export function appointmentBlockLayout(startTime: string, blockMinutes: number): BlockLayout | null {
  const start = parseTimeToMinutes(startTime);
  if (start === null) return null;
  const dayStart = CALENDAR_DAY_START_HOUR * 60;
  const dayEnd = CALENDAR_DAY_END_HOUR * 60;
  const end = Math.min(start + blockMinutes, dayEnd);
  if (end <= dayStart || start >= dayEnd) return null;
  const clampedStart = Math.max(start, dayStart);
  const topPx =
    ((clampedStart - dayStart) / 60) * CALENDAR_HOUR_HEIGHT_PX;
  const heightPx = Math.max(
    ((end - clampedStart) / 60) * CALENDAR_HOUR_HEIGHT_PX,
    CALENDAR_HOUR_HEIGHT_PX * 0.5,
  );
  return { topPx, heightPx };
}
