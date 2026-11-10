"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Settings, Users } from "lucide-react";
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
              className="group flex items-center gap-3 rounded-xl border border-border/80 px-3 py-3 text-sm font-medium text-ink transition-[background-color,border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-beige"
            >
              <span className={cn("inline-flex size-8 items-center justify-center rounded-lg", ICON_TONES[item.tone])}>
                <Icon className="size-4" />
              </span>
              {item.label}
              <ArrowRight aria-hidden className="ml-auto size-4 -translate-x-1 text-primary opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          );
        })}
      </div>
    </DashboardCard>
  );
}
