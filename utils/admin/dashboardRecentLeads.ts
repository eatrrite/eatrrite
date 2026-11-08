import { format, parseISO } from "date-fns";
import type { Appointment } from "@/types/admin/appointment";
import type { RecentLeadRow } from "@/types/admin/dashboard";
import type { Lead } from "@/types/admin/lead";

/** Most recently updated leads with their latest appointment label. */
export function buildRecentLeadRows(
  leads: Lead[],
  appointments: Appointment[],
  limit = 5,
): RecentLeadRow[] {
  return [...leads]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit)
    .map((lead) => {
      const last = [...appointments]
        .filter((item) => item.leadId === lead.id)
        .sort(
          (a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time),
        )[0];

      return {
        id: lead.id,
        name: lead.name,
        lastAppointmentLabel: last
          ? format(parseISO(last.date), "MMM d, yyyy")
          : "No appointments yet",
      };
    });
}
