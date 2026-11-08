import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { DataTableAlign, DataTableColumn } from "@/types/admin/dataTable";
import { cn } from "cn";

export const ALIGN_CLASS: Record<DataTableAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

// The header row of DataTable: one cell per column, at its width.
export function DataTableHead<T>({ columns, widths }: { columns: DataTableColumn<T>[]; widths: number[] }) {
  return (
    <TableHeader>
      <TableRow>
        {columns.map((column, index) => (
          <TableHead
            key={column.key}
            style={{ width: `${widths[index]}%` }}
            className={cn(
              "h-12 truncate px-6 text-sm",
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
