import { APPOINTMENT_STATUS_LABELS } from "@/constants/admin/appointments/statuses";
import {
  STATUS_BADGE_BASE,
  STATUS_TONES,
  type StatusTone,
} from "@/constants/admin/statusTones";
import type { ClinicAppointmentStatus } from "@/types/admin/appointment";
import { cn } from "cn";

const APPOINTMENT_STATUS_TONES: Record<ClinicAppointmentStatus, StatusTone> = {
  upcoming: "pending",
  completed: "success",
  "not-attended": "muted",
  cancelled: "danger",
};

type AppointmentStatusBadgeProps = {
  status: ClinicAppointmentStatus;
};

export function AppointmentStatusBadge({ status }: AppointmentStatusBadgeProps) {
  return (
    <span
      className={cn(
        STATUS_BADGE_BASE,
        STATUS_TONES[APPOINTMENT_STATUS_TONES[status]],
      )}
    >
      {APPOINTMENT_STATUS_LABELS[status]}
    </span>
  );
}
