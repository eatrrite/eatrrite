import {
  BLOCK_MINUTES,
  BOOKING_DAYS_AHEAD,
  MEETING_MINUTES,
  SLOT_STEP_MINUTES,
  WEEKLY_HOURS,
} from "@/constants/appointment/schedule";
import { addDays, minutesNowIst, todayIst, weekdayOf } from "@/utils/istTime";

export const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const toTime = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

// True when the date is today or within the booking window.
export function isBookableDate(date: string): boolean {
  const today = todayIst();
  return date >= today && date <= addDays(today, BOOKING_DAYS_AHEAD);
}

// Every start time the weekly hours offer on a date.
export function offeredTimes(date: string): string[] {
  const times: string[] = [];
  for (const [open, close] of WEEKLY_HOURS[weekdayOf(date)]) {
    const last = toMinutes(close) - MEETING_MINUTES;
    for (let t = toMinutes(open); t <= last; t += SLOT_STEP_MINUTES) times.push(toTime(t));
  }
  return times;
}

// A 45-minute block (meeting plus prep) must not overlap a taken one.
function overlapsTaken(time: string, taken: string[]): boolean {
  const start = toMinutes(time);
  return taken.some((t) => start < toMinutes(t) + BLOCK_MINUTES && toMinutes(t) < start + BLOCK_MINUTES);
}

function isPast(date: string, time: string): boolean {
  return date === todayIst() && toMinutes(time) <= minutesNowIst();
}

// Times a customer can still pick on a date.
export function availableTimes(date: string, taken: string[]): string[] {
  if (!isBookableDate(date)) return [];
  return offeredTimes(date).filter((time) => !isPast(date, time) && !overlapsTaken(time, taken));
}
