"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requestCreate, type CreateKind } from "@/hooks/admin/useCreateRequest";

// The page's main "Add …" action, shown in the page header (AdminPageHeader children). The list
// on the page opens its form when pressed (useCreateRequest).
export function AddRecordButton({ kind, label, disabled }: { kind: CreateKind; label: string; disabled?: boolean }) {
  return (
    <Button type="button" className="gap-1.5" disabled={disabled} onClick={() => requestCreate(kind)}>
      <Plus className="size-4" />
      {label}
    </Button>
  );
}
