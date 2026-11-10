import type { ReactNode } from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { DataTableAlign, DataTableColumn } from "@/types/admin/dataTable";
import { cn } from "cn";

export const ALIGN_CLASS: Record<DataTableAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

// The header row of DataTable: one cell per column, at its width.
export function DataTableHead<T>({ columns, widths, leading }: { columns: DataTableColumn<T>[]; widths: number[]; leading?: ReactNode }) {
  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        {leading}
        {columns.map((column, index) => (
          <TableHead
            key={column.key}
            style={{ width: `${widths[index]}%` }}
            className={cn(
              "h-10 truncate px-3 text-[11px] font-semibold tracking-[0.08em] text-primary/70 uppercase sm:h-12 sm:px-6 sm:text-xs",
              ALIGN_CLASS[column.align ?? "left"],
            )}
          >
            {column.header}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
