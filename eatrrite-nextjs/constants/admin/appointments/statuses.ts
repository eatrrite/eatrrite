import type { ClinicAppointmentStatus } from "@/types/admin/appointment";

export const APPOINTMENT_STATUSES = [
  "upcoming",
  "completed",
  "not-attended",
  "cancelled",
] as const satisfies readonly ClinicAppointmentStatus[];

export const APPOINTMENT_STATUS_LABELS: Record<ClinicAppointmentStatus, string> =
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
