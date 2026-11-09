"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminData } from "@/features/admin/types";
import { useAdminStore } from "@/stores/useAdminStore";

// At most one reload of the admin data per this many milliseconds when the tab regains focus.
const REFRESH_GAP_MS = 15_000;

// Puts the data the server loaded into the admin store before the pages render. Coming back to
// the admin tab reloads it from Neon (router.refresh re-runs the layout), so a booking made on the
// website, or a payment, shows without reloading the page; the new data then replaces the store.
export function AdminDataProvider({ data, children }: { data: AdminData; children: React.ReactNode }) {
  useState(() => useAdminStore.getState().hydrate(data));
  const router = useRouter();
  const first = useRef(data);
  const lastRefresh = useRef(0);

  useEffect(() => {
    if (data !== first.current) useAdminStore.getState().hydrate(data);
  }, [data]);

  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      if (now - lastRefresh.current < REFRESH_GAP_MS) return;
      lastRefresh.current = now;
      router.refresh();
    };
    lastRefresh.current = Date.now();
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [router]);

  return children;
}
