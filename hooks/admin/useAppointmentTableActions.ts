"use client";

import { useState } from "react";
import { useConfirmDialog } from "@/hooks/admin/useConfirmDialog";
import { useShowToast } from "@/hooks/useShowToast";
import { useAdminStore } from "@/stores/useAdminStore";
import type {
  Appointment,
  AppointmentInput,
} from "@/types/admin/appointment";
import { appointmentSaveToast } from "@/utils/admin/describeRecordChanges";

/** Create/edit/delete handlers for the appointments table. */
export function useAppointmentTableActions() {
  const getLead = useAdminStore((s) => s.getLead);
  const saveAppointment = useAdminStore((s) => s.saveAppointment);
  const deleteAppointment = useAdminStore((s) => s.deleteAppointment);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const { ask, props: confirmProps } = useConfirmDialog();
  const showToast = useShowToast();

  // Resolves true when saved, so the form closes only then and keeps the entries otherwise.
  const save = async (input: AppointmentInput): Promise<boolean> => {
    const nextName = getLead(input.leadId)?.name ?? "Lead";
    const previousName = editing
      ? (getLead(editing.leadId)?.name ?? "Lead")
      : nextName;
    const id = showToast({ title: "Saving appointment…", type: "pending" });
    const result = await saveAppointment(input, editing?.id);
    if (!result.ok) {
      showToast({ title: "Appointment not saved", description: result.error, type: "error", id });
      return false;
    }
    showToast({ ...appointmentSaveToast(editing, input, previousName, nextName), id });
    return true;
  };

  const remove = (item: Appointment) => {
    const name = getLead(item.leadId)?.name ?? "this appointment";
    ask({
      title: "Delete appointment?",
      description: `Removes the consultation for ${name} on ${item.date} at ${item.time}.`,
      confirmLabel: "Delete appointment",
      onConfirm: () => {
        deleteAppointment(item.id, {
          title: "Appointment deleted",
          description: `Consultation for ${name} on ${item.date} at ${item.time} was removed.`,
        });
      },
    });
  };

  const startCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const startEdit = (item: Appointment) => {
    setEditing(item);
    setOpen(true);
  };

  return {
    getLead,
    ask,
    open,
    editing,
    confirmProps,
    setOpen,
    save,
    remove,
    startCreate,
    startEdit,
  };
}
