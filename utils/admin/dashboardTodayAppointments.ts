import type { Appointment, AppointmentStatus } from "@/types/admin/appointment";
import type { DashboardAppointment, DashboardAppointmentStatus } from "@/types/admin/dashboard";

function toDashboardStatus(status: AppointmentStatus): DashboardAppointmentStatus | null {
  if (status === "completed") return "completed";
  if (status === "upcoming") return "upcoming";
  return null;
}

/** Today's appointments for the dashboard list (real appointment ids). */
export function buildTodayAppointments(
  appointments: Appointment[],
  leadName: (leadId: string) => string,
  todayKey: string,
): DashboardAppointment[] {
  return appointments
    .filter((item) => item.date === todayKey)
    .flatMap((item) => {
      const status = toDashboardStatus(item.status);
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
