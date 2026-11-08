"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppointmentBasicsFields } from "@/components/admin/appointments/AppointmentBasicsFields";
import { AppointmentMeetStep } from "@/components/admin/appointments/AppointmentMeetStep";
import { AppointmentQuestionnaireFields } from "@/components/admin/appointments/AppointmentQuestionnaireFields";
import { QuestionProgress } from "@/components/appointment-confirmed/QuestionProgress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  ClinicAppointment,
  ClinicAppointmentInput,
} from "@/types/admin/appointment";
import type { Lead } from "@/types/admin/lead";
import { appointmentToInput } from "@/utils/admin/appointmentForm";
import {
  canSaveAppointment,
  hasAppointmentBasics,
} from "@/utils/admin/appointmentReady";
import {
  applyLeadToQuestionnaire,
  isAdminQuestionnaireComplete,
} from "@/utils/admin/leadQuestionnaire";

const STEP_LABELS = ["Details", "Questionnaire", "Meet link"] as const;

type AppointmentFormDialogProps = {
  open: boolean;
  appointment?: ClinicAppointment | null;
  defaults?: Partial<ClinicAppointmentInput>;
  leads: Lead[];
  onClose: () => void;
  onSave: (input: ClinicAppointmentInput) => void;
};

export function AppointmentFormDialog({
  open,
  appointment,
  defaults,
  leads,
  onClose,
  onSave,
}: AppointmentFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => (!next ? onClose() : null)}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl" showCloseButton>
        {open ? (
          <AppointmentFormBody
            key={appointment?.id ?? `new-${defaults?.date}-${defaults?.time}`}
            appointment={appointment}
            defaults={defaults}
            leads={leads}
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
  leads,
  onClose,
  onSave,
}: Omit<AppointmentFormDialogProps, "open">) {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState(() => {
    const input = appointmentToInput(appointment, leads, defaults);
    const lead = leads.find((item) => item.id === input.leadId);
    return {
      ...input,
      questionnaire: applyLeadToQuestionnaire(input.questionnaire, lead),
    };
  });

  const lead = leads.find((item) => item.id === value.leadId);
  const canSave = canSaveAppointment(value, lead);
  const canGoNext =
    step === 0
      ? hasAppointmentBasics(value)
      : step === 1
        ? isAdminQuestionnaireComplete(value.questionnaire, lead)
        : false;

  function selectLead(leadId: string) {
    const nextLead = leads.find((item) => item.id === leadId);
    setValue({
      ...value,
      leadId,
      meetLink: undefined,
      questionnaire: applyLeadToQuestionnaire(value.questionnaire, nextLead),
    });
  }

  function goPrevious() {
    setStep((current) => Math.max(0, current - 1));
  }

  function goNext() {
    if (!canGoNext) return;
    setStep((current) => Math.min(STEP_LABELS.length - 1, current + 1));
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-heading text-xl font-bold">
          {appointment ? "Edit appointment" : "New appointment"}
        </DialogTitle>
      </DialogHeader>

      <QuestionProgress index={step} total={STEP_LABELS.length} label="Step" />
      <p className="mb-3 text-sm font-medium text-foreground">
        {STEP_LABELS[step]}
      </p>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!canSave) return;
          onSave({
            ...value,
            questionnaire: applyLeadToQuestionnaire(value.questionnaire, lead),
          });
          onClose();
        }}
      >
        {step === 0 ? (
          <AppointmentBasicsFields
            value={value}
            leads={leads}
            onChange={setValue}
            onLeadChange={selectLead}
          />
        ) : null}
        {step === 1 ? (
          <AppointmentQuestionnaireFields
            lead={lead}
            value={value.questionnaire}
            onChange={(questionnaire) =>
              setValue({
                ...value,
                questionnaire: applyLeadToQuestionnaire(questionnaire, lead),
              })
            }
          />
        ) : null}
        {step === 2 ? (
          <AppointmentMeetStep value={value} lead={lead} onChange={setValue} />
        ) : null}

        <DialogFooter className="flex-row items-center justify-between gap-2 sm:justify-between">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Previous step"
              disabled={step === 0}
              onClick={goPrevious}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Next step"
              disabled={step >= STEP_LABELS.length - 1 || !canGoNext}
              onClick={goNext}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {step === STEP_LABELS.length - 1 ? (
              <Button type="submit" disabled={!canSave}>
                {appointment ? "Save changes" : "Create"}
              </Button>
            ) : null}
          </div>
        </DialogFooter>
      </form>
    </>
  );
}
