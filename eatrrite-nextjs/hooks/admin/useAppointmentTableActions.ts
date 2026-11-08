"use client";

import { useState } from "react";
import { useConfirmDialog } from "@/hooks/admin/useConfirmDialog";
import { useShowToast } from "@/hooks/admin/useShowToast";
import { useClinicStore } from "@/stores/adminStore";
import type {
  ClinicAppointment,
  ClinicAppointmentInput,
} from "@/types/admin/appointment";
import { appointmentSaveToast } from "@/utils/admin/describeRecordChanges";

/** Create/edit/delete handlers for the appointments table. */
export function useAppointmentTableActions() {
  const getLead = useClinicStore((s) => s.getLead);
  const addAppointment = useClinicStore((s) => s.addAppointment);
  const updateAppointment = useClinicStore((s) => s.updateAppointment);
  const deleteAppointment = useClinicStore((s) => s.deleteAppointment);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ClinicAppointment | null>(null);
  const { ask, props: confirmProps } = useConfirmDialog();
  const showToast = useShowToast();

  const save = (input: ClinicAppointmentInput) => {
    const nextName = getLead(input.leadId)?.name ?? "Lead";
    const previousName = editing
      ? (getLead(editing.leadId)?.name ?? "Lead")
      : nextName;
    showToast(appointmentSaveToast(editing, input, previousName, nextName));
    if (editing) updateAppointment(editing.id, input);
    else addAppointment(input);
  };

  const remove = (item: ClinicAppointment) => {
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

  const startEdit = (item: ClinicAppointment) => {
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
