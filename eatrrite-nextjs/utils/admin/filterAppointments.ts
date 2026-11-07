import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import type { AppointmentDateFilter } from "@/constants/admin/appointments/dateFilters";
import { DASHBOARD_REFERENCE_DATE } from "@/constants/admin/dashboard/reference";
import type { Appointment, AppointmentStatus, Patient } from "@/types/admin/admin";

export type AppointmentListFilters = {
  query: string;
  status: "all" | AppointmentStatus;
  date: AppointmentDateFilter;
};

function matchesDateFilter(
  dateValue: string,
  filter: AppointmentDateFilter,
  reference: Date,
): boolean {
  if (filter === "all") return true;
  const date = parseISO(dateValue);
  if (filter === "today") {
    return (
      date >= startOfDay(reference) && date <= endOfDay(reference)
    );
  }
  if (filter === "this-week") {
    return (
      date >= startOfWeek(reference, { weekStartsOn: 1 }) &&
      date <= endOfWeek(reference, { weekStartsOn: 1 })
    );
  }
  return (
    date >= startOfMonth(reference) && date <= endOfMonth(reference)
  );
}

export function filterAppointments(
  appointments: Appointment[],
  patients: Patient[],
  filters: AppointmentListFilters,
): Appointment[] {
  const query = filters.query.trim().toLowerCase();
  const reference = parseISO(DASHBOARD_REFERENCE_DATE);
  const names = new Map(patients.map((p) => [p.id, p.name.toLowerCase()]));

  return appointments.filter((item) => {
    if (filters.status !== "all" && item.status !== filters.status) return false;
    if (!matchesDateFilter(item.date, filters.date, reference)) return false;
    if (!query) return true;
    const patientName = names.get(item.patientId) ?? "";
    return (
      patientName.includes(query) ||
      item.reason.toLowerCase().includes(query) ||
      item.date.includes(query)
    );
  });
}
