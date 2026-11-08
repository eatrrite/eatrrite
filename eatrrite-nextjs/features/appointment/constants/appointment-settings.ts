import type { BookingSettings } from "@/features/appointment/types/slots";

// Fixed facts about the business. These never change from the admin.
export const APPOINTMENT_SETTINGS = {
  timezone: "Asia/Kolkata",
  utcOffset: "+05:30",
  utcOffsetMinutes: 330,
  currency: "INR",
} as const;

// The PHP site's booking rules. They are the starting row of er_settings, which the app reads at
// run time (the admin may change them). These values are used only by the check scripts and as
// the shape for a settings row.
const meetingMinutes = 30;
const prepMinutes = 15;
export const DEFAULT_BOOKING_SETTINGS: BookingSettings = {
  meetingMinutes,
  prepMinutes,
  blockMinutes: meetingMinutes + prepMinutes,
  startStepMinutes: 15,
  holdMinutes: 15,
  bookingDaysAhead: 30,
  feeRupees: 800,
};

// The starting services, seeded into er_services. The app reads er_services.
export const DEFAULT_SERVICES = [
  "Nutrition for Weight & Lifestyle Management",
  "Nutrition for Diabetes Management & Reversal",
  "Nutrition for Gut Health",
  "Female Hormone Health Diet Program",
];
