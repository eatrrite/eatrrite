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
import { PatientFormFields } from "@/components/admin/patients/PatientFormFields";
import type { Patient, PatientInput } from "@/types/admin/admin";

const EMPTY: PatientInput = {
  name: "",
  phone: "",
  age: 30,
  status: "new",
};

function toInput(patient?: Patient | null): PatientInput {
  if (!patient) return EMPTY;
  return {
    name: patient.name,
    phone: patient.phone,
    age: patient.age,
    profession: patient.profession,
    status: patient.status,
    email: patient.email,
    address: patient.address,
  };
}

type PatientFormDialogProps = {
  open: boolean;
  patient?: Patient | null;
  onClose: () => void;
  onSave: (input: PatientInput) => void;
};

export function PatientFormDialog({
  open,
  patient,
  onClose,
  onSave,
}: PatientFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => (!next ? onClose() : null)}>
      <DialogContent className="sm:max-w-lg" showCloseButton>
        {open ? (
          <PatientFormBody
            key={patient?.id ?? "new"}
            patient={patient}
            onClose={onClose}
            onSave={onSave}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function PatientFormBody({
  patient,
  onClose,
  onSave,
}: Omit<PatientFormDialogProps, "open">) {
  const [value, setValue] = useState(() => toInput(patient));

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-heading text-xl font-bold">
          {patient ? "Edit patient" : "Add patient"}
        </DialogTitle>
      </DialogHeader>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSave(value);
          onClose();
        }}
      >
        <PatientFormFields value={value} onChange={setValue} />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{patient ? "Save changes" : "Create"}</Button>
        </DialogFooter>
      </form>
    </>
  );
}
