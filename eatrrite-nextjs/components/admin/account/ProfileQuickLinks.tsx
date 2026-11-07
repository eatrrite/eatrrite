"use client";

import Link from "next/link";
import { CalendarDays, Clock3, Settings, Users } from "lucide-react";
import {
  DashboardCard,
  DashboardCardHeader,
} from "@/components/admin/dashboard/DashboardCard";

const LINKS = [
  { href: "/admin/patients", label: "Patients", icon: Users },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/admin/schedule", label: "Schedule", icon: Clock3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
] as const;

export function ProfileQuickLinks() {
  return (
    <DashboardCard>
      <DashboardCardHeader
        icon={<Settings className="size-4" />}
        title="Quick links"
        subtitle="Jump back into admin work"
      />
      <div className="grid gap-2 sm:grid-cols-2">
        {LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl border border-border px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/60"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </DashboardCard>
  );
}
