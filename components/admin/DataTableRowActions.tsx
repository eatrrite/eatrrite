"use client";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableHead } from "@/components/ui/table";

/** Width of the ⋮ column at the end of each row; the other columns share the rest. */
export const ROW_ACTIONS_WIDTH = "3.5rem";

export type RowActions = {
  onEdit: () => void;
  onDelete: () => void;
};

// Empty header over the ⋮ column, named for screen readers.
export function RowActionsHead() {
  return (
    <TableHead className="h-10 px-2 sm:h-12" style={{ width: ROW_ACTIONS_WIDTH }}>
      <span className="sr-only">Actions</span>
    </TableHead>
  );
}

// The ⋮ menu at the end of a row: Edit or Delete. Clicks stay in this cell (the menu is portalled,
// but React events still bubble up the tree), so using the menu does not also open the row.
export function RowActionsCell({ actions, label }: { actions: RowActions; label: string }) {
  return (
    <TableCell
      className="px-2 py-2.5 text-right sm:py-3.5"
      style={{ width: ROW_ACTIONS_WIDTH }}
      onClick={(event) => event.stopPropagation()}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={`Actions for ${label}`}
          className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:bg-muted data-popup-open:text-foreground"
        >
          <MoreVertical className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-36">
          <DropdownMenuItem onClick={actions.onEdit}>
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={actions.onDelete}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  );
}
