import type { AppointmentStatus } from "@/types/admin/appointment";
import type { StatusTone } from "@/constants/admin/statusTones";

/** Solid indicator dots for month cells (aligned with status badge tones). */
export const STATUS_DOT_CLASS: Record<StatusTone, string> = {
  success: "bg-accent-green",
  active: "bg-primary",
  pending: "bg-accent",
  muted: "bg-slot-muted",
  danger: "bg-alert-text",
};

export const APPOINTMENT_STATUS_DOT_TONE: Record<AppointmentStatus, StatusTone> =
  {
    upcoming: "pending",
    completed: "success",
    "not-attended": "muted",
    cancelled: "danger",
  };
