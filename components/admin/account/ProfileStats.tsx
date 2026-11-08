"use client";

import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { useAdminStore } from "@/stores/useAdminStore";

export function ProfileStats() {
  const leads = useAdminStore((s) => s.leads);
  const appointments = useAdminStore((s) => s.appointments);
  const todos = useAdminStore((s) => s.todos);
  const openTodos = todos.filter((todo) => !todo.done).length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      <AdminStatCard
        label="Leads"
        value={leads.length}
        hint="In your lead list"
      />
      <AdminStatCard
        label="Appointments"
        value={appointments.length}
        hint="Total consultations logged"
      />
      <AdminStatCard
        label="Open todos"
        value={openTodos}
        hint="Still on today’s list"
        className="col-span-2 sm:col-span-1"
      />
    </div>
  );
}
