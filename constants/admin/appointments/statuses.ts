import type { AppointmentStatus } from "@/types/admin/appointment";

export const APPOINTMENT_STATUSES = [
  "upcoming",
  "completed",
  "not-attended",
  "cancelled",
] as const satisfies readonly AppointmentStatus[];

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> =
  {
    upcoming: "Upcoming",
    completed: "Completed",
    "not-attended": "Not attended",
    cancelled: "Cancelled",
  };

export const APPOINTMENT_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All statuses" },
  ...APPOINTMENT_STATUSES.map((status) => ({
    value: status,
    label: APPOINTMENT_STATUS_LABELS[status],
  })),
] as const;

/** Payment filter on the Appointments list, from payment_done. */
export const APPOINTMENT_PAYMENT_FILTER_OPTIONS = [
  { value: "all", label: "All payments" },
  { value: "paid", label: "Paid" },
  { value: "due", label: "Payment due" },
] as const;
