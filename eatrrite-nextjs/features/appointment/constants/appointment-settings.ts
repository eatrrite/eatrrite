// The one place for every appointment rule. Copied from the PHP site
// (appointment-form/config.php and constants/schedule.php).
// Everything else derives from this object: never repeat these numbers.
const meetingMinutes = 30;
const prepMinutes = 15;

export const APPOINTMENT_SETTINGS = {
  timezone: "Asia/Kolkata",
  utcOffset: "+05:30",
  utcOffsetMinutes: 330,
  currency: "INR",
  /** Length of the customer's call. The last start of a window is this long before it closes. */
  meetingMinutes,
  /** Consultant buffer after each call. */
  prepMinutes,
  /** Time one booking occupies: the call plus the buffer. No two bookings may overlap it. */
  blockMinutes: meetingMinutes + prepMinutes,
  /** Start times are offered on this grid inside each working window. */
  startStepMinutes: 15,
  /** A payment in progress holds its slot for this long. */
  holdMinutes: 15,
  /** Customers can book from today up to and including this many days ahead. */
  bookingDaysAhead: 30,
} as const;

export const SERVICES = [
  "Nutrition for Weight & Lifestyle Management",
  "Nutrition for Diabetes Management & Reversal",
  "Nutrition for Gut Health",
  "Female Hormone Health Diet Program",
];
