"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { confirmedPath } from "@/constants/routes";
import { useRazorpayCheckout } from "@/features/appointment/hooks/useRazorpayCheckout";
import { startBooking, verifyPayment } from "@/features/appointment/services/bookingApi";
import type { BookingInput } from "@/features/appointment/types/booking";
import { useShowToast } from "@/hooks/useShowToast";
import { useAdminStore } from "@/stores/useAdminStore";

// Runs the booking: hold the slot → create order → Razorpay checkout → verify → confirm in the store.
// Every outcome shows a toast. `error` is only for the case where money was taken but the booking
// could not be completed: that message must stay on screen.
export function useBooking() {
  const router = useRouter();
  const { openCheckout } = useRazorpayCheckout();
  const holdSlot = useAdminStore((s) => s.holdSlot);
  const releaseHold = useAdminStore((s) => s.releaseHold);
  const confirmBooking = useAdminStore((s) => s.confirmBooking);
  const showToast = useShowToast();
  const locked = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const fail = (title: string, description: string) => {
    showToast({ title, description, type: "error" });
    return false;
  };

  // Money was taken but the booking is not complete: keep the hold and tell the customer clearly.
  const paidButStuck = (title: string, description: string) => {
    setError(description);
    return fail(title, description);
  };

  // Returns true when the booking is confirmed.
  async function pay(input: BookingInput): Promise<boolean> {
    const hold = holdSlot({ date: input.date, time: input.time });
    if (!hold.ok) return fail("Slot not available", hold.error);
    // The payment did not happen, so the slot goes back to everyone.
    const stop = (title: string, description: string) => {
      releaseHold(hold.holdId);
      return fail(title, description);
    };

    const order = await startBooking(input);
    if (!order.ok) return stop("Could not start the payment", order.error);
    const prefill = { name: input.name, email: input.email, contact: input.phone };
    const result = await openCheckout(order, prefill);
    if (result.status === "dismissed") {
      releaseHold(hold.holdId);
      showToast({ title: "Payment cancelled", description: "No money was taken. Pick your slot again to retry.", type: "info" });
      return false;
    }
    if (result.status === "failed") return stop("Payment failed", result.message);

    const { razorpay_payment_id: paymentId } = result.payment;
    const verified = await verifyPayment(result.payment);
    if (!verified.ok) {
      return paidButStuck("Payment could not be verified", `Payment ${paymentId} was received but could not be verified. Please contact us before paying again.`);
    }
    const confirmed = confirmBooking(input, hold.holdId, paymentId);
    if (!confirmed.ok) return paidButStuck("Slot no longer available", confirmed.error);

    showToast({ title: "Payment successful", description: "Your slot is booked. One last step: the questionnaire.", type: "success" });
    router.push(confirmedPath(confirmed.appointment.id));
    return true;
  }

  async function book(input: BookingInput) {
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    setError("");
    let confirmed = false;
    try {
      confirmed = await pay(input);
    } catch {
      fail("Something went wrong", "Please try again.");
    } finally {
      // After a confirmed booking the page moves on, so the form stays locked.
      locked.current = confirmed;
      if (!confirmed) setBusy(false);
    }
  }

  return { book, busy, error };
}
