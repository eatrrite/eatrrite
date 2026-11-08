"use client";

import { Suspense } from "react";
import { AdminMotion, AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AppointmentsTable } from "@/components/admin/appointments/AppointmentsTable";

export default function AdminAppointmentsPage() {
  return (
    <AdminPage>
      <AdminPageHeader
        eyebrow="Appointments"
        title="Consultation schedule"
        description="Every appointment belongs to a lead. Bookings made on the website appear here after payment."
      />
      <AdminMotion>
        <Suspense fallback={null}>
          <AppointmentsTable />
        </Suspense>
      </AdminMotion>
    </AdminPage>
  );
}
