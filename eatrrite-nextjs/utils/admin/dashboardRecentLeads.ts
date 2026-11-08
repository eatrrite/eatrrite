import { format, parseISO } from "date-fns";
import type { ClinicAppointment } from "@/types/admin/appointment";
import type { RecentLeadRow } from "@/types/admin/dashboard";
import type { Lead } from "@/types/admin/lead";

/** Most recently updated leads with their latest visit label. */
export function buildRecentLeadRows(
  leads: Lead[],
  appointments: ClinicAppointment[],
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
        lastVisitLabel: last
          ? format(parseISO(last.date), "MMM d, yyyy")
          : "No visits yet",
      };
    });
}
