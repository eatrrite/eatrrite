"use client";

import { format, parseISO } from "date-fns";
import { WalletCards } from "lucide-react";
import { DashboardAvatar } from "@/components/admin/dashboard/DashboardAvatar";
import { AppointmentStatusBadge, appointmentAvatarTone } from "@/components/admin/appointments/AppointmentStatusBadge";
import type { Appointment } from "@/types/admin/appointment";
import type { DataTableColumn } from "@/types/admin/dataTable";
import { formatTimeLabel } from "@/utils/admin/time";

export function getAppointmentListColumns(
  leadName: (leadId: string) => string,
): DataTableColumn<Appointment>[] {
  return [
    {
      key: "lead",
      header: "Lead name",
      width: 40,
      // The name, with "Payment due" under it while the fee is owed (laid out like the date's
      // weekday line), so the status column holds only the status.
      cell: (item) => (
        <span className="flex min-w-0 items-center gap-3">
          <DashboardAvatar name={leadName(item.leadId)} toneClass={appointmentAvatarTone(item)} className="size-8 text-[11px]" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-medium text-ink">{leadName(item.leadId)}</span>
            {!item.paymentDone && item.status !== "cancelled" ? (
              <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-alert-text">
                <WalletCards aria-hidden className="size-3.5 shrink-0" />
                Payment due
              </span>
            ) : null}
          </span>
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
      width: 30,
      // "19 Nov 2026", with the weekday and time under it ("Thu · 8:30 PM").
      cell: (item) => (
        <span className="flex flex-col leading-tight">
          <span className="truncate text-ink">{format(parseISO(item.date), "d MMM yyyy")}</span>
          <span className="mt-0.5 truncate text-xs text-muted-foreground">
            {format(parseISO(item.date), "EEE")} · {formatTimeLabel(item.time)}
          </span>
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: 30,
      cell: (item) => <AppointmentStatusBadge status={item.status} />,
    },
  ];
}
