import {
  CalendarCheck2,
  CalendarDays,
  IndianRupee,
  Users,
} from "lucide-react";
import { COMPLETED_VISIT_FEE } from "@/constants/admin/dashboard/reference";
import type { Appointment, Patient } from "@/types/admin/admin";
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
  countPatients,
  percentChange,
} from "@/utils/admin/dashboardStatsCount";

export function buildDashboardStats(
  patients: Patient[],
  appointments: Appointment[],
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

  const patientNow = countPatients(patients, current);
  const aptNow = countAppointments(appointments, filters, current);
  const doneNow = countCompleted(appointments, filters, current);
  const revenueNow = doneNow * COMPLETED_VISIT_FEE;

  const patientPrev = previous ? countPatients(patients, previous) : null;
  const aptPrev = previous
    ? countAppointments(appointments, filters, previous)
    : null;
  const donePrev = previous
    ? countCompleted(appointments, filters, previous)
    : null;
  const revenuePrev = donePrev === null ? null : donePrev * COMPLETED_VISIT_FEE;

  return [
    {
      id: "patients",
      label: "Total Patients",
      value: String(patientNow),
      icon: Users,
      trendPercent:
        patientPrev === null ? null : percentChange(patientNow, patientPrev),
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
