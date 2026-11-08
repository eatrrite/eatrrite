"use client";

import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { useClinicStore } from "@/stores/adminStore";

export function ProfileStats() {
  const leads = useClinicStore((s) => s.leads);
  const appointments = useClinicStore((s) => s.appointments);
  const todos = useClinicStore((s) => s.todos);
  const openTodos = todos.filter((todo) => !todo.done).length;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
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
      />
    </div>
  );
}
