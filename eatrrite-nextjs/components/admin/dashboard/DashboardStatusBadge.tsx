import {
  STATUS_BADGE_BASE,
  STATUS_TONES,
  type StatusTone,
} from "@/constants/admin/statusTones";
import type { VisitStatus } from "@/types/admin/dashboard";
import { cn } from "cn";

const VISIT_STATUS_TONES: Record<VisitStatus, StatusTone> = {
  completed: "success",
  in_progress: "active",
  upcoming: "pending",
};

const STATUS_LABELS: Record<VisitStatus, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  upcoming: "Upcoming",
};

export function VisitStatusBadge({ status }: { status: VisitStatus }) {
  return (
    <span
      className={cn(STATUS_BADGE_BASE, STATUS_TONES[VISIT_STATUS_TONES[status]])}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
