import { APPOINTMENT_SETTINGS } from "@/features/appointment/constants/appointment-settings";
import type { BookingError, SlotContext } from "@/features/appointment/types/slots";
import { parseClock } from "@/features/appointment/utils/clock";
import { availableTimes, isDisabledSlot, isPastSlot, offeredTimes } from "@/features/appointment/utils/slots";
import { addDays, isValidDate, nowIst } from "@/features/appointment/utils/istTime";

const { bookingDaysAhead } = APPOINTMENT_SETTINGS;

// Today up to and including `bookingDaysAhead` days ahead.
export function isBookableDate(date: string, today = nowIst().date): boolean {
  return isValidDate(date) && date >= today && date <= addDays(today, bookingDaysAhead);
}

const error = (code: BookingError["code"], message: string): BookingError => ({ code, message });

// Why a slot cannot be booked, or null when it can. Checks run in the PHP order:
// valid date, offered and not hidden, inside the booking window, not past, not taken.
export function bookingError(date: string, time: string, context: SlotContext = {}): BookingError | null {
  const { now = nowIst(), weekly, disabled = [] } = context;
  const normalized = parseClock(time);
  if (!isValidDate(date)) return error("invalid-date", "Choose a valid appointment date.");
  if (!normalized || !offeredTimes(date, weekly).includes(normalized) || isDisabledSlot(date, normalized, disabled)) {
    return error("not-offered", "That time slot is not offered.");
  }
  if (!isBookableDate(date, now.date)) {
    return error("out-of-window", `Please choose a date within the next ${bookingDaysAhead} days.`);
  }
  if (isPastSlot(date, normalized, now)) return error("past", "That time has already passed. Pick another slot.");
  if (!availableTimes(date, { ...context, now }).includes(normalized)) {
    return error("taken", "That slot was just booked. Please pick another time.");
  }
  return null;
}
