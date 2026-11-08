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

export function useCalendarDayActions(selectedKey: string) {
  const leads = useAdminStore((s) => s.leads);
  const getLead = useAdminStore((s) => s.getLead);
  const saveAppointment = useAdminStore((s) => s.saveAppointment);
  const deleteAppointment = useAdminStore((s) => s.deleteAppointment);
  const showToast = useShowToast();
  const { ask, props: confirmProps } = useConfirmDialog();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  // Keep only the id and read the appointment from the store, so the sheet shows the saved
  // changes straight away instead of the copy it had when it was opened.
  const [detailId, setDetailId] = useState<string | null>(null);
  const detail = useAdminStore((s) => s.appointments.find((item) => item.id === detailId) ?? null);
  const setDetail = (item: Appointment | null) => setDetailId(item?.id ?? null);
  const [defaults, setDefaults] = useState<Partial<AppointmentInput>>({});

  const leadName = (id: string) => getLead(id)?.name ?? "Unknown";

  // Resolves true when saved, so the form closes only then and keeps the entries otherwise.
  const save = async (input: AppointmentInput): Promise<boolean> => {
    const nextName = getLead(input.leadId)?.name ?? "Lead";
    const previousName = editing
      ? (getLead(editing.leadId)?.name ?? "Lead")
      : nextName;
    const result = await saveAppointment(input, editing?.id);
    if (!result.ok) {
      showToast({ title: "Appointment not saved", description: result.error, type: "error" });
      return false;
    }
    showToast(appointmentSaveToast(editing, input, previousName, nextName));
    return true;
  };

  const remove = (item: Appointment) => {
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

  const openCreate = (extra?: Partial<AppointmentInput>) => {
    setEditing(null);
    setDefaults({ date: selectedKey, ...extra });
    setFormOpen(true);
  };

  const openEdit = (item: Appointment) => {
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
