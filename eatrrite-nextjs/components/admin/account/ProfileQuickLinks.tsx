"use client";

import Link from "next/link";
import { CalendarDays, Clock3, Settings, Users } from "lucide-react";
import {
  DashboardCard,
  DashboardCardHeader,
} from "@/components/admin/dashboard/DashboardCard";

import { ICON_TONES } from "@/constants/admin/tones";
import { cn } from "cn";

const LINKS = [
  { href: "/admin/leads", label: "Leads", icon: Users, tone: "coral" },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarDays, tone: "gold" },
  { href: "/admin/schedule", label: "Schedule", icon: Clock3, tone: "teal" },
  { href: "/admin/settings", label: "Settings", icon: Settings, tone: "leaf" },
] as const;

export function ProfileQuickLinks() {
  return (
    <DashboardCard>
      <DashboardCardHeader
        icon={<Settings className="size-4" />}
        tone="leaf"
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
              <span className={cn("inline-flex size-8 items-center justify-center rounded-lg", ICON_TONES[item.tone])}>
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
