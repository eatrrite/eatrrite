"use client";

import { format, parseISO } from "date-fns";
import { DashboardAvatar } from "@/components/admin/dashboard/DashboardAvatar";
import { PaymentDueBadge } from "@/components/admin/appointments/AppointmentPaymentRow";
import { AppointmentStatusBadge } from "@/components/admin/appointments/AppointmentStatusBadge";
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
      cell: (item) => (
        <span className="flex min-w-0 items-center gap-3">
          <DashboardAvatar name={leadName(item.leadId)} className="size-8 text-[11px]" />
          <span className="truncate font-medium text-ink">{leadName(item.leadId)}</span>
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
      cell: (item) => (
        <span className="flex flex-wrap items-center gap-1">
          <AppointmentStatusBadge status={item.status} />
          <PaymentDueBadge paymentDone={item.paymentDone} />
        </span>
      ),
    },
  ];
}
