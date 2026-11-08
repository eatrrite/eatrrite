"use client";

import { CalendarAppointmentSheet } from "@/components/admin/calendar/CalendarAppointmentSheet";
import { AppointmentFormDialog } from "@/components/admin/appointments/AppointmentFormDialog";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import type { useCalendarDayActions } from "@/hooks/admin/useCalendarDayActions";

type Actions = ReturnType<typeof useCalendarDayActions>;

type CalendarAppointmentDialogsProps = {
  actions: Actions;
};

export function CalendarAppointmentDialogs({
  actions,
}: CalendarAppointmentDialogsProps) {
  return (
    <>
      <CalendarAppointmentSheet
        appointment={actions.detail}
        leadName={
          actions.detail ? actions.leadName(actions.detail.leadId) : ""
        }
        open={Boolean(actions.detail)}
        onOpenChange={(open) => {
          if (!open) actions.setDetail(null);
        }}
        onEdit={() => actions.detail && actions.openEdit(actions.detail)}
        onDelete={() => actions.detail && actions.remove(actions.detail)}
      />
      <AppointmentFormDialog
        open={actions.formOpen}
        appointment={actions.editing}
        defaults={actions.editing ? undefined : actions.defaults}
        leads={actions.leads}
        onClose={() => actions.setFormOpen(false)}
        onSave={actions.save}
      />
      {actions.confirmProps ? (
        <ConfirmationModal {...actions.confirmProps} />
      ) : null}
    </>
  );
}
