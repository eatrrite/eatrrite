"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { confirmedPath } from "@/constants/routes";
import { useRazorpayCheckout } from "@/features/appointment/hooks/useRazorpayCheckout";
import { startBooking, verifyPayment } from "@/features/appointment/services/bookingApi";
import type { BookingInput } from "@/features/appointment/types/booking";

const DISMISSED =
  "Payment was cancelled. Your slot is held for a few minutes if you want to try again.";

// Runs the booking: hold slot + create order → Razorpay checkout → verify → confirmed page.
export function useBooking() {
  const router = useRouter();
  const { openCheckout } = useRazorpayCheckout();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function pay(input: BookingInput) {
    const order = await startBooking(input);
    if (!order.ok) return setError(order.error);
    const prefill = { name: input.name, email: input.email, contact: input.phone };
    const result = await openCheckout(order, prefill);
    if (result.status === "dismissed") return setError(DISMISSED);
    if (result.status === "failed") return setError(result.message);
    const verified = await verifyPayment(result.payment);
    if (!verified.ok) return setError(verified.error);
    router.push(confirmedPath(verified.appointmentId));
  }

  async function book(input: BookingInput) {
    if (busy) return;
    setBusy(true);
    setError("");
    await pay(input);
    setBusy(false);
  }

  return { book, busy, error, setError };
}
