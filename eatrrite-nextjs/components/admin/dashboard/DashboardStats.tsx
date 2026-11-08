"use client";

import { parseISO } from "date-fns";
import { StatsCard } from "@/components/admin/dashboard/StatsCard";
import { adminNow } from "@/constants/admin/dashboard/reference";
import { useAdminStore } from "@/stores/useAdminStore";
import type { DashboardFilters } from "@/types/admin/dashboard";
import { buildDashboardStats } from "@/utils/admin/dashboardStats";

type DashboardStatsProps = {
  filters: DashboardFilters;
};

export function DashboardStats({ filters }: DashboardStatsProps) {
  const leads = useAdminStore((s) => s.leads);
  const appointments = useAdminStore((s) => s.appointments);
  const { feeRupees } = useAdminStore((s) => s.settings);
  const cards = buildDashboardStats(
    leads,
    appointments,
    filters,
    parseISO(adminNow()),
    feeRupees,
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatsCard key={card.id} card={card} />
      ))}
    </div>
  );
}
