"use client";

import { useState } from "react";
import { AdminMotion, AdminPage } from "@/components/admin/AdminPage";
import { AppointmentsChart } from "@/components/admin/dashboard/AppointmentsChart";
import { DashboardPageHeader } from "@/components/admin/dashboard/DashboardPageHeader";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { RecentPatients } from "@/components/admin/dashboard/RecentPatients";
import { TodayAppointments } from "@/components/admin/dashboard/TodayAppointments";
import { TodayTodo } from "@/components/admin/dashboard/TodayTodo";
import type { DashboardFilters } from "@/types/admin/dashboard";

const INITIAL_FILTERS: DashboardFilters = {
  range: "all",
  status: "all",
};

export default function AdminDashboardPage() {
  const [filters, setFilters] = useState<DashboardFilters>(INITIAL_FILTERS);

  return (
    <AdminPage>
      <AdminMotion delay={0.05}>
        <DashboardPageHeader filters={filters} onChange={setFilters} />
      </AdminMotion>

      <AdminMotion delay={0.22}>
        <DashboardStats filters={filters} />
      </AdminMotion>

      <AdminMotion delay={0.4}>
        <div className="grid gap-4 lg:grid-cols-2">
          <AppointmentsChart />
          <TodayTodo />
          <TodayAppointments />
          <RecentPatients />
        </div>
      </AdminMotion>
    </AdminPage>
  );
}
