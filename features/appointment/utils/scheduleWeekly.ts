import type { DaySchedule, Weekday } from "@/types/admin/schedule";
import type { WeeklyHours } from "@/features/appointment/types/slots";
import { WEEKDAYS, isValidWindow } from "@/features/appointment/utils/hours";

const SHORT: Record<Weekday, string> = {
  monday: "mon",
  tuesday: "tue",
  wednesday: "wed",
  thursday: "thu",
  friday: "fri",
  saturday: "sat",
  sunday: "sun",
};

// Working hours as the schedule page edits them: one card per day, windows with ids.
export function weeklyToSchedule(weekly: WeeklyHours): DaySchedule[] {
  return WEEKDAYS.map((day) => ({
    day,
    isOpen: weekly[day].length > 0,
    slots: weekly[day].map((window, index) => ({
      id: `${SHORT[day]}_${index + 1}`,
      openTime: window.start,
      closeTime: window.end,
    })),
  }));
}

// Back to the plain weekly hours the slot rules read. A closed day, or a window
// that ends before it starts, offers no times.
export function scheduleToWeekly(days: DaySchedule[]): WeeklyHours {
  const weekly = Object.fromEntries(WEEKDAYS.map((day) => [day, []])) as unknown as WeeklyHours;
  for (const { day, isOpen, slots } of days) {
    if (!isOpen) continue;
    weekly[day] = slots
      .map((slot) => ({ start: slot.openTime, end: slot.closeTime }))
      .filter(isValidWindow);
  }
  return weekly;
}
