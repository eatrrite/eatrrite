"use client";

import { PatientStatusBadge } from "@/components/admin/patients/PatientStatusBadge";
import type { Patient } from "@/types/admin/admin";
import type { DataTableColumn } from "@/types/admin/dataTable";

export const PATIENT_LIST_COLUMNS: DataTableColumn<Patient>[] = [
  {
    key: "name",
    header: "Name",
    width: 40,
    cell: (patient) => (
      <span className="font-medium">{patient.name}</span>
    ),
  },
  { key: "phone", header: "Phone", width: 30, cell: (p) => p.phone },
  {
    key: "status",
    header: "Status",
    width: 30,
    cell: (p) => <PatientStatusBadge status={p.status} />,
  },
];
