import type { Appointment, AppointmentStatus } from "@/types/admin/admin";
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

/** Unique status-dot classes for a day’s appointments (stable order). */
export function dayStatusDotClasses(appointments: Appointment[]): string[] {
  const order: StatusTone[] = ["success", "active", "muted", "danger"];
  const present = new Set(
    appointments.map((item) => APPOINTMENT_STATUS_DOT_TONE[item.status]),
  );
  return order
    .filter((tone) => present.has(tone))
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
