import type { Appointment, AppointmentStatus } from "@/types/admin/appointment";
import type { DashboardFilters, DashboardStatusFilter } from "@/types/admin/dashboard";
import { isInWindow, type DateWindow } from "@/utils/admin/dashboardRange";

function matchStatus(appointment: Appointment, status: DashboardStatusFilter): boolean {
  return status === "all" || appointment.status === status;
}

// Appointments booked in the window (created_at) that pass the status filter.
function booked(appointments: Appointment[], filters: DashboardFilters, window: DateWindow) {
  return appointments.filter((a) => matchStatus(a, filters.status) && isInWindow(a.createdAt, window));
}

export function countWithStatus(
  appointments: Appointment[],
  status: AppointmentStatus,
  filters: DashboardFilters,
  window: DateWindow,
) {
  return booked(appointments, filters, window).filter((a) => a.status === status).length;
}

/** Fee still due (payment_status 'due'). A cancelled one is not owed. */
export function countDue(appointments: Appointment[], filters: DashboardFilters, window: DateWindow) {
  return booked(appointments, filters, window).filter((a) => a.paymentStatus === "due" && a.status !== "cancelled").length;
}

/**
 * Fees received and kept in the window (payment_status 'paid'), by when they were paid (paid_at,
 * else the booking time). A refunded fee is not revenue. A cancelled booking still counts until it
 * is marked refunded, since the money is still held.
 */
export function countPaid(appointments: Appointment[], filters: DashboardFilters, window: DateWindow) {
  return appointments.filter(
    (a) =>
      a.paymentStatus === "paid" &&
      matchStatus(a, filters.status) &&
      isInWindow(a.paidAt ?? a.createdAt, window),
  ).length;
}

export function percentChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return Math.round(((current - previous) / previous) * 100);
}
