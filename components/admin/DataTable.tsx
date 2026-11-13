"use client";

import { DataTableHead } from "@/components/admin/DataTableHead";
import { DataTableRow } from "@/components/admin/DataTableRow";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { DataTableColumn } from "@/types/admin/dataTable";
import { normalizeColumnWidths } from "@/utils/admin/dataTableWidths";
import { ListPagination } from "@/components/admin/ListPagination";
import { usePagination } from "@/hooks/admin/usePagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { SELECT_COLUMN_WIDTH, SelectAllHead } from "@/components/admin/DataTableSelect";
import { ROW_ACTIONS_WIDTH, RowActionsHead, type RowActions } from "@/components/admin/DataTableRowActions";
import type { TableSelection } from "@/hooks/admin/useBulkSelection";
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
  /** Rows per page (default 20). The pager shows bottom right when there is more than one page. */
  pageSize?: number;
  /** Change it (for example to the current filters) to go back to page 1. */
  resetKey?: string;
  /** Tick boxes for bulk actions, with a header box for the current page. */
  selection?: TableSelection;
  /** How a row is read out by screen readers next to its tick box. */
  rowLabel?: (row: T) => string;
  /** Below lg the table keeps this width and scrolls sideways instead of squashing. */
  minWidthClass?: string;
  /** Edit and Delete for a row, shown in a ⋮ menu at the end of it. */
  rowActions?: (row: T) => RowActions;
};

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  empty = <EmptyState image="search" title="Nothing found" description="Try a different search or filter." />,
  className,
  selectedRowId,
  onRowSelect,
  pageSize = 20,
  resetKey,
  selection,
  rowLabel,
  minWidthClass = "min-w-[28rem]",
  rowActions,
}: DataTableProps<T>) {
  const { page, pageCount, pageItems, setPage } = usePagination(rows, pageSize, resetKey);
  const widths = normalizeColumnWidths(columns.map((column) => column.width));
  const pageIds = pageItems.map(getRowId);

  return (
    <div
      className={cn(
        "h-fit self-start overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_14px_40px_-28px_rgba(1,78,78,0.35)]",
        className,
      )}
    >
      <Table className={cn("table-fixed text-sm sm:text-base lg:min-w-0", minWidthClass)}>
        <colgroup>
          {selection ? <col style={{ width: SELECT_COLUMN_WIDTH }} /> : null}
          {widths.map((width, index) => <col key={columns[index]?.key ?? index} style={{ width: `${width}%` }} />)}
          {rowActions ? <col style={{ width: ROW_ACTIONS_WIDTH }} /> : null}
        </colgroup>
        <DataTableHead
          columns={columns}
          widths={widths}
          leading={selection ? <SelectAllHead selection={selection} pageIds={pageIds} /> : null}
          trailing={rowActions ? <RowActionsHead /> : null}
        />
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selection ? 1 : 0) + (rowActions ? 1 : 0)}
                className="px-6 text-center whitespace-normal"
              >
                {empty}
              </TableCell>
            </TableRow>
          ) : (
            pageItems.map((row) => {
              const id = getRowId(row);
              return (
                <DataTableRow
                  key={id}
                  row={row}
                  id={id}
                  columns={columns}
                  widths={widths}
                  active={selectedRowId === id}
                  onOpen={onRowSelect ? () => onRowSelect(row) : undefined}
                  selection={selection}
                  label={rowLabel?.(row) ?? "row"}
                  actions={rowActions?.(row)}
                />
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
