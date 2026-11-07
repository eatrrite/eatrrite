"use client";

import { parseISO } from "date-fns";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DashboardFiltersBar } from "@/components/admin/dashboard/DashboardFiltersBar";
import { ADMIN_USER_PROFILE } from "@/constants/admin/admin";
import { DASHBOARD_REFERENCE_DATE } from "@/constants/admin/dashboard/reference";
import type { DashboardFilters } from "@/types/admin/dashboard";

type DashboardPageHeaderProps = {
  filters: DashboardFilters;
  onChange: (next: DashboardFilters) => void;
};

function greetingForHour(hour: number) {
  if (hour < 12) return "Good Morning,";
  if (hour < 17) return "Good Afternoon,";
  return "Good Evening,";
}

export function DashboardPageHeader({
  filters,
  onChange,
}: DashboardPageHeaderProps) {
  const greeting = greetingForHour(
    parseISO(DASHBOARD_REFERENCE_DATE).getHours(),
  );

  return (
    <AdminPageHeader
      lead={greeting}
      title={
        <>
          {ADMIN_USER_PROFILE.displayName}{" "}
          <span aria-hidden="true">👋</span>
        </>
      }
      description="Here's what's happening at Eat Rrite today."
    >
      <DashboardFiltersBar filters={filters} onChange={onChange} />
    </AdminPageHeader>
  );
}
