import { parseISO } from "date-fns";
import { adminNow } from "@/constants/admin/dashboard/reference";
import type {
  AppointmentListFilters,
  Appointment,
} from "@/types/admin/appointment";
import type { Lead } from "@/types/admin/lead";
import { isInDateRange, matchesDatePreset } from "@/utils/admin/dateRange";

export type { AppointmentListFilters };

const when = (item: Appointment) => `${item.date} ${item.time}`;

// Last added or changed first by default; ties (and date sorts) fall back to the slot.
function sortAppointments(items: Appointment[], sort: AppointmentListFilters["sort"]) {
  return [...items].sort((a, b) => {
    if (sort === "date-asc") return when(a).localeCompare(when(b));
    if (sort === "date-desc") return when(b).localeCompare(when(a));
    return b.updatedAt.localeCompare(a.updatedAt) || when(b).localeCompare(when(a));
  });
}

export function filterAppointments(
  appointments: Appointment[],
  leads: Lead[],
  filters: AppointmentListFilters,
): Appointment[] {
  const query = filters.query.trim().toLowerCase();
  const reference = parseISO(adminNow());
  const names = new Map(leads.map((lead) => [lead.id, lead.name.toLowerCase()]));

  const shown = appointments.filter((item) => {
    if (filters.status !== "all" && item.status !== filters.status) return false;
    if (!matchesDatePreset(item.date, filters.date, reference)) return false;
    if (!isInDateRange(item.date, filters.dateRange)) return false;
    if (filters.payment !== "all" && item.paymentStatus !== filters.payment) return false;
    if (!query) return true;
    const leadName = names.get(item.leadId) ?? "";
    return (
      leadName.includes(query) ||
      item.service.toLowerCase().includes(query) ||
      item.date.includes(query)
    );
  });
  return sortAppointments(shown, filters.sort);
}
