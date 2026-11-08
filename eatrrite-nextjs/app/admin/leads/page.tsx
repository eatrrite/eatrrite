"use client";

import { Suspense } from "react";
import { AdminMotion, AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { LeadsTable } from "@/components/admin/leads/LeadsTable";

export default function AdminLeadsPage() {
  return (
    <AdminPage>
      <AdminPageHeader
        eyebrow="Leads"
        title="Lead records"
        description="Keep a lightweight lead list ready for appointments."
      />
      <AdminMotion>
        <Suspense fallback={null}>
          <LeadsTable />
        </Suspense>
      </AdminMotion>
    </AdminPage>
  );
}
