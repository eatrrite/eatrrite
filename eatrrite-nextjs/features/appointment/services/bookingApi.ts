import { API } from "@/features/appointment/constants/api";
import type { CheckoutOrder } from "@/features/appointment/hooks/useRazorpayCheckout";
import type { BookingInput } from "@/features/appointment/types/booking";
import type { RazorpaySuccess } from "@/features/appointment/types/razorpay";

type ApiResult<T> = ({ ok: true } & T) | { ok: false; error: string };

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
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}

export const startBooking = (input: BookingInput) => post<CheckoutOrder>(API.appointments, input);

export const verifyPayment = (payment: RazorpaySuccess) => post<{ verified: true }>(API.verifyPayment, payment);
