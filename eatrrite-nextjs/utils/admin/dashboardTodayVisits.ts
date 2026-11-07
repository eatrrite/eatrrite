import type { Appointment, AppointmentStatus } from "@/types/admin/admin";
import type { DashboardVisit, VisitStatus } from "@/types/admin/dashboard";

function toVisitStatus(status: AppointmentStatus): VisitStatus | null {
  if (status === "completed") return "completed";
  if (status === "upcoming") return "upcoming";
  return null;
}

/** Today's clinic visits for the dashboard list (real appointment ids). */
export function buildTodayVisits(
  appointments: Appointment[],
  patientName: (patientId: string) => string,
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
          patientName: patientName(item.patientId),
          service: item.reason,
          status,
        },
      ];
    })
    .sort((a, b) => a.time.localeCompare(b.time));
}
