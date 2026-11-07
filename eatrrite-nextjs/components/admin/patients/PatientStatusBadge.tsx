import { PATIENT_STATUS_LABELS } from "@/constants/admin/patients/statuses";
import {
  STATUS_BADGE_BASE,
  STATUS_TONES,
  type StatusTone,
} from "@/constants/admin/statusTones";
import type { PatientStatus } from "@/types/admin/admin";
import { cn } from "cn";

const PATIENT_STATUS_TONES: Record<PatientStatus, StatusTone> = {
  new: "active",
  "follow-up-one": "muted",
  "follow-up-two": "muted",
  "follow-up-three": "muted",
  done: "success",
};

type PatientStatusBadgeProps = {
  status: PatientStatus;
};

export function PatientStatusBadge({ status }: PatientStatusBadgeProps) {
  return (
    <span
      className={cn(
        STATUS_BADGE_BASE,
        STATUS_TONES[PATIENT_STATUS_TONES[status]],
      )}
    >
      {PATIENT_STATUS_LABELS[status]}
    </span>
  );
}
