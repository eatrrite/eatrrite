import { APPOINTMENT_STATUS_LABELS } from "@/constants/admin/appointments/statuses";
import {
  STATUS_BADGE_BASE,
  STATUS_TONES,
  type StatusTone,
} from "@/constants/admin/statusTones";
import type { AppointmentStatus } from "@/types/admin/appointment";
import { cn } from "cn";

export const APPOINTMENT_STATUS_TONES: Record<AppointmentStatus, StatusTone> = {
  upcoming: "pending",
  completed: "success",
  "not-attended": "muted",
  // Grey, not red: red is kept for what needs action (a payment due), and a cancelled one needs none.
  cancelled: "muted",
};

/**
 * Colour for an appointment's avatar: pink while its fee is due (needs action), otherwise the
 * status chip's colour, so the avatar and the chip in a row agree.
 */
export function appointmentAvatarTone(appointment: { status: AppointmentStatus; paymentDone: boolean }) {
  const due = !appointment.paymentDone && appointment.status !== "cancelled";
  return STATUS_TONES[due ? "danger" : APPOINTMENT_STATUS_TONES[appointment.status]];
}

type AppointmentStatusBadgeProps = {
  status: AppointmentStatus;
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
