"use client";

import { parseISO } from "date-fns";
import { StatsCard } from "@/components/admin/dashboard/StatsCard";
import { DASHBOARD_REFERENCE_DATE } from "@/constants/admin/dashboard/reference";
import { useClinicStore } from "@/stores/adminStore";
import type { DashboardFilters } from "@/types/admin/dashboard";
import { buildDashboardStats } from "@/utils/admin/dashboardStats";

type DashboardStatsProps = {
  filters: DashboardFilters;
};

export function DashboardStats({ filters }: DashboardStatsProps) {
  const leads = useClinicStore((s) => s.leads);
  const appointments = useClinicStore((s) => s.appointments);
  const cards = buildDashboardStats(
    leads,
    appointments,
    filters,
    parseISO(DASHBOARD_REFERENCE_DATE),
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatsCard key={card.id} card={card} />
      ))}
    </div>
  );
}
