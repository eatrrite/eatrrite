"use client";

import { useCallback, useMemo, useState } from "react";

export type TableSelection = {
  isSelected: (id: string) => boolean;
  toggle: (id: string) => void;
  /** Ticks or unticks a set of rows at once (the header box: the rows on the current page). */
  setMany: (ids: string[], checked: boolean) => void;
};

/**
 * Ticked rows for bulk actions. Ticks live here, not in the table, so they survive moving
 * between pages. Only rows still in `rows` count: a deleted row drops out, and a row hidden
 * by a filter is left out of the bulk action until the filter shows it again.
 */
export function useBulkSelection<T>(rows: T[], getId: (row: T) => string) {
  const [picked, setPicked] = useState<ReadonlySet<string>>(() => new Set());

  const selectedRows = useMemo(() => rows.filter((row) => picked.has(getId(row))), [rows, picked, getId]);

  const toggle = useCallback((id: string) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const setMany = useCallback((ids: string[], checked: boolean) => {
    setPicked((prev) => {
      const next = new Set(prev);
      for (const id of ids) {
        if (checked) next.add(id);
        else next.delete(id);
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => setPicked(new Set()), []);

  const selection: TableSelection = useMemo(
    () => ({ isSelected: (id) => picked.has(id), toggle, setMany }),
    [picked, toggle, setMany],
  );

  return { selection, selectedRows, clear };
}
