"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DataTableAlign, DataTableColumn } from "@/types/admin/dataTable";
import { normalizeColumnWidths } from "@/utils/admin/dataTableWidths";
import { cn } from "cn";

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  emptyMessage?: string;
  className?: string;
  selectedRowId?: string | null;
  onRowSelect?: (row: T) => void;
};

const ALIGN_CLASS: Record<DataTableAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  emptyMessage = "No results found.",
  className,
  selectedRowId,
  onRowSelect,
}: DataTableProps<T>) {
  const widths = normalizeColumnWidths(columns.map((column) => column.width));

  return (
    <div
      className={cn(
        "h-fit self-start rounded-xl border border-border bg-card",
        className,
      )}
    >
      <Table className="table-fixed text-base">
        <colgroup>
          {widths.map((width, index) => (
            <col
              key={columns[index]?.key ?? index}
              style={{ width: `${width}%` }}
            />
          ))}
        </colgroup>
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
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="px-6 py-10 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => {
              const id = getRowId(row);
              const selected = selectedRowId === id;
              return (
                <TableRow
                  key={id}
                  data-state={selected ? "selected" : undefined}
                  className={cn(
                    onRowSelect && "cursor-pointer",
                    selected && "bg-primary/5 hover:bg-primary/10",
                  )}
                  onClick={() => onRowSelect?.(row)}
                >
                  {columns.map((column, index) => (
                    <TableCell
                      key={column.key}
                      style={{ width: `${widths[index]}%` }}
                      className={cn(
                        "truncate px-6 py-3.5",
                        ALIGN_CLASS[column.align ?? "left"],
                      )}
                    >
                      {column.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
