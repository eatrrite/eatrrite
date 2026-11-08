import {
  differenceInCalendarDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import type { DateRange } from "react-day-picker";
import type { DashboardRange } from "@/types/admin/dashboard";

export type DateWindow = {
  start: Date | null;
  end: Date;
};

export function getRangeWindow(range: DashboardRange, reference: Date): DateWindow {
  const end = endOfDay(reference);
  if (range === "all") return { start: null, end };
  if (range === "7d") return { start: startOfDay(subDays(reference, 6)), end };
  if (range === "month") return { start: startOfMonth(reference), end };
  if (range === "3m") return { start: startOfDay(subMonths(reference, 3)), end };
  return { start: startOfDay(subMonths(reference, 6)), end };
}

export function getCustomWindow(dateRange: DateRange): DateWindow | null {
  if (!dateRange.from) return null;
  const end = endOfDay(dateRange.to ?? dateRange.from);
  return { start: startOfDay(dateRange.from), end };
}

export function getPreviousWindow(
  range: DashboardRange,
  reference: Date,
): DateWindow | null {
  if (range === "all") return null;
  const current = getRangeWindow(range, reference);
  if (!current.start) return null;
  const end = endOfDay(subDays(current.start, 1));
  if (range === "7d") return { start: startOfDay(subDays(end, 6)), end };
  if (range === "month") return { start: startOfMonth(end), end };
  if (range === "3m") return { start: startOfDay(subMonths(end, 3)), end };
  return { start: startOfDay(subMonths(end, 6)), end };
}

export function getCustomPreviousWindow(dateRange: DateRange): DateWindow | null {
  const current = getCustomWindow(dateRange);
  if (!current?.start) return null;
  const days = differenceInCalendarDays(current.end, current.start);
  const end = endOfDay(subDays(current.start, 1));
  return { start: startOfDay(subDays(end, days)), end };
}

export function isInWindow(iso: string, window: DateWindow): boolean {
  const time = new Date(iso).getTime();
  if (Number.isNaN(time)) return false;
  if (window.start && time < window.start.getTime()) return false;
  return time <= window.end.getTime();
}

export function trendLabelFor(
  range: DashboardRange,
  hasCustomRange: boolean,
): string {
  if (hasCustomRange) return "from prior period";
  if (range === "7d") return "from prior week";
  if (range === "month") return "from last month";
  if (range === "3m") return "from prior 3 months";
  if (range === "6m") return "from prior 6 months";
  return "all time";
}
