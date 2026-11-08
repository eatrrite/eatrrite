import {
  CalendarCheck2,
  CalendarDays,
  IndianRupee,
  Users,
} from "lucide-react";
import { COMPLETED_VISIT_FEE } from "@/constants/admin/dashboard/reference";
import type { ClinicAppointment } from "@/types/admin/appointment";
import type { Lead } from "@/types/admin/lead";
import type { DashboardFilters, StatsCardModel } from "@/types/admin/dashboard";
import {
  getCustomPreviousWindow,
  getCustomWindow,
  getPreviousWindow,
  getRangeWindow,
  trendLabelFor,
} from "@/utils/admin/dashboardRange";
import {
  countAppointments,
  countCompleted,
  countLeads,
  percentChange,
} from "@/utils/admin/dashboardStatsCount";

export function buildDashboardStats(
  leads: Lead[],
  appointments: ClinicAppointment[],
  filters: DashboardFilters,
  reference: Date,
): StatsCardModel[] {
  const hasCustom = Boolean(filters.dateRange?.from);
  const current = hasCustom
    ? getCustomWindow(filters.dateRange!)
    : getRangeWindow(filters.range, reference);
  const previous = hasCustom
    ? getCustomPreviousWindow(filters.dateRange!)
    : getPreviousWindow(filters.range, reference);
  const trendLabel = trendLabelFor(filters.range, hasCustom);

  if (!current) {
    return [];
  }

  const leadNow = countLeads(leads, current);
  const aptNow = countAppointments(appointments, filters, current);
  const doneNow = countCompleted(appointments, filters, current);
  const revenueNow = doneNow * COMPLETED_VISIT_FEE;

  const leadPrev = previous ? countLeads(leads, previous) : null;
  const aptPrev = previous
    ? countAppointments(appointments, filters, previous)
    : null;
  const donePrev = previous
    ? countCompleted(appointments, filters, previous)
    : null;
  const revenuePrev = donePrev === null ? null : donePrev * COMPLETED_VISIT_FEE;

  return [
    {
      id: "leads",
      label: "Total Leads",
      value: String(leadNow),
      icon: Users,
      trendPercent:
        leadPrev === null ? null : percentChange(leadNow, leadPrev),
      trendLabel,
    },
    {
      id: "appointments",
      label: "Appointments",
      value: String(aptNow),
      icon: CalendarDays,
      trendPercent: aptPrev === null ? null : percentChange(aptNow, aptPrev),
      trendLabel,
    },
    {
      id: "completed",
      label: "Completed",
      value: String(doneNow),
      icon: CalendarCheck2,
      trendPercent: donePrev === null ? null : percentChange(doneNow, donePrev),
      trendLabel,
    },
    {
      id: "revenue",
      label: "Revenue",
      value: `₹${revenueNow.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      trendPercent:
        revenuePrev === null ? null : percentChange(revenueNow, revenuePrev),
      trendLabel,
    },
  ];
}
