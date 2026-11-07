import {
  addDays,
  addMonths,
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { toDateValue } from "@/utils/admin/date";

export type CalendarMonthCell = {
  date: Date;
  dateKey: string;
  dayNumber: number;
  inCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};

export const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Always six weeks (42 days), Sunday-start, covering the given month. */
export function buildMonthCells(
  month: Date,
  selected: Date,
  today: Date,
): CalendarMonthCell[] {
  const start = startOfWeek(startOfMonth(month));
  const end = addDays(start, 41);

  return eachDayOfInterval({ start, end }).map((date) => ({
    date,
    dateKey: toDateValue(date),
    dayNumber: date.getDate(),
    inCurrentMonth: isSameMonth(date, month),
    isToday: isSameDay(date, today),
    isSelected: isSameDay(date, selected),
  }));
}

export function formatMonthTitle(month: Date): string {
  return format(month, "MMMM yyyy");
}

export function shiftMonth(month: Date, delta: number): Date {
  return addMonths(startOfMonth(month), delta);
}
