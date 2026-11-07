"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppointmentFormFields } from "@/components/admin/appointments/AppointmentFormFields";
import type { Appointment, AppointmentInput, Patient } from "@/types/admin/admin";
import { appointmentToInput } from "@/utils/admin/appointmentForm";

type AppointmentFormDialogProps = {
  open: boolean;
  appointment?: Appointment | null;
  /** Prefill create form (ignored when editing). */
  defaults?: Partial<AppointmentInput>;
  patients: Patient[];
  onClose: () => void;
  onSave: (input: AppointmentInput) => void;
};

export function AppointmentFormDialog({
  open,
  appointment,
  defaults,
  patients,
  onClose,
  onSave,
}: AppointmentFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => (!next ? onClose() : null)}>
      <DialogContent className="sm:max-w-lg" showCloseButton>
        {open ? (
          <AppointmentFormBody
            key={appointment?.id ?? `new-${defaults?.date}-${defaults?.time}`}
            appointment={appointment}
            defaults={defaults}
            patients={patients}
            onClose={onClose}
            onSave={onSave}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function AppointmentFormBody({
  appointment,
  defaults,
  patients,
  onClose,
  onSave,
}: Omit<AppointmentFormDialogProps, "open">) {
  const [value, setValue] = useState(() =>
    appointmentToInput(appointment, patients, defaults),
  );

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-heading text-xl font-bold">
          {appointment ? "Edit appointment" : "New appointment"}
        </DialogTitle>
      </DialogHeader>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!value.patientId || !value.date || !value.time) return;
          onSave(value);
          onClose();
        }}
      >
        <AppointmentFormFields
          value={value}
          patients={patients}
          onChange={setValue}
        />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {appointment ? "Save changes" : "Create"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
