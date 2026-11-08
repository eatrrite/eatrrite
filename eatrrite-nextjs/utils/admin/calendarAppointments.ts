import type { Appointment, AppointmentStatus } from "@/types/admin/appointment";
import {
  APPOINTMENT_STATUS_DOT_TONE,
  STATUS_DOT_CLASS,
} from "@/constants/admin/calendar/dots";
import type { StatusTone } from "@/constants/admin/statusTones";

/** Group appointments by `yyyy-MM-dd`. */
export function groupAppointmentsByDate(
  appointments: Appointment[],
): Map<string, Appointment[]> {
  const map = new Map<string, Appointment[]>();
  for (const item of appointments) {
    const list = map.get(item.date) ?? [];
    list.push(item);
    map.set(item.date, list);
  }
  return map;
}

/** One dot class per appointment on the day, ordered by status so the dots read the same every time. */
export function dayDotClasses(appointments: Appointment[]): string[] {
  const order = Object.keys(STATUS_DOT_CLASS) as StatusTone[];
  return appointments
    .map((item) => APPOINTMENT_STATUS_DOT_TONE[item.status])
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
    .map((tone) => STATUS_DOT_CLASS[tone]);
}

export function appointmentsOnDate(
  byDate: Map<string, Appointment[]>,
  dateKey: string,
): Appointment[] {
  return byDate.get(dateKey) ?? [];
}

export function statusToneForAppointment(
  status: AppointmentStatus,
): StatusTone {
  return APPOINTMENT_STATUS_DOT_TONE[status];
}
