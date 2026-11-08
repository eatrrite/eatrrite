"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useQueryId } from "@/hooks/admin/useQueryId";

/**
 * Row selection synced to `?id=`. Selecting a row updates the query string;
 * filters falling back to another row keep the URL aligned.
 */
export function useSelectedRow<T>(
  rows: T[],
  getId: (row: T) => string,
): [string | null, (id: string) => void, T | null] {
  const [queryId, setQueryId] = useQueryId();

  const resolvedId = useMemo(() => {
    if (rows.length === 0) return null;
    if (queryId && rows.some((row) => getId(row) === queryId)) return queryId;
    return getId(rows[0]);
  }, [rows, queryId, getId]);

  useEffect(() => {
    if (resolvedId === queryId) return;
    setQueryId(resolvedId);
  }, [resolvedId, queryId, setQueryId]);

  const select = useCallback(
    (id: string) => {
      setQueryId(id);
    },
    [setQueryId],
  );

  const selected = rows.find((row) => getId(row) === resolvedId) ?? null;

  return [resolvedId, select, selected];
}
