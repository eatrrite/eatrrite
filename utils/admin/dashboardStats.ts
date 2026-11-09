import { CalendarCheck2, CalendarClock, IndianRupee, WalletCards } from "lucide-react";
import type { Appointment } from "@/types/admin/appointment";
import type { DashboardFilters, StatsCardModel } from "@/types/admin/dashboard";
import {
  getCustomPreviousWindow,
  getCustomWindow,
  getPreviousWindow,
  getRangeWindow,
  trendLabelFor,
  type DateWindow,
} from "@/utils/admin/dashboardRange";
import { countDue, countPaid, countWithStatus, percentChange } from "@/utils/admin/dashboardStatsCount";

type Count = (window: DateWindow) => number;

// The four dashboard cards: upcoming, completed, payments due and revenue (fees received × fee).
export function buildDashboardStats(
  appointments: Appointment[],
  filters: DashboardFilters,
  reference: Date,
  feeRupees: number,
): StatsCardModel[] {
  const hasCustom = Boolean(filters.dateRange?.from);
  const current = hasCustom ? getCustomWindow(filters.dateRange!) : getRangeWindow(filters.range, reference);
  const previous = hasCustom ? getCustomPreviousWindow(filters.dateRange!) : getPreviousWindow(filters.range, reference);
  const trendLabel = trendLabelFor(filters.range, hasCustom);
  if (!current) return [];

  // The value now, and its change against the window before (none for "all time").
  const measure = (count: Count) => {
    const now = count(current);
    const before = previous ? count(previous) : null;
    return { now, trendPercent: before === null ? null : percentChange(now, before) };
  };
  const upcoming = measure((w) => countWithStatus(appointments, "upcoming", filters, w));
  const completed = measure((w) => countWithStatus(appointments, "completed", filters, w));
  const due = measure((w) => countDue(appointments, filters, w));
  const revenue = measure((w) => countPaid(appointments, filters, w) * feeRupees);

  return [
    { id: "upcoming", label: "Appointments Upcoming", value: String(upcoming.now), icon: CalendarClock, tone: "teal", trendPercent: upcoming.trendPercent, trendLabel },
    { id: "completed", label: "Appointments Completed", value: String(completed.now), icon: CalendarCheck2, tone: "leaf", trendPercent: completed.trendPercent, trendLabel },
    { id: "due", label: "Due Payments", value: String(due.now), icon: WalletCards, tone: "gold", trendPercent: due.trendPercent, trendLabel },
    { id: "revenue", label: "Revenue", value: `₹${revenue.now.toLocaleString("en-IN")}`, icon: IndianRupee, tone: "coral", trendPercent: revenue.trendPercent, trendLabel },
  ];
}
