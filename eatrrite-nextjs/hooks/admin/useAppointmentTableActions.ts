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

  const save = (input: AppointmentInput) => {
    const nextName = getLead(input.leadId)?.name ?? "Lead";
    const previousName = editing
      ? (getLead(editing.leadId)?.name ?? "Lead")
      : nextName;
    const result = saveAppointment(input, editing?.id);
    if (!result.ok) {
      showToast({ title: "Time not available", description: result.error, type: "error" });
      return;
    }
    showToast(appointmentSaveToast(editing, input, previousName, nextName));
  };

  const remove = (item: Appointment) => {
    const name = getLead(item.leadId)?.name ?? "this appointment";
    ask({
      title: "Delete appointment?",
      description: `Removes the consultation for ${name} on ${item.date} at ${item.time}.`,
      confirmLabel: "Delete appointment",
      onConfirm: () => {
        deleteAppointment(item.id);
        showToast({
          title: "Appointment deleted",
          description: `Consultation for ${name} on ${item.date} at ${item.time} was removed.`,
          type: "success",
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
