import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isSameYear,
  startOfWeek,
} from "date-fns";
import { toDateValue } from "@/utils/admin/date";

export type CalendarWeekDay = {
  date: Date;
  dateKey: string;
  dayNumber: number;
  weekdayShort: string;
  isToday: boolean;
  isSelected: boolean;
};

/** Sunday-start week containing `cursor`. */
export function buildWeekDays(
  cursor: Date,
  selected: Date,
  today: Date,
): CalendarWeekDay[] {
  const start = startOfWeek(cursor);
  const end = endOfWeek(cursor);
  return eachDayOfInterval({ start, end }).map((date) => ({
    date,
    dateKey: toDateValue(date),
    dayNumber: date.getDate(),
    weekdayShort: format(date, "EEE"),
    isToday: isSameDay(date, today),
    isSelected: isSameDay(date, selected),
  }));
}

/** e.g. `12 – 18 Oct 2026` */
export function formatWeekTitle(cursor: Date): string {
  const start = startOfWeek(cursor);
  const end = endOfWeek(cursor);
  if (isSameMonth(start, end)) {
    return `${format(start, "d")} – ${format(end, "d MMM yyyy")}`;
  }
  if (isSameYear(start, end)) {
    return `${format(start, "d MMM")} – ${format(end, "d MMM yyyy")}`;
  }
  return `${format(start, "d MMM yyyy")} – ${format(end, "d MMM yyyy")}`;
}
