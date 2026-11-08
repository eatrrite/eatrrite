import {
  STATUS_BADGE_BASE,
  STATUS_TONES,
  type StatusTone,
} from "@/constants/admin/statusTones";
import type { DashboardAppointmentStatus } from "@/types/admin/dashboard";
import { cn } from "cn";

const STATUS_TONE_BY_STATUS: Record<DashboardAppointmentStatus, StatusTone> = {
  completed: "success",
  in_progress: "active",
  upcoming: "pending",
};

const STATUS_LABELS: Record<DashboardAppointmentStatus, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  upcoming: "Upcoming",
};

export function DashboardStatusBadge({ status }: { status: DashboardAppointmentStatus }) {
  return (
    <span
      className={cn(STATUS_BADGE_BASE, STATUS_TONES[STATUS_TONE_BY_STATUS[status]])}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
