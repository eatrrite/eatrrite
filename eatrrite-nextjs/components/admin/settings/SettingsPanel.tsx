"use client";

import { Bell } from "lucide-react";
import {
  DashboardCard,
  DashboardCardHeader,
} from "@/components/admin/dashboard/DashboardCard";
import { SettingsToggleRow } from "@/components/admin/settings/SettingsToggleRow";
import { SETTINGS_TOGGLES } from "@/constants/admin/settings";
import { useShowToast } from "@/hooks/admin/useShowToast";
import { useClinicStore } from "@/stores/adminStore";

export function SettingsPanel() {
  const showToast = useShowToast();
  const settings = useClinicStore();

  return (
    <DashboardCard>
      <DashboardCardHeader
        icon={<Bell className="size-4" />}
        title="Notifications"
        subtitle="Dummy preferences saved in this browser"
      />
      <div>
        {SETTINGS_TOGGLES.map((item) => (
          <SettingsToggleRow
            key={item.key}
            title={item.title}
            description={item.description}
            checked={settings[item.key]}
            onCheckedChange={(checked) => {
              settings.setSetting(item.key, checked);
              showToast({
                title: checked ? `${item.title} on` : `${item.title} off`,
                description: item.description,
                type: "success",
              });
            }}
          />
        ))}
      </div>
    </DashboardCard>
  );
}
