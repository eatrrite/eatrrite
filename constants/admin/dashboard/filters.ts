import { APPOINTMENT_STATUS_FILTER_OPTIONS } from "@/constants/admin/appointments/statuses";
import type { DashboardRange } from "@/types/admin/dashboard";

export const DASHBOARD_RANGE_OPTIONS: {
  value: DashboardRange;
  label: string;
}[] = [
  { value: "all", label: "All time" },
  { value: "7d", label: "Last 7 days" },
  { value: "month", label: "This month" },
  { value: "3m", label: "Last 3 months" },
  { value: "6m", label: "Last 6 months" },
];

export const DASHBOARD_STATUS_OPTIONS = APPOINTMENT_STATUS_FILTER_OPTIONS;
