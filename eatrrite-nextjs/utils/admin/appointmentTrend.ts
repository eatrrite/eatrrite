import type { Appointment } from "@/types/admin/appointment";
import type { AppointmentTrendPoint } from "@/types/admin/dashboard";
import { addDays, displayDate } from "@/features/appointment/utils/istTime";

// Appointments per day for the last `days` days, ending today. Cancelled ones are not counted.
export function appointmentTrend(appointments: Appointment[], today: string, days = 7): AppointmentTrendPoint[] {
  return Array.from({ length: days }, (_, index) => {
    const date = addDays(today, index - days + 1);
    const count = appointments.filter((item) => item.date === date && item.status !== "cancelled").length;
    return { date, label: displayDate(date).replace(/^\w+, /, ""), count };
  });
}
