"use client";

import { useCallback, useMemo, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { AppointmentDetailsCard } from "@/components/admin/appointments/AppointmentDetailsCard";
import { AppointmentFormDialog } from "@/components/admin/appointments/AppointmentFormDialog";
import { getAppointmentListColumns } from "@/components/admin/appointments/appointmentColumns";
import { AppointmentsToolbar } from "@/components/admin/appointments/AppointmentsToolbar";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import { useAppointmentTableActions } from "@/hooks/admin/useAppointmentTableActions";
import { useSelectedRow } from "@/hooks/admin/useSelectedRow";
import { useClinicStore } from "@/stores/adminStore";
import type { Appointment } from "@/types/admin/admin";
import {
  filterAppointments,
  type AppointmentListFilters,
} from "@/utils/admin/filterAppointments";

const INITIAL_FILTERS: AppointmentListFilters = {
  query: "",
  status: "all",
  date: "all",
};

export function AppointmentsTable() {
  const appointments = useClinicStore((s) => s.appointments);
  const patients = useClinicStore((s) => s.patients);
  const actions = useAppointmentTableActions();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const rows = useMemo(
    () => filterAppointments(appointments, patients, filters),
    [appointments, patients, filters],
  );
  const getId = useCallback((item: Appointment) => item.id, []);
  const [selectedId, selectRow, selected] = useSelectedRow(rows, getId);
  const columns = useMemo(
    () =>
      getAppointmentListColumns(
        (id) => actions.getPatient(id)?.name ?? "Unknown",
      ),
    [actions.getPatient],
  );

  return (
    <div className="space-y-4">
      <AppointmentsToolbar
        filters={filters}
        onChange={setFilters}
        canAdd={patients.length > 0}
        onAdd={actions.startCreate}
      />
      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={getId}
          selectedRowId={selectedId}
          onRowSelect={(item) => selectRow(item.id)}
          emptyMessage="No appointments match these filters."
        />
        <AppointmentDetailsCard
          appointment={selected}
          patientName={
            selected
              ? (actions.getPatient(selected.patientId)?.name ?? "Unknown")
              : ""
          }
          onEdit={() => selected && actions.startEdit(selected)}
          onDelete={() => selected && actions.remove(selected)}
        />
      </div>
      <AppointmentFormDialog
        open={actions.open}
        appointment={actions.editing}
        patients={patients}
        onClose={() => actions.setOpen(false)}
        onSave={actions.save}
      />
      {actions.confirmProps ? (
        <ConfirmationModal {...actions.confirmProps} />
      ) : null}
    </div>
  );
}
