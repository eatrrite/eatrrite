import { format, parseISO } from "date-fns";
import type { Appointment, Patient } from "@/types/admin/admin";
import type { RecentPatientRow } from "@/types/admin/dashboard";

/** Most recently updated patients with their latest visit label. */
export function buildRecentPatientRows(
  patients: Patient[],
  appointments: Appointment[],
  limit = 5,
): RecentPatientRow[] {
  return [...patients]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit)
    .map((patient) => {
      const last = [...appointments]
        .filter((item) => item.patientId === patient.id)
        .sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time))[0];

      return {
        id: patient.id,
        name: patient.name,
        lastVisitLabel: last
          ? format(parseISO(last.date), "MMM d, yyyy")
          : "No visits yet",
      };
    });
}
