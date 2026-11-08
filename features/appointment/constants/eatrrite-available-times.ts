import type { WeeklyHours } from "@/features/appointment/types/slots";

// Eat Rrite's working hours, India time. An empty day is closed.
// Copied from the PHP site (constants/schedule.php, weekly_hours).
const WEEKDAY_WINDOWS = [
  { start: "11:30", end: "14:00" },
  { start: "15:30", end: "17:30" },
  { start: "20:30", end: "21:30" },
];

export const EATRRITE_AVAILABLE_TIMES: WeeklyHours = {
  monday: WEEKDAY_WINDOWS,
  tuesday: WEEKDAY_WINDOWS,
  wednesday: WEEKDAY_WINDOWS,
  thursday: WEEKDAY_WINDOWS,
  friday: [],
  saturday: [{ start: "11:30", end: "14:30" }],
  sunday: [{ start: "11:30", end: "13:00" }],
};
