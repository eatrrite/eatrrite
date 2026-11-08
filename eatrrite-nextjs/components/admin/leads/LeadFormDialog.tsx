"use client";

import { useState } from "react";
import { LeadFormFields } from "@/components/admin/leads/LeadFormFields";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Lead, LeadInput } from "@/types/admin/lead";

const EMPTY: LeadInput = {
  name: "",
  phone: "",
  age: 30,
  gender: "Female",
};

function toInput(lead?: Lead | null): LeadInput {
  if (!lead) return EMPTY;
  return {
    name: lead.name,
    phone: lead.phone,
    age: lead.age,
    gender: lead.gender,
    profession: lead.profession,
    email: lead.email,
    address: lead.address,
  };
}

type LeadFormDialogProps = {
  open: boolean;
  lead?: Lead | null;
  onClose: () => void;
  onSave: (input: LeadInput) => void;
};

export function LeadFormDialog({
  open,
  lead,
  onClose,
  onSave,
}: LeadFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => (!next ? onClose() : null)}>
      <DialogContent className="sm:max-w-lg" showCloseButton>
        {open ? (
          <LeadFormBody
            key={lead?.id ?? "new"}
            lead={lead}
            onClose={onClose}
            onSave={onSave}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function LeadFormBody({
  lead,
  onClose,
  onSave,
}: Omit<LeadFormDialogProps, "open">) {
  const [value, setValue] = useState(() => toInput(lead));

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-heading text-xl font-bold">
          {lead ? "Edit lead" : "Add lead"}
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
        <LeadFormFields value={value} onChange={setValue} />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{lead ? "Save changes" : "Create"}</Button>
        </DialogFooter>
      </form>
    </>
  );
}
