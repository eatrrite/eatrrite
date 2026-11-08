"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { useMemo } from "react";
import { ListPagination } from "@/components/admin/ListPagination";
import { usePagination } from "@/hooks/admin/usePagination";
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
  const { page, pageCount, pageItems, setPage } = usePagination(rows, 5);

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
      {rows.length === 0 ? (
        <EmptyState size="sm" image="today" title="Nothing booked today" description="Today's consultations will be listed here." />
      ) : null}
      <ul className="divide-y divide-border">
        {pageItems.map((appointment) => (
          <li key={appointment.id}>
            <Link
              href={`/admin/appointments?id=${appointment.id}`}
              className="flex items-center gap-2.5 py-3 transition-colors hover:bg-muted/40 sm:gap-3"
            >
              <span className="w-[4.25rem] shrink-0 text-sm sm:w-20 text-muted-foreground tabular-nums">
                {formatTimeLabel(appointment.time)}
              </span>
              {/* No room for the avatar on phones: the name matters more. */}
              <span className="hidden sm:block">
                <DashboardAvatar name={appointment.leadName} />
              </span>
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
      <ListPagination className="mt-3" page={page} pageCount={pageCount} onPageChange={setPage} />
    </DashboardCard>
  );
}
