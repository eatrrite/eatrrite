import type { Appointment, PaymentStatus } from "@/types/admin/appointment";

/**
 * What an appointment's payment means for the admin, from payment_status and the status:
 * - "due": the fee is owed (not for a cancelled one, which owes nothing); needs action, so red
 * - "done": paid (a cancelled one too, until "Mark as refunded" in the details)
 * - "refunded": given back
 * - null: nothing to show (due but cancelled)
 */
export type PaymentState = "due" | "done" | "refunded";

export function paymentState(item: Pick<Appointment, "status" | "paymentStatus">): PaymentState | null {
  const cancelled = item.status === "cancelled";
  if (item.paymentStatus === "refunded") return "refunded";
  if (item.paymentStatus === "paid") return "done";
  return cancelled ? null : "due";
}

export const needsPaymentAction = (item: Pick<Appointment, "status" | "paymentStatus">) => paymentState(item) === "due";

export const PAYMENT_STATE_LABELS: Record<PaymentState, string> = {
  due: "Payment due",
  done: "Payment done",
  refunded: "Refunded",
};

/** Names for payment_status in the form and the filter. */
export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  paid: "Paid",
  due: "Due",
  refunded: "Refunded",
};
