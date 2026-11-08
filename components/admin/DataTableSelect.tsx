"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableHead } from "@/components/ui/table";
import type { TableSelection } from "@/hooks/admin/useBulkSelection";

/** Width of the tick-box column; the other columns share the rest. */
export const SELECT_COLUMN_WIDTH = "2.75rem";

// Header box: ticks every row on the current page. Shows a dash when only some are ticked.
export function SelectAllHead({ selection, pageIds }: { selection: TableSelection; pageIds: string[] }) {
  const ticked = pageIds.filter((id) => selection.isSelected(id)).length;
  const all = pageIds.length > 0 && ticked === pageIds.length;
  return (
    <TableHead className="h-10 pr-0 pl-3.5 sm:h-12 sm:pl-6" style={{ width: SELECT_COLUMN_WIDTH }}>
      <Checkbox
        aria-label="Select all rows on this page"
        checked={all}
        indeterminate={ticked > 0 && !all}
        disabled={pageIds.length === 0}
        onCheckedChange={() => selection.setMany(pageIds, !all)}
      />
    </TableHead>
  );
}

// One row's box. Clicks stay here, so ticking a row does not also open it.
export function SelectRowCell({ selection, id, label }: { selection: TableSelection; id: string; label: string }) {
  return (
    <TableCell
      className="py-2.5 pr-0 pl-3.5 sm:py-3.5 sm:pl-6"
      style={{ width: SELECT_COLUMN_WIDTH }}
      onClick={(event) => event.stopPropagation()}
    >
      <Checkbox
        aria-label={`Select ${label}`}
        checked={selection.isSelected(id)}
        onCheckedChange={() => selection.toggle(id)}
      />
    </TableCell>
  );
}
