import type { ClinicAppointmentStatus } from "@/types/admin/appointment";
import type { LucideIcon } from "lucide-react";
import type { IconTone } from "@/constants/admin/tones";
import type { DateRange } from "react-day-picker";

export type AppointmentTrendPoint = {
  date: string;
  label: string;
  count: number;
};

export type VisitStatus = "completed" | "in_progress" | "upcoming";

export type DashboardVisit = {
  id: string;
  time: string;
  leadName: string;
  service: string;
  status: VisitStatus;
};

export type RecentLeadRow = {
  id: string;
  name: string;
  lastVisitLabel: string;
};

export type DashboardRange = "all" | "7d" | "month" | "3m" | "6m";
export type DashboardStatusFilter = "all" | ClinicAppointmentStatus;

export type DashboardFilters = {
  range: DashboardRange;
  status: DashboardStatusFilter;
  dateRange?: DateRange;
};

export type StatsCardModel = {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  tone: IconTone;
  trendPercent: number | null;
  trendLabel: string;
};
