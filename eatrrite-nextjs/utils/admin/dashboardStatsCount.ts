import type { Appointment, Patient } from "@/types/admin/admin";
import type { DashboardFilters, DashboardStatusFilter } from "@/types/admin/dashboard";
import { isInWindow, type DateWindow } from "@/utils/admin/dashboardRange";

function matchStatus(
  appointment: Appointment,
  status: DashboardStatusFilter,
): boolean {
  return status === "all" || appointment.status === status;
}

function inCreatedWindow(
  item: { createdAt: string },
  window: DateWindow,
): boolean {
  return isInWindow(item.createdAt, window);
}

export function countPatients(patients: Patient[], window: DateWindow) {
  return patients.filter((p) => inCreatedWindow(p, window)).length;
}

export function countAppointments(
  appointments: Appointment[],
  filters: DashboardFilters,
  window: DateWindow,
) {
  return appointments.filter(
    (a) => matchStatus(a, filters.status) && inCreatedWindow(a, window),
  ).length;
}

export function countCompleted(
  appointments: Appointment[],
  filters: DashboardFilters,
  window: DateWindow,
) {
  return appointments.filter(
    (a) =>
      a.status === "completed" &&
      matchStatus(a, filters.status) &&
      inCreatedWindow(a, window),
  ).length;
}

export function percentChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return Math.round(((current - previous) / previous) * 100);
}
