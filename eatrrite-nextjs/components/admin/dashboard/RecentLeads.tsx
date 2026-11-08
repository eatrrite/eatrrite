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
import { useClinicStore } from "@/stores/adminStore";
import { buildRecentPatientRows } from "@/utils/admin/dashboardRecentPatients";
import { cn } from "cn";

export function RecentPatients() {
  const patients = useClinicStore((s) => s.patients);
  const appointments = useClinicStore((s) => s.appointments);
  const rows = useMemo(
    () => buildRecentPatientRows(patients, appointments),
    [patients, appointments],
  );

  return (
    <DashboardCard>
      <DashboardCardHeader
        icon={<Users className="size-4" />}
        title="Recent Patients"
        action={
          <Link
            href="/admin/patients"
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
        {rows.map((patient) => (
          <li key={patient.id}>
            <Link
              href={`/admin/patients?id=${patient.id}`}
              className="flex items-center gap-3 py-3.5 transition-colors hover:bg-muted/40"
            >
              <DashboardAvatar name={patient.name} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {patient.name}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  Last visit • {patient.lastVisitLabel}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
