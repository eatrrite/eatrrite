"use client";

import { CheckCheckIcon, Trash2Icon } from "lucide-react";
import { BulkActionBar } from "@/components/admin/BulkActionBar";
import { Button } from "@/components/ui/button";
import type { ConfirmDialogRequest } from "@/hooks/admin/useConfirmDialog";
import { useAppointmentBulkActions } from "@/hooks/admin/useAppointmentBulkActions";
import type { Appointment } from "@/types/admin/appointment";

type AppointmentBulkBarProps = {
  selected: Appointment[];
  ask: (request: ConfirmDialogRequest) => void;
  onDone: () => void;
};

// The two bulk actions for ticked appointments. Both ask before changing anything.
export function AppointmentBulkBar({ selected, ask, onDone }: AppointmentBulkBarProps) {
  const { completeAll, deleteAll } = useAppointmentBulkActions(ask, onDone);
  return (
    <BulkActionBar count={selected.length} noun={["appointment", "appointments"]} onClear={onDone}>
      <Button type="button" variant="secondary" size="sm" onClick={() => completeAll(selected)}>
        <CheckCheckIcon data-icon="inline-start" />
        Mark as completed
      </Button>
      <Button type="button" variant="destructive" size="sm" onClick={() => deleteAll(selected)}>
        <Trash2Icon data-icon="inline-start" />
        Delete all
      </Button>
    </BulkActionBar>
  );
}
