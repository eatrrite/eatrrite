"use client";

import { useState } from "react";
import type { AdminData } from "@/features/admin/types";
import { useAdminStore } from "@/stores/useAdminStore";

// Puts the data the server loaded into the admin store before the pages render.
export function AdminDataProvider({ data, children }: { data: AdminData; children: React.ReactNode }) {
  useState(() => useAdminStore.getState().hydrate(data));
  return children;
}
