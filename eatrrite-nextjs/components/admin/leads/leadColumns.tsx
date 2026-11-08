"use client";

import type { Lead } from "@/types/admin/lead";
import type { DataTableColumn } from "@/types/admin/dataTable";

export const LEAD_LIST_COLUMNS: DataTableColumn<Lead>[] = [
  {
    key: "name",
    header: "Name",
    width: 50,
    cell: (lead) => <span className="font-medium">{lead.name}</span>,
  },
  { key: "phone", header: "Phone", width: 50, cell: (lead) => lead.phone },
];
