"use client";

import { AdminMotion, AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CalendarWorkspace } from "@/components/admin/calendar/CalendarWorkspace";

export default function AdminCalendarPage() {
  return (
    <AdminPage>
      <AdminPageHeader
        eyebrow="Calendar"
        title="Appointments Calendar"
        description="View and manage all consultations by date."
      />
      <AdminMotion>
        <CalendarWorkspace />
      </AdminMotion>
    </AdminPage>
  );
}
