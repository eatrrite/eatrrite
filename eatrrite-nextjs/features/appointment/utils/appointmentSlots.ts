import { APPOINTMENT_SETTINGS } from "@/features/appointment/constants/appointment-settings";
import type { ClinicAppointment, ClinicAppointmentInput } from "@/types/admin/appointment";
import type { DaySchedule } from "@/types/admin/schedule";
import type { OccupiedSlot } from "@/features/appointment/types/slots";
import { scheduleToWeekly } from "@/features/appointment/utils/scheduleWeekly";
import { timesOverlap } from "@/features/appointment/utils/blocks";
import { availableTimes, offeredTimes } from "@/features/appointment/utils/slots";

// A cancelled appointment frees its slot. Every other status keeps it taken.
export function occupiedFrom(appointments: ClinicAppointment[], ignoreId?: string): OccupiedSlot[] {
  return appointments
    .filter((item) => item.id !== ignoreId && item.status !== "cancelled")
    .map(({ date, time }) => ({ date, time }));
}

// Times the admin can pick on a date: offered by the schedule and free of other
// appointments. The admin may also record past visits, so past times stay.
export function adminSlotTimes(
  date: string,
  days: DaySchedule[],
  appointments: ClinicAppointment[],
  ignoreId?: string,
): string[] {
  if (!date) return [];
  return availableTimes(date, {
    weekly: scheduleToWeekly(days),
    occupied: occupiedFrom(appointments, ignoreId),
    hidePast: false,
  });
}

export function hasSlotConflict(
  date: string,
  time: string,
  appointments: ClinicAppointment[],
  ignoreId?: string,
): boolean {
  return occupiedFrom(appointments, ignoreId).some((item) => item.date === date && timesOverlap(item.time, time));
}

// Why an appointment cannot be saved at this time, or null. An edit that keeps
// its date and time is always fine, so older records can still be changed.
export function adminSlotError(
  input: ClinicAppointmentInput,
  days: DaySchedule[],
  appointments: ClinicAppointment[],
  original?: Pick<ClinicAppointment, "id" | "date" | "time"> | null,
): string | null {
  if (input.status === "cancelled") return null;
  if (original && original.date === input.date && original.time === input.time) {
    return hasSlotConflict(input.date, input.time, appointments, original.id)
      ? "Another appointment already uses this time."
      : null;
  }
  const weekly = scheduleToWeekly(days);
  if (!offeredTimes(input.date, weekly).includes(input.time)) return "That time is outside the working hours.";
  return hasSlotConflict(input.date, input.time, appointments, original?.id)
    ? `Another appointment already uses this time. Each booking blocks ${APPOINTMENT_SETTINGS.blockMinutes} minutes.`
    : null;
}
