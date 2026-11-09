"use client";

import { AdminMotion, AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SettingsPanel } from "@/components/admin/settings/SettingsPanel";

export default function AdminSettingsPage() {
  return (
    <AdminPage>
      <AdminPageHeader
        eyebrow="Settings"
        title="Admin preferences"
        description="Simple toggles for reminders and notifications, saved to your admin account."
      />
      <AdminMotion>
        <div className="max-w-2xl">
          <SettingsPanel />
        </div>
      </AdminMotion>
    </AdminPage>
  );
}
