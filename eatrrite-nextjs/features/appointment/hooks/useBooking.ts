"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { confirmedPath } from "@/constants/routes";
import { useRazorpayCheckout } from "@/features/appointment/hooks/useRazorpayCheckout";
import { releaseHold, startBooking, verifyPayment } from "@/features/appointment/services/bookingApi";
import type { BookingInput } from "@/features/appointment/types/booking";
import { useShowToast } from "@/hooks/useShowToast";

// Runs the booking: the server checks and holds the slot and creates the order → Razorpay
// checkout → the server verifies the payment and saves the booking → confirmation page.
// Every outcome shows a toast. `error` is only for the case where money was taken but the
// booking could not be completed: that message must stay on screen.
export function useBooking() {
  const router = useRouter();
  const { openCheckout } = useRazorpayCheckout();
  const showToast = useShowToast();
  const locked = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const fail = (title: string, description: string) => {
    showToast({ title, description, type: "error" });
    return false;
  };

  // Returns true when the booking is saved.
  async function pay(input: BookingInput): Promise<boolean> {
    const order = await startBooking(input);
    if (!order.ok) return fail("Could not start the booking", order.error);
    // The payment did not happen, so the slot goes back to everyone.
    const stop = (title: string, description: string) => {
      void releaseHold(order.holdId);
      return fail(title, description);
    };

    const prefill = { name: input.name, email: input.email, contact: input.phone };
    const result = await openCheckout(order, prefill);
    if (result.status === "dismissed") {
      void releaseHold(order.holdId);
      showToast({ title: "Payment cancelled", description: "No money was taken. Pick your slot again to retry.", type: "info" });
      return false;
    }
    if (result.status === "failed") return stop("Payment failed", result.message);

    const saved = await verifyPayment(result.payment, order.holdId, input);
    if (!saved.ok) {
      // Money was taken, so keep the hold and do not invite another payment.
      const message = `${saved.error} Payment reference: ${result.payment.razorpay_payment_id}.`;
      setError(message);
      return fail("Booking not completed", message);
    }
    showToast({ title: "Payment successful", description: "Your slot is booked. One last step: the questionnaire.", type: "success" });
    router.push(confirmedPath(saved.appointmentId));
    return true;
  }

  async function book(input: BookingInput) {
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    setError("");
    let saved = false;
    try {
      saved = await pay(input);
    } catch {
      fail("Something went wrong", "Please try again.");
    } finally {
      // After a saved booking the page moves on, so the form stays locked.
      locked.current = saved;
      if (!saved) setBusy(false);
    }
  }

  return { book, busy, error };
}
