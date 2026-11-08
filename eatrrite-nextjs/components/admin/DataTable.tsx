"use client";

import { ALIGN_CLASS, DataTableHead } from "@/components/admin/DataTableHead";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { DataTableColumn } from "@/types/admin/dataTable";
import { normalizeColumnWidths } from "@/utils/admin/dataTableWidths";
import { ListPagination } from "@/components/admin/ListPagination";
import { usePagination } from "@/hooks/admin/usePagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn } from "cn";

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  /** What shows when there are no rows: an EmptyState. */
  empty?: React.ReactNode;
  className?: string;
  selectedRowId?: string | null;
  onRowSelect?: (row: T) => void;
  /** Rows per page (default 10). The pager shows bottom right when there is more than one page. */
  pageSize?: number;
  /** Change it (for example to the current filters) to go back to page 1. */
  resetKey?: string;
};


export function DataTable<T>({
  columns,
  rows,
  getRowId,
  empty = <EmptyState image="search" title="Nothing found" description="Try a different search or filter." />,
  className,
  selectedRowId,
  onRowSelect,
  pageSize = 10,
  resetKey,
}: DataTableProps<T>) {
  const { page, pageCount, pageItems, setPage } = usePagination(rows, pageSize, resetKey);
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
        <DataTableHead columns={columns} widths={widths} />
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="px-6 text-center whitespace-normal"
              >
                {empty}
              </TableCell>
            </TableRow>
          ) : (
            pageItems.map((row) => {
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
      {pageCount > 1 ? (
        <div className="border-t border-border px-4 py-3">
          <ListPagination page={page} pageCount={pageCount} onPageChange={setPage} />
        </div>
      ) : null}
    </div>
  );
}
