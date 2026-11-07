"use client";

import { useState } from "react";
import { useConfirmDialog } from "@/hooks/admin/useConfirmDialog";
import { useShowToast } from "@/hooks/admin/useShowToast";
import { useClinicStore } from "@/stores/adminStore";
import type { Appointment, AppointmentInput } from "@/types/admin/admin";
import { appointmentSaveToast } from "@/utils/admin/describeRecordChanges";

export function useCalendarDayActions(selectedKey: string) {
  const patients = useClinicStore((s) => s.patients);
  const getPatient = useClinicStore((s) => s.getPatient);
  const addAppointment = useClinicStore((s) => s.addAppointment);
  const updateAppointment = useClinicStore((s) => s.updateAppointment);
  const deleteAppointment = useClinicStore((s) => s.deleteAppointment);
  const showToast = useShowToast();
  const { ask, props: confirmProps } = useConfirmDialog();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [detail, setDetail] = useState<Appointment | null>(null);
  const [defaults, setDefaults] = useState<Partial<AppointmentInput>>({});

  const patientName = (id: string) => getPatient(id)?.name ?? "Unknown";

  const save = (input: AppointmentInput) => {
    const nextName = getPatient(input.patientId)?.name ?? "Patient";
    const previousName = editing
      ? (getPatient(editing.patientId)?.name ?? "Patient")
      : nextName;
    showToast(appointmentSaveToast(editing, input, previousName, nextName));
    if (editing) updateAppointment(editing.id, input);
    else addAppointment(input);
  };

  const remove = (item: Appointment) => {
    const name = patientName(item.patientId);
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
    setDefaults({ date: selectedKey, time: "10:00", ...extra });
    setFormOpen(true);
  };

  const openEdit = (item: Appointment) => {
    setEditing(item);
    setDefaults({});
    setFormOpen(true);
  };

  return {
    patients,
    patientName,
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
