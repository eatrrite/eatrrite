"use client";

import { Clock3 } from "lucide-react";
import { AdminMotion, AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ScheduleEditor } from "@/components/admin/schedule/ScheduleEditor";

export default function AdminSchedulePage() {
  return (
    <AdminPage>
      <AdminPageHeader
        eyebrow="Schedule"
        title="Consultation Schedule"
        description="Set your consultation hours for each day. You can add multiple time slots if you have breaks during the day."
      >
        <aside className="flex max-w-sm items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-foreground">
          <Clock3 className="mt-0.5 size-4 shrink-0 text-primary" />
          <p>
            These timings will be used for appointment booking and availability.
          </p>
        </aside>
      </AdminPageHeader>

      <AdminMotion delay={0.35}>
        <ScheduleEditor />
      </AdminMotion>
    </AdminPage>
  );
}
