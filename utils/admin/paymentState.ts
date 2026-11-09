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

/**
 * The only colours in the appointment lists come from the payment: green done, red on pink due,
 * blue refunded; grey when there is nothing to show. `text` is the line under the name, `avatar`
 * the initials circle.
 */
export const PAYMENT_TONES: Record<PaymentState | "none", { text: string; avatar: string }> = {
  done: { text: "text-green-700", avatar: "bg-green-100 text-green-800" },
  due: { text: "text-alert-text", avatar: "bg-alert-bg text-alert-text" },
  refunded: { text: "text-sky-700", avatar: "bg-sky-100 text-sky-800" },
  none: { text: "text-muted-foreground", avatar: "bg-pill text-muted-foreground" },
};

export const paymentAvatarTone = (item: Pick<Appointment, "status" | "paymentStatus">) =>
  PAYMENT_TONES[paymentState(item) ?? "none"].avatar;
