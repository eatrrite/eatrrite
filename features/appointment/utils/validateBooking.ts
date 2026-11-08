import type { BookingInput } from "@/features/appointment/types/booking";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[6-9]\d{9}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^\d{2}:\d{2}$/;

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

// Returns a clean booking, or an error message for the customer. `services` is er_services.
export function validateBooking(body: Record<string, unknown>, services: string[]): BookingInput | string {
  const input: BookingInput = {
    name: text(body.name),
    email: text(body.email).toLowerCase(),
    phone: text(body.phone).replace(/\D/g, "").slice(-10),
    service: text(body.service),
    date: text(body.date),
    time: text(body.time),
  };
  if (!services.includes(input.service)) return "Please select a service.";
  if (input.name.length < 2 || input.name.length > 80) return "Please enter your full name.";
  if (!EMAIL.test(input.email)) return "Please enter a valid email address.";
  if (!PHONE.test(input.phone)) return "Please enter a valid 10-digit mobile number.";
  if (!DATE.test(input.date) || !TIME.test(input.time)) return "Select an available date and time to continue.";
  return input;
}
