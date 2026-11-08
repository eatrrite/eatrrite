import { APPOINTMENT_SETTINGS } from "@/features/appointment/constants/appointment-settings";
import { EATRRITE_AVAILABLE_TIMES } from "@/features/appointment/constants/eatrrite-available-times";
import type { Weekday } from "@/types/admin/schedule";
import type { SlotWindow, TimeWindow, WeeklyHours } from "@/features/appointment/types/slots";
import { parseClock, toMinutes } from "@/features/appointment/utils/clock";
import { displayTime, weekdayOf } from "@/features/appointment/utils/istTime";

const { meetingMinutes, prepMinutes } = APPOINTMENT_SETTINGS;

// Monday first, as in the PHP site.
export const WEEKDAYS: Weekday[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const BY_UTC_DAY: Weekday[] = ["sunday", ...WEEKDAYS.slice(0, 6)];

export const weekdayName = (date: string): Weekday => BY_UTC_DAY[weekdayOf(date)];

// A window needs two readable times, the second after the first.
export function isValidWindow(window: TimeWindow): boolean {
  const start = parseClock(window.start);
  const end = parseClock(window.end);
  return start !== null && end !== null && toMinutes(end) > toMinutes(start);
}

// The working windows of a date, in minutes, with the limits the rules put on them.
export function windowsFor(date: string, weekly: WeeklyHours = EATRRITE_AVAILABLE_TIMES): SlotWindow[] {
  return weekly[weekdayName(date)].filter(isValidWindow).map(({ start, end }) => {
    const startMinutes = toMinutes(parseClock(start)!);
    const endMinutes = toMinutes(parseClock(end)!);
    return {
      start: startMinutes,
      end: endMinutes,
      latestStart: endMinutes - meetingMinutes,
      capacityEnd: endMinutes + prepMinutes,
    };
  });
}

const formatWindows = (windows: TimeWindow[]) =>
  windows.length === 0 ? "unavailable" : windows.map((w) => `${displayTime(w.start)}–${displayTime(w.end)}`).join(", ");

const shortName = (day: Weekday) => day[0].toUpperCase() + day.slice(1, 3);

// "Mon–Thu 11:30 AM–2:00 PM, … · Fri unavailable · Sat …": runs of days with the same hours share one label.
export function hoursNote(weekly: WeeklyHours = EATRRITE_AVAILABLE_TIMES): string {
  const runs: { days: Weekday[]; hours: string }[] = [];
  for (const day of WEEKDAYS) {
    const hours = formatWindows(weekly[day]);
    const last = runs[runs.length - 1];
    if (last && last.hours === hours) last.days.push(day);
    else runs.push({ days: [day], hours });
  }
  return runs
    .map(({ days, hours }) => {
      const label = days.length > 2 ? `${shortName(days[0])}–${shortName(days[days.length - 1])}` : days.map(shortName).join("–");
      return `${label} ${hours}`;
    })
    .join(" · ");
}
