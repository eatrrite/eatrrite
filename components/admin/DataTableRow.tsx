"use client";

import { ALIGN_CLASS } from "@/components/admin/DataTableHead";
import { SelectRowCell } from "@/components/admin/DataTableSelect";
import { RowActionsCell, type RowActions } from "@/components/admin/DataTableRowActions";
import { TableCell, TableRow } from "@/components/ui/table";
import type { TableSelection } from "@/hooks/admin/useBulkSelection";
import type { DataTableColumn } from "@/types/admin/dataTable";
import { cn } from "cn";

type DataTableRowProps<T> = {
  row: T;
  id: string;
  columns: DataTableColumn<T>[];
  widths: number[];
  /** The row open in the details card. */
  active: boolean;
  onOpen?: () => void;
  selection?: TableSelection;
  label: string;
  /** Edit and Delete in a ⋮ menu at the end of the row. */
  actions?: RowActions;
};

// One body row of DataTable. Open and ticked rows share the soft teal tint, and only the open row
// has the teal left edge.
export function DataTableRow<T>({ row, id, columns, widths, active, onOpen, selection, label, actions }: DataTableRowProps<T>) {
  const ticked = selection?.isSelected(id) ?? false;
  return (
    <TableRow
      data-state={active || ticked ? "selected" : undefined}
      className={cn(
        onOpen && "cursor-pointer",
        (active || ticked) && "bg-primary/5 hover:bg-primary/10",
        active && "shadow-[inset_3px_0_0_var(--color-primary)]",
      )}
      onClick={onOpen}
    >
      {selection ? <SelectRowCell selection={selection} id={id} label={label} /> : null}
      {columns.map((column, index) => (
        <TableCell
          key={column.key}
          style={{ width: `${widths[index]}%` }}
          className={cn("truncate px-3 py-2.5 sm:px-6 sm:py-3.5", ALIGN_CLASS[column.align ?? "left"])}
        >
          {column.cell(row)}
        </TableCell>
      ))}
      {actions ? <RowActionsCell actions={actions} label={label} /> : null}
    </TableRow>
  );
}
