"use client";

import { useState } from "react";

// Splits a list into pages of `pageSize`. The page goes back to 1 whenever `resetKey` changes
// (for example a new filter), and never points past the last page when items are removed.
export function usePagination<T>(items: T[], pageSize: number, resetKey = "") {
  const [state, setState] = useState({ page: 1, key: resetKey });
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const requested = state.key === resetKey ? state.page : 1;
  const page = Math.min(requested, pageCount);
  const start = (page - 1) * pageSize;

  return {
    page,
    pageCount,
    pageItems: items.slice(start, start + pageSize),
    setPage: (next: number) => setState({ page: Math.min(Math.max(next, 1), pageCount), key: resetKey }),
  };
}
