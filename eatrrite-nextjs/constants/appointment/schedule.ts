// Booking rules, copied from appointment-form/config.php and constants/schedule.php.
export const MEETING_MINUTES = 30;
export const PREP_MINUTES = 15;
export const BLOCK_MINUTES = MEETING_MINUTES + PREP_MINUTES;
export const SLOT_STEP_MINUTES = 15;
export const HOLD_MINUTES = 15;
export const BOOKING_DAYS_AHEAD = 30;
export const IST_OFFSET = "+05:30";
export const CURRENCY = "INR";

const WEEKDAY_HOURS: [string, string][] = [
  ["11:30", "14:00"],
  ["15:30", "17:30"],
  ["20:30", "21:30"],
];

// Index 0 is Sunday. An empty list means closed.
export const WEEKLY_HOURS: [string, string][][] = [
  [["11:30", "13:00"]],
  WEEKDAY_HOURS,
  WEEKDAY_HOURS,
  WEEKDAY_HOURS,
  WEEKDAY_HOURS,
  [],
  [["11:30", "14:30"]],
];

export const SERVICES = [
  "Nutrition for Weight & Lifestyle Management",
  "Nutrition for Diabetes Management & Reversal",
  "Nutrition for Gut Health",
  "Female Hormone Health Diet Program",
];

export const HOURS_NOTE =
  "Mon–Thu 11:30 AM–2:00 PM, 3:30 PM–5:30 PM, 8:30 PM–9:30 PM · Fri unavailable · Sat 11:30 AM–2:30 PM · Sun 11:30 AM–1:00 PM";
