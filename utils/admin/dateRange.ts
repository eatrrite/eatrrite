import { endOfDay, endOfMonth, endOfWeek, parseISO, startOfDay, startOfMonth, startOfWeek } from "date-fns";
import type { AppointmentDateFilter } from "@/types/admin/appointment";
import type { DateRange } from "react-day-picker";

/**
 * True when the day falls inside the picked range (whole days, both ends included). No range
 * picked: always true. Takes a date ("2026-11-19") or a timestamp.
 */
export function isInDateRange(value: string, range: DateRange | undefined): boolean {
  if (!range?.from) return true;
  const day = parseISO(value);
  return day >= startOfDay(range.from) && day <= endOfDay(range.to ?? range.from);
}

/** The list date presets (All dates, Today, This week, This month); weeks start on Monday. */
export function matchesDatePreset(
  dateValue: string,
  filter: AppointmentDateFilter,
  reference: Date,
): boolean {
  if (filter === "all") return true;
  const date = parseISO(dateValue);
  if (filter === "today") {
    return date >= startOfDay(reference) && date <= endOfDay(reference);
  }
  if (filter === "this-week") {
    return (
      date >= startOfWeek(reference, { weekStartsOn: 1 }) &&
      date <= endOfWeek(reference, { weekStartsOn: 1 })
    );
  }
  return date >= startOfMonth(reference) && date <= endOfMonth(reference);
}
