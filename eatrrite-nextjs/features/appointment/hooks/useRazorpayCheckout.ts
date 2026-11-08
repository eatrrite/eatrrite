"use client";

import { BRAND } from "@/constants/brand";
import type { RazorpayOptions, RazorpaySuccess } from "@/features/appointment/types/razorpay";

const SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

/** The order from POST /api/appointments, with the held slot and how long it is held. */
export type CheckoutOrder = { orderId: string; amount: number; currency: string; keyId: string; holdId: string; holdMinutes: number };
export type CheckoutPrefill = { name: string; email: string; contact: string };
export type CheckoutResult =
  | { status: "paid"; payment: RazorpaySuccess }
  | { status: "dismissed" }
  | { status: "failed"; message: string };

// Loads checkout.js once. Resolves false if it cannot load (offline, blocked).
function loadScript(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// Builds the checkout options. The checkout closes itself before the slot hold
// ends, so a payment can never land on an expired hold.
function checkoutOptions(order: CheckoutOrder, prefill: CheckoutPrefill, done: (r: CheckoutResult) => void): RazorpayOptions {
  return {
    key: order.keyId,
    amount: order.amount,
    currency: order.currency,
    order_id: order.orderId,
    name: BRAND.name,
    description: "Consultation booking",
    image: BRAND.logo,
    timeout: (order.holdMinutes - 2) * 60,
    prefill,
    theme: { color: BRAND.themeColor },
    handler: (payment) => done({ status: "paid", payment }),
    modal: { ondismiss: () => done({ status: "dismissed" }), confirm_close: true },
  };
}

// Opens Razorpay Standard Checkout and waits for the outcome.
async function openCheckout(order: CheckoutOrder, prefill: CheckoutPrefill): Promise<CheckoutResult> {
  if (!(await loadScript()) || !window.Razorpay) {
    return { status: "failed", message: "Payment window could not load. Check your connection and try again." };
  }
  const Razorpay = window.Razorpay;
  return new Promise((resolve) => {
    // A failed attempt is not the end: Razorpay lets the customer retry inside the
    // window. Only a success or closing the window ends it, so a late success is never lost.
    let lastFailure = "";
    const finish = (result: CheckoutResult) =>
      resolve(result.status === "dismissed" && lastFailure ? { status: "failed", message: lastFailure } : result);
    const checkout = new Razorpay(checkoutOptions(order, prefill, finish));
    checkout.on("payment.failed", (response) => {
      lastFailure = response.error.description ?? "Payment failed. Please try again.";
    });
    checkout.open();
  });
}

export function useRazorpayCheckout() {
  return { openCheckout };
}
