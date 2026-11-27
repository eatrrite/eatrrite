import type { EnquiryInput } from "@/features/contact/types/enquiry";
import { indianMobile } from "@/utils/phone";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 80, email: 120, city: 60, program: 80, message: 1000 };

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

// Returns a clean enquiry, or an error message for the visitor. Runs on the server, even
// though the form checks the same things first.
export function validateEnquiry(body: Record<string, unknown>): EnquiryInput | string {
  const input: EnquiryInput = {
    name: text(body.name),
    email: text(body.email).toLowerCase(),
    phone: indianMobile(text(body.phone)),
    city: text(body.city),
    program: text(body.program),
    message: text(body.message),
  };
  if (body.consent !== true) return "Please tick the consent box.";
  if (input.name.length < 2 || input.name.length > MAX.name) return "Please enter your full name.";
  if (!input.phone) return "Please enter a valid 10-digit mobile number.";
  if (input.email && (!EMAIL.test(input.email) || input.email.length > MAX.email)) return "Please enter a valid email address, or leave it empty.";
  if (input.city.length > MAX.city) return "Please shorten the city name.";
  if (!input.program || input.program.length > MAX.program) return "Please choose a program.";
  if (input.message.length > MAX.message) return `Please keep your message under ${MAX.message} characters.`;
  return input;
}
