import type { CalendarView } from "@/types/admin/calendar";

export const CALENDAR_VIEWS: { value: CalendarView; label: string }[] = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" },
];

/** Day grid starts/ends (24h), covering the consultation hours. */
export const CALENDAR_DAY_START_HOUR = 11;
export const CALENDAR_DAY_END_HOUR = 22;

/** Consultation length (MEETING_MINUTES in the booking rules). */
export const CALENDAR_DEFAULT_DURATION_MINUTES = 30;
