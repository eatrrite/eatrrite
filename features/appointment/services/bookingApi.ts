import { API } from "@/features/appointment/constants/api";
import type { CheckoutOrder } from "@/features/appointment/hooks/useRazorpayCheckout";
import type { BookingInput } from "@/features/appointment/types/booking";
import type { RazorpaySuccess } from "@/features/appointment/types/razorpay";

type ApiResult<T> = ({ ok: true } & T) | { ok: false; error: string };

const NETWORK_ERROR = "Network error. Please check your connection and try again.";

// One POST helper for the browser. Network errors become a readable message.
async function post<T>(url: string, body: unknown): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch {
    return { ok: false, error: NETWORK_ERROR };
  }
}

// Checks the slot, holds it and creates the Razorpay order.
export const startBooking = (input: BookingInput) => post<CheckoutOrder>(API.appointments, input);

// Frees a held slot after the payment was closed or failed. Best effort: the hold runs out anyway.
export const releaseHold = (holdId: string) => post<{ released: true }>(API.releaseHold, { holdId });

// Checks the payment signature and saves the booking. Returns the new appointment's id.
export const verifyPayment = (payment: RazorpaySuccess, holdId: string, booking: BookingInput) =>
  post<{ appointmentId: string }>(API.verifyPayment, { ...payment, holdId, booking });

// Open start times for every bookable day, keyed by date.
export async function fetchAvailability(): Promise<ApiResult<{ days: Record<string, string[]> }>> {
  try {
    return await (await fetch(API.slots, { cache: "no-store" })).json();
  } catch {
    return { ok: false, error: NETWORK_ERROR };
  }
}
