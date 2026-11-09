"use client";

import { DashboardAvatar } from "@/components/admin/dashboard/DashboardAvatar";
import type { Lead } from "@/types/admin/lead";
import type { DataTableColumn } from "@/types/admin/dataTable";

export const LEAD_LIST_COLUMNS: DataTableColumn<Lead>[] = [
  {
    key: "name",
    header: "Name",
    width: 50,
    cell: (lead) => (
      <span className="flex min-w-0 items-center gap-3">
        <DashboardAvatar name={lead.name} className="size-8 text-[11px]" />
        <span className="truncate font-medium text-ink">{lead.name}</span>
      </span>
    ),
  },
  { key: "phone", header: "Phone", width: 50, cell: (lead) => <span className="text-text tabular-nums">{lead.phone}</span> },
];
