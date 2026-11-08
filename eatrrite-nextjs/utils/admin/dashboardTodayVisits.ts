import type { ClinicAppointment, ClinicAppointmentStatus } from "@/types/admin/appointment";
import type { DashboardVisit, VisitStatus } from "@/types/admin/dashboard";

function toVisitStatus(status: ClinicAppointmentStatus): VisitStatus | null {
  if (status === "completed") return "completed";
  if (status === "upcoming") return "upcoming";
  return null;
}

/** Today's clinic visits for the dashboard list (real appointment ids). */
export function buildTodayVisits(
  appointments: ClinicAppointment[],
  leadName: (leadId: string) => string,
  todayKey: string,
): DashboardVisit[] {
  return appointments
    .filter((item) => item.date === todayKey)
    .flatMap((item) => {
      const status = toVisitStatus(item.status);
      if (!status) return [];
      return [
        {
          id: item.id,
          time: item.time,
          leadName: leadName(item.leadId),
          service: item.service,
          status,
        },
      ];
    })
    .sort((a, b) => a.time.localeCompare(b.time));
}
