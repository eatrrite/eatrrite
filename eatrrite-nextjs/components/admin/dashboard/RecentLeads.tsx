"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import { DashboardAvatar } from "@/components/admin/dashboard/DashboardAvatar";
import {
  DashboardCard,
  DashboardCardHeader,
} from "@/components/admin/dashboard/DashboardCard";
import { buttonVariants } from "@/components/ui/button";
import { useAdminStore } from "@/stores/useAdminStore";
import { buildRecentLeadRows } from "@/utils/admin/dashboardRecentLeads";
import { cn } from "cn";

export function RecentLeads() {
  const leads = useAdminStore((s) => s.leads);
  const appointments = useAdminStore((s) => s.appointments);
  const rows = useMemo(
    () => buildRecentLeadRows(leads, appointments),
    [leads, appointments],
  );

  return (
    <DashboardCard>
      <DashboardCardHeader
        icon={<Users className="size-4" />}
        tone="coral"
        title="Recent leads"
        action={
          <Link
            href="/admin/leads"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-full",
            )}
          >
            View all
          </Link>
        }
      />
      <ul className="divide-y divide-border">
        {rows.map((lead) => (
          <li key={lead.id}>
            <Link
              href={`/admin/leads?id=${lead.id}`}
              className="flex items-center gap-3 py-3.5 transition-colors hover:bg-muted/40"
            >
              <DashboardAvatar name={lead.name} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {lead.name}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  Last appointment • {lead.lastAppointmentLabel}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
