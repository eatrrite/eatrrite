"use client";

import { Switch } from "@/components/ui/switch";

type SettingsToggleRowProps = {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function SettingsToggleRow({
  title,
  description,
  checked,
  onCheckedChange,
}: SettingsToggleRowProps) {
  return (
    <div className="-mx-2 flex items-start justify-between gap-4 rounded-xl border-b border-border/70 px-2 py-4 transition-colors duration-300 last:border-b-0 hover:bg-background">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={title}
      />
    </div>
  );
}
