"use client";

import { useCallback, useMemo, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { PatientDetailsCard } from "@/components/admin/patients/PatientDetailsCard";
import { PatientFormDialog } from "@/components/admin/patients/PatientFormDialog";
import { PATIENT_LIST_COLUMNS } from "@/components/admin/patients/patientColumns";
import { PatientsToolbar } from "@/components/admin/patients/PatientsToolbar";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import { useConfirmDialog } from "@/hooks/admin/useConfirmDialog";
import { useSelectedRow } from "@/hooks/admin/useSelectedRow";
import { useShowToast } from "@/hooks/admin/useShowToast";
import { useClinicStore } from "@/stores/adminStore";
import type { Patient, PatientInput } from "@/types/admin/admin";
import { patientSaveToast } from "@/utils/admin/describeRecordChanges";
import {
  filterPatients,
  type PatientListFilters,
} from "@/utils/admin/filterPatients";

const INITIAL_FILTERS: PatientListFilters = {
  query: "",
  age: "all",
  status: "all",
};

export function PatientsTable() {
  const patients = useClinicStore((s) => s.patients);
  const addPatient = useClinicStore((s) => s.addPatient);
  const updatePatient = useClinicStore((s) => s.updatePatient);
  const deletePatient = useClinicStore((s) => s.deletePatient);
  const appointments = useClinicStore((s) => s.appointments);
  const deleteAppointment = useClinicStore((s) => s.deleteAppointment);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Patient | null>(null);
  const { ask, props: confirmProps } = useConfirmDialog();
  const showToast = useShowToast();

  const rows = useMemo(
    () => filterPatients(patients, filters),
    [patients, filters],
  );
  const getId = useCallback((patient: Patient) => patient.id, []);
  const [selectedId, selectRow, selected] = useSelectedRow(rows, getId);

  const save = (input: PatientInput) => {
    const toast = patientSaveToast(editing, input);
    if (editing) updatePatient(editing.id, input);
    else addPatient(input);
    showToast(toast);
  };

  const remove = (patient: Patient) => {
    ask({
      title: `Delete ${patient.name}?`,
      description:
        "This removes the patient and any linked appointments from the patient list.",
      confirmLabel: "Delete patient",
      onConfirm: () => {
        appointments
          .filter((item) => item.patientId === patient.id)
          .forEach((item) => deleteAppointment(item.id));
        deletePatient(patient.id);
        showToast({
          title: "Patient deleted",
          description: `${patient.name} was removed from the patient list.`,
          type: "success",
        });
      },
    });
  };

  return (
    <div className="space-y-4">
      <PatientsToolbar
        filters={filters}
        onChange={setFilters}
        onAdd={() => {
          setEditing(null);
          setOpen(true);
        }}
      />
      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <DataTable
          columns={PATIENT_LIST_COLUMNS}
          rows={rows}
          getRowId={getId}
          selectedRowId={selectedId}
          onRowSelect={(patient) => selectRow(patient.id)}
          emptyMessage="No patients match these filters."
        />
        <PatientDetailsCard
          patient={selected}
          onEdit={() => {
            if (!selected) return;
            setEditing(selected);
            setOpen(true);
          }}
          onDelete={() => {
            if (selected) remove(selected);
          }}
        />
      </div>
      <PatientFormDialog
        open={open}
        patient={editing}
        onClose={() => setOpen(false)}
        onSave={save}
      />
      {confirmProps ? <ConfirmationModal {...confirmProps} /> : null}
    </div>
  );
}
