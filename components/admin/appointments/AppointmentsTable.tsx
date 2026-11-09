"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { useCallback, useMemo, useState } from "react";
import { DataTable } from "@/components/admin/DataTable";
import { AppointmentDetailsCard } from "@/components/admin/appointments/AppointmentDetailsCard";
import { AppointmentFormDialog } from "@/components/admin/appointments/AppointmentFormDialog";
import { getAppointmentListColumns } from "@/components/admin/appointments/appointmentColumns";
import { AppointmentsToolbar } from "@/components/admin/appointments/AppointmentsToolbar";
import { AppointmentBulkBar } from "@/components/admin/appointments/AppointmentBulkBar";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import { StickyToolbar } from "@/components/admin/StickyToolbar";
import { useBulkSelection } from "@/hooks/admin/useBulkSelection";
import { useCreateRequest } from "@/hooks/admin/useCreateRequest";
import { useAppointmentTableActions } from "@/hooks/admin/useAppointmentTableActions";
import { useSelectedRow } from "@/hooks/admin/useSelectedRow";
import { DETAILS_PANEL_CLASS, useDetailsPanel } from "@/hooks/admin/useDetailsPanel";
import { useAdminStore } from "@/stores/useAdminStore";
import type { Appointment } from "@/types/admin/appointment";
import type { AppointmentListFilters } from "@/types/admin/appointment";
import { filterAppointments } from "@/utils/admin/filterAppointments";

const INITIAL_FILTERS: AppointmentListFilters = {
  query: "",
  status: "all",
  date: "all",
  payment: "all",
  sort: "updated",
};

export function AppointmentsTable() {
  const appointments = useAdminStore((s) => s.appointments);
  const leads = useAdminStore((s) => s.leads);
  const actions = useAppointmentTableActions();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const rows = useMemo(
    () => filterAppointments(appointments, leads, filters),
    [appointments, leads, filters],
  );
  const getId = useCallback((item: Appointment) => item.id, []);
  const [selectedId, selectRow, selected] = useSelectedRow(rows, getId);
  const { ref: detailsRef, reveal: revealDetails } = useDetailsPanel();
  // "Add appointment" in the page header opens the form here.
  useCreateRequest("appointment", actions.startCreate);
  const bulk = useBulkSelection(rows, getId);
  const { getLead } = actions;
  const columns = useMemo(
    () => getAppointmentListColumns((id) => getLead(id)?.name ?? "Unknown"),
    [getLead],
  );

  return (
    <div className="space-y-4">
      <StickyToolbar>
        <AppointmentsToolbar filters={filters} onChange={setFilters} />
      </StickyToolbar>
      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={getId}
          selectedRowId={selectedId}
          onRowSelect={(item) => {
            selectRow(item.id);
            revealDetails();
          }}
          resetKey={JSON.stringify(filters)}
          selection={bulk.selection}
          rowLabel={(item) => `${getLead(item.leadId)?.name ?? "Unknown"}, ${item.date} ${item.time}${item.paymentDone ? "" : ", payment due"}`}
          rowTone={(item) => (item.status === "cancelled" ? "muted" : item.paymentDone ? undefined : "alert")}
          empty={
            appointments.length === 0 ? (
              <EmptyState image="appointments" title="No appointments yet" description="Website bookings appear here after payment, or add one yourself." />
            ) : (
              <EmptyState image="search" title="No appointments match" description="Try a different search, status or date filter." />
            )
          }
        />
        <div ref={detailsRef} className={DETAILS_PANEL_CLASS}>
          <AppointmentDetailsCard
            appointment={selected}
            leadName={
              selected
                ? (actions.getLead(selected.leadId)?.name ?? "Unknown")
                : ""
            }
            onEdit={() => selected && actions.startEdit(selected)}
            onDelete={() => selected && actions.remove(selected)}
          />
        </div>
      </div>
      <AppointmentFormDialog
        open={actions.open}
        appointment={actions.editing}
        leads={leads}
        onClose={() => actions.setOpen(false)}
        onSave={actions.save}
      />
      <AppointmentBulkBar selected={bulk.selectedRows} ask={actions.ask} onDone={bulk.clear} />
      {actions.confirmProps ? (
        <ConfirmationModal {...actions.confirmProps} />
      ) : null}
    </div>
  );
}
