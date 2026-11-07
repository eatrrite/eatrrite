"use client";

import { AppointmentStatusBadge } from "@/components/admin/appointments/AppointmentStatusBadge";
import type { Appointment } from "@/types/admin/admin";
import type { DataTableColumn } from "@/types/admin/dataTable";

export function getAppointmentListColumns(
  patientName: (patientId: string) => string,
): DataTableColumn<Appointment>[] {
  return [
    {
      key: "patient",
      header: "Patient",
      width: 40,
      cell: (item) => (
        <span className="font-medium">{patientName(item.patientId)}</span>
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
