"use client";

import { AppointmentStatusBadge } from "@/components/admin/appointments/AppointmentStatusBadge";
import type { Appointment } from "@/types/admin/appointment";
import type { DataTableColumn } from "@/types/admin/dataTable";

export function getAppointmentListColumns(
  leadName: (leadId: string) => string,
): DataTableColumn<Appointment>[] {
  return [
    {
      key: "lead",
      header: "Lead",
      width: 40,
      cell: (item) => (
        <span className="font-medium">{leadName(item.leadId)}</span>
      ),
    },
    { key: "date", header: "Date", width: 30, cell: (item) => item.date },
    {
      key: "status",
      header: "Status",
      width: 30,
      cell: (item) => <AppointmentStatusBadge status={item.status} />,
    },
  ];
}
