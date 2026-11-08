"use client";

import { useMemo } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { DashboardAvatar } from "@/components/admin/dashboard/DashboardAvatar";
import {
  DashboardCard,
  DashboardCardHeader,
} from "@/components/admin/dashboard/DashboardCard";
import { VisitStatusBadge } from "@/components/admin/dashboard/VisitStatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { DASHBOARD_REFERENCE_DATE } from "@/constants/admin/dashboard/reference";
import { useClinicStore } from "@/stores/adminStore";
import { buildTodayVisits } from "@/utils/admin/dashboardTodayVisits";
import { formatTimeLabel } from "@/utils/admin/time";
import { cn } from "cn";

export function TodayAppointments() {
  const appointments = useClinicStore((s) => s.appointments);
  const getLead = useClinicStore((s) => s.getLead);
  const rows = useMemo(
    () =>
      buildTodayVisits(
        appointments,
        (id) => getLead(id)?.name ?? "Unknown",
        DASHBOARD_REFERENCE_DATE,
      ),
    [appointments, getLead],
  );

  return (
    <DashboardCard>
      <DashboardCardHeader
        icon={<CalendarDays className="size-4" />}
        title="Today's Appointments"
        action={
          <Link
            href="/admin/appointments"
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
        {rows.map((visit) => (
          <li key={visit.id}>
            <Link
              href={`/admin/appointments?id=${visit.id}`}
              className="flex flex-wrap items-center gap-3 py-3 transition-colors hover:bg-muted/40 sm:flex-nowrap"
            >
              <span className="w-20 shrink-0 text-sm text-muted-foreground tabular-nums">
                {formatTimeLabel(visit.time)}
              </span>
              <DashboardAvatar name={visit.leadName} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {visit.leadName}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {visit.service}
                </p>
              </div>
              <VisitStatusBadge status={visit.status} />
            </Link>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
