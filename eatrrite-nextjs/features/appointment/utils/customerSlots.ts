import type { BookingError, BookingSettings, OccupiedSlot, WeeklyHours } from "@/features/appointment/types/slots";
import { bookingError, isBookableDate } from "@/features/appointment/utils/bookable";
import { addDays, nowIst } from "@/features/appointment/utils/istTime";
import { availableTimes } from "@/features/appointment/utils/slots";

/** What the customer-side rules read: the database's hours, rules and taken slots. */
export type SlotSource = { weekly: WeeklyHours; settings: BookingSettings; occupied: OccupiedSlot[] };

// Times a customer can pick on a date: the working hours, minus booked and held blocks.
export function customerTimes(date: string, { weekly, settings, occupied }: SlotSource, today = nowIst().date): string[] {
  if (!isBookableDate(date, today, settings.bookingDaysAhead)) return [];
  return availableTimes(date, { weekly, settings, occupied });
}

// Open times for every bookable day, today included, keyed by date. Days with none are left out.
export function customerAvailability(source: SlotSource, today = nowIst().date): Record<string, string[]> {
  const days = Array.from({ length: source.settings.bookingDaysAhead + 1 }, (_, index) => addDays(today, index));
  return Object.fromEntries(
    days.map((date) => [date, customerTimes(date, source, today)] as const).filter(([, times]) => times.length > 0),
  );
}

// Why a customer cannot book this slot, or null when they can.
export function customerSlotError(date: string, time: string, { weekly, settings, occupied }: SlotSource): BookingError | null {
  return bookingError(date, time, { weekly, settings, occupied });
}
