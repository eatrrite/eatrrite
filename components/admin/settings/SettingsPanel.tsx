"use client";

import { Bell } from "lucide-react";
import {
  DashboardCard,
  DashboardCardHeader,
} from "@/components/admin/dashboard/DashboardCard";
import { SettingsToggleRow } from "@/components/admin/settings/SettingsToggleRow";
import { SETTINGS_TOGGLES } from "@/constants/admin/settings";
import { useAdminStore } from "@/stores/useAdminStore";

export function SettingsPanel() {
  const settings = useAdminStore();

  return (
    <DashboardCard>
      <DashboardCardHeader
        icon={<Bell className="size-4" />}
        tone="gold"
        title="Notifications"
        subtitle="Saved to your admin account"
      />
      <div>
        {SETTINGS_TOGGLES.map((item) => (
          <SettingsToggleRow
            key={item.key}
            title={item.title}
            description={item.description}
            checked={settings[item.key]}
            onCheckedChange={(checked) => {
              settings.setSetting(item.key, checked, {
                title: checked ? `${item.title} on` : `${item.title} off`,
                description: item.description,
              });
            }}
          />
        ))}
      </div>
    </DashboardCard>
  );
}
