"use client";

import { useMemo } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { DashboardAvatar } from "@/components/admin/dashboard/DashboardAvatar";
import {
  DashboardCard,
  DashboardCardHeader,
} from "@/components/admin/dashboard/DashboardCard";
import { DashboardStatusBadge } from "@/components/admin/dashboard/DashboardStatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { todayIst } from "@/features/appointment/utils/istTime";
import { useAdminStore } from "@/stores/useAdminStore";
import { buildTodayAppointments } from "@/utils/admin/dashboardTodayAppointments";
import { formatTimeLabel } from "@/utils/admin/time";
import { cn } from "cn";

export function TodayAppointments() {
  const appointments = useAdminStore((s) => s.appointments);
  const getLead = useAdminStore((s) => s.getLead);
  const rows = useMemo(
    () =>
      buildTodayAppointments(
        appointments,
        (id) => getLead(id)?.name ?? "Unknown",
        todayIst(),
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
        {rows.map((appointment) => (
          <li key={appointment.id}>
            <Link
              href={`/admin/appointments?id=${appointment.id}`}
              className="flex flex-wrap items-center gap-3 py-3 transition-colors hover:bg-muted/40 sm:flex-nowrap"
            >
              <span className="w-20 shrink-0 text-sm text-muted-foreground tabular-nums">
                {formatTimeLabel(appointment.time)}
              </span>
              <DashboardAvatar name={appointment.leadName} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {appointment.leadName}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {appointment.service}
                </p>
              </div>
              <DashboardStatusBadge status={appointment.status} />
            </Link>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
