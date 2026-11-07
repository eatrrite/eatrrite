import {
  CALENDAR_DAY_END_HOUR,
  CALENDAR_DAY_START_HOUR,
  CALENDAR_DEFAULT_DURATION_MINUTES,
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

export function appointmentEndTime(startTime: string): string {
  const start = parseTimeToMinutes(startTime);
  if (start === null) return startTime;
  return minutesToTimeValue(start + CALENDAR_DEFAULT_DURATION_MINUTES);
}

export function formatTimeRange(startTime: string): string {
  return `${formatTimeLabel(startTime)} - ${formatTimeLabel(appointmentEndTime(startTime))}`;
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
  endTime: string;
};

/** Absolute position within the clinic-day timeline. */
export function appointmentBlockLayout(startTime: string): BlockLayout | null {
  const start = parseTimeToMinutes(startTime);
  if (start === null) return null;
  const dayStart = CALENDAR_DAY_START_HOUR * 60;
  const dayEnd = CALENDAR_DAY_END_HOUR * 60;
  const end = Math.min(start + CALENDAR_DEFAULT_DURATION_MINUTES, dayEnd);
  if (end <= dayStart || start >= dayEnd) return null;
  const clampedStart = Math.max(start, dayStart);
  const topPx =
    ((clampedStart - dayStart) / 60) * CALENDAR_HOUR_HEIGHT_PX;
  const heightPx = Math.max(
    ((end - clampedStart) / 60) * CALENDAR_HOUR_HEIGHT_PX,
    CALENDAR_HOUR_HEIGHT_PX * 0.5,
  );
  return { topPx, heightPx, endTime: minutesToTimeValue(end) };
}
