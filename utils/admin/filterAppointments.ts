import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import type { AppointmentDateFilter } from "@/types/admin/appointment";
import { adminNow } from "@/constants/admin/dashboard/reference";
import type {
  AppointmentListFilters,
  Appointment,
} from "@/types/admin/appointment";
import type { Lead } from "@/types/admin/lead";

export type { AppointmentListFilters };

function matchesDateFilter(
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

export function filterAppointments(
  appointments: Appointment[],
  leads: Lead[],
  filters: AppointmentListFilters,
): Appointment[] {
  const query = filters.query.trim().toLowerCase();
  const reference = parseISO(adminNow());
  const names = new Map(leads.map((lead) => [lead.id, lead.name.toLowerCase()]));

  return appointments.filter((item) => {
    if (filters.status !== "all" && item.status !== filters.status) return false;
    if (!matchesDateFilter(item.date, filters.date, reference)) return false;
    if (filters.payment !== "all" && item.paymentDone !== (filters.payment === "paid")) return false;
    if (!query) return true;
    const leadName = names.get(item.leadId) ?? "";
    return (
      leadName.includes(query) ||
      item.service.toLowerCase().includes(query) ||
      item.date.includes(query)
    );
  });
}
