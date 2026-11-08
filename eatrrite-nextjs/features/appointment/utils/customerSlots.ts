import type { Appointment } from "@/types/admin/appointment";
import type { DaySchedule } from "@/types/admin/schedule";
import { APPOINTMENT_SETTINGS } from "@/features/appointment/constants/appointment-settings";
import type { SlotHold } from "@/features/appointment/types/booking";
import type { BookingError, OccupiedSlot } from "@/features/appointment/types/slots";
import { occupiedFrom } from "@/features/appointment/utils/appointmentSlots";
import { bookingError, isBookableDate } from "@/features/appointment/utils/bookable";
import { scheduleToWeekly } from "@/features/appointment/utils/scheduleWeekly";
import { availableTimes } from "@/features/appointment/utils/slots";

/** What the customer-side rules read from the store. */
export type SlotSource = { days: DaySchedule[]; appointments: Appointment[]; holds: SlotHold[] };

export const activeHolds = (holds: SlotHold[], now = Date.now()) => holds.filter((hold) => hold.expiresAt > now);

export const newHoldExpiry = (now = Date.now()) => now + APPOINTMENT_SETTINGS.holdMinutes * 60_000;

// Booked appointments and live payment holds both take their slot.
function occupiedSlots({ appointments, holds }: SlotSource, now: number): OccupiedSlot[] {
  return [...occupiedFrom(appointments), ...activeHolds(holds, now)];
}

// Times a customer can pick on a date: the admin schedule, minus booked and held blocks.
export function customerTimes(date: string, source: SlotSource, now = Date.now()): string[] {
  if (!isBookableDate(date)) return [];
  return availableTimes(date, { weekly: scheduleToWeekly(source.days), occupied: occupiedSlots(source, now) });
}

// Why a customer cannot book this slot, or null when they can.
export function customerSlotError(date: string, time: string, source: SlotSource, now = Date.now()): BookingError | null {
  return bookingError(date, time, { weekly: scheduleToWeekly(source.days), occupied: occupiedSlots(source, now) });
}
