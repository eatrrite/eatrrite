"use client";

import { Suspense } from "react";
import { AdminMotion, AdminPage } from "@/components/admin/AdminPage";
import { AddRecordButton } from "@/components/admin/AddRecordButton";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useAdminStore } from "@/stores/useAdminStore";
import { AppointmentsTable } from "@/components/admin/appointments/AppointmentsTable";

export default function AdminAppointmentsPage() {
  // An appointment needs a lead, so Add waits for the first one.
  const hasLeads = useAdminStore((s) => s.leads.length > 0);
  return (
    <AdminPage>
      <AdminPageHeader
        eyebrow="Appointments"
        title="Consultation schedule"
        description="Every appointment belongs to a lead. Bookings made on the website appear here after payment."
        compactActions
      >
        <AddRecordButton kind="appointment" label="Add appointment" disabled={!hasLeads} />
      </AdminPageHeader>
      <AdminMotion>
        <Suspense fallback={null}>
          <AppointmentsTable />
        </Suspense>
      </AdminMotion>
    </AdminPage>
  );
}
