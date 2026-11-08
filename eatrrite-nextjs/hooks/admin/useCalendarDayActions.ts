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

export function useCalendarDayActions(selectedKey: string) {
  const leads = useClinicStore((s) => s.leads);
  const getLead = useClinicStore((s) => s.getLead);
  const saveAppointment = useClinicStore((s) => s.saveAppointment);
  const deleteAppointment = useClinicStore((s) => s.deleteAppointment);
  const showToast = useShowToast();
  const { ask, props: confirmProps } = useConfirmDialog();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ClinicAppointment | null>(null);
  const [detail, setDetail] = useState<ClinicAppointment | null>(null);
  const [defaults, setDefaults] = useState<Partial<ClinicAppointmentInput>>({});

  const leadName = (id: string) => getLead(id)?.name ?? "Unknown";

  const save = (input: ClinicAppointmentInput) => {
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

  const remove = (item: ClinicAppointment) => {
    const name = leadName(item.leadId);
    ask({
      title: "Delete appointment?",
      description: `Removes the consultation for ${name} on ${item.date} at ${item.time}.`,
      confirmLabel: "Delete appointment",
      onConfirm: () => {
        deleteAppointment(item.id);
        setDetail(null);
        showToast({
          title: "Appointment deleted",
          description: `Consultation for ${name} on ${item.date} at ${item.time} was removed.`,
          type: "success",
        });
      },
    });
  };

  const openCreate = (extra?: Partial<ClinicAppointmentInput>) => {
    setEditing(null);
    setDefaults({ date: selectedKey, ...extra });
    setFormOpen(true);
  };

  const openEdit = (item: ClinicAppointment) => {
    setEditing(item);
    setDefaults({});
    setFormOpen(true);
  };

  return {
    leads,
    leadName,
    formOpen,
    setFormOpen,
    editing,
    detail,
    setDetail,
    defaults,
    confirmProps,
    save,
    remove,
    openCreate,
    openEdit,
  };
}
