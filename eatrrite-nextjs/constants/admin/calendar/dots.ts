import type { ClinicAppointmentStatus } from "@/types/admin/appointment";
import type { StatusTone } from "@/constants/admin/statusTones";

/** Solid indicator dots for month cells (aligned with status badge tones). */
export const STATUS_DOT_CLASS: Record<StatusTone, string> = {
  success: "bg-emerald-500",
  active: "bg-sky-500",
  muted: "bg-zinc-400",
  danger: "bg-red-500",
};

export const APPOINTMENT_STATUS_DOT_TONE: Record<ClinicAppointmentStatus, StatusTone> =
  {
    upcoming: "active",
    completed: "success",
    "not-attended": "muted",
    cancelled: "danger",
  };
