"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppointmentBasicsFields } from "@/components/admin/appointments/AppointmentBasicsFields";
import { AppointmentMeetStep } from "@/components/admin/appointments/AppointmentMeetStep";
import { AppointmentQuestionnaireFields } from "@/components/admin/appointments/AppointmentQuestionnaireFields";
import { FormStepper } from "@/components/admin/forms/FormStepper";
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
import { useClinicStore } from "@/stores/adminStore";
import { appointmentToInput } from "@/utils/admin/appointmentForm";
import { adminSlotError } from "@/features/appointment/utils/appointmentSlots";
import {
  canSaveAppointment,
  hasAppointmentBasics,
  missingBasics,
} from "@/utils/admin/appointmentReady";
import {
  applyLeadToQuestionnaire,
  isAdminQuestionnaireComplete,
  unansweredRequiredCount,
} from "@/utils/admin/leadQuestionnaire";

const STEPS = [
  { label: "Booking", title: "Who and when", hint: "Choose the lead, then the date, time and service." },
  { label: "Questionnaire", title: "Health questionnaire", hint: "Answer on the lead's behalf. Fields marked * are required." },
  { label: "Meet link", title: "Review and create the Meet link", hint: "Check the details, then generate the link to finish." },
] as const;
const LAST = STEPS.length - 1;

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
      <DialogContent className="sm:max-w-2xl" showCloseButton>
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

  const days = useClinicStore((s) => s.days);
  const appointments = useClinicStore((s) => s.appointments);
  const slotsFor = useClinicStore((s) => s.slotsFor);

  const lead = leads.find((item) => item.id === value.leadId);
  const slotError = value.date && value.time ? adminSlotError(value, days, appointments, appointment) : null;
  const canSave = canSaveAppointment(value, lead) && !slotError;
  const basicsDone = hasAppointmentBasics(value) && !slotError;
  // An edit may keep its saved time even if the schedule has since changed.
  const keepsSavedTime = (date: string, time: string) => appointment?.date === date && appointment.time === time;
  const timeOptions = slotsFor(value.date, appointment?.id);
  const visibleTimes = value.time && keepsSavedTime(value.date, value.time) && !timeOptions.includes(value.time) ? [...timeOptions, value.time].sort() : timeOptions;
  const questionnaireDone = isAdminQuestionnaireComplete(value.questionnaire, lead);
  const stepDone = [basicsDone, questionnaireDone, canSave];
  const canGoNext = step === 0 ? basicsDone : step === 1 ? questionnaireDone : false;

  // A step opens once every step before it is complete.
  const canOpen = (index: number) => stepDone.slice(0, index).every(Boolean);

  // Say what is missing instead of leaving "Continue" greyed out without a reason.
  const missing = missingBasics(value);
  const unanswered = unansweredRequiredCount(value.questionnaire);
  const hint =
    step === 0 && !basicsDone
      ? slotError ?? `Still needed: ${missing.join(", ")}`
      : step === 1 && !questionnaireDone
        ? `${unanswered} required ${unanswered === 1 ? "question" : "questions"} left`
        : step === LAST && !canSave
          ? "Generate the Meet link to finish"
          : null;

  function selectLead(leadId: string) {
    const nextLead = leads.find((item) => item.id === leadId);
    setValue({
      ...value,
      leadId,
      meetLink: undefined,
      questionnaire: applyLeadToQuestionnaire(value.questionnaire, nextLead),
    });
  }

  // A new day has its own working hours, so a time that no longer fits is cleared.
  function changeDate(date: string) {
    const times = slotsFor(date, appointment?.id);
    const stillValid = times.includes(value.time) || keepsSavedTime(date, value.time);
    setValue({ ...value, date, time: stillValid ? value.time : "" });
  }

  function save() {
    if (!canSave) return;
    onSave({
      ...value,
      questionnaire: applyLeadToQuestionnaire(value.questionnaire, lead),
    });
    onClose();
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        // Enter moves forward until the last step, where it saves.
        if (step < LAST) {
          if (canGoNext) setStep(step + 1);
          return;
        }
        save();
      }}
    >
      <DialogHeader className="sticky top-0 z-10 -mx-4 -mt-4 gap-4 border-b bg-popover px-4 pt-4 pb-4">
        <div>
          <DialogTitle className="font-heading text-xl font-bold">
            {appointment ? "Edit appointment" : "New appointment"}
          </DialogTitle>
          <p className="m-0 mt-1 hidden text-sm text-muted-foreground sm:block">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>
        <FormStepper
          steps={STEPS.map((item, index) => ({ label: item.label, done: stepDone[index] }))}
          current={step}
          canOpen={canOpen}
          onOpen={setStep}
        />
      </DialogHeader>

      <div>
        <h3 className="m-0 font-heading text-base font-bold text-foreground">{STEPS[step].title}</h3>
        <p className="m-0 mt-0.5 text-sm text-muted-foreground">{STEPS[step].hint}</p>
      </div>

      {step === 0 ? (
        <AppointmentBasicsFields value={value} leads={leads} onChange={setValue} onLeadChange={selectLead} onDateChange={changeDate} timeOptions={visibleTimes} slotError={slotError} />
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
      {step === 2 ? <AppointmentMeetStep value={value} lead={lead} onChange={setValue} /> : null}

      <DialogFooter className="flex-row flex-wrap items-center justify-between gap-x-3 gap-y-2">
        {/* Phones: hint on its own line, then Back on the left and actions on the right. */}
        {hint ? (
          <p aria-live="polite" className="order-1 m-0 basis-full text-xs text-muted-foreground sm:order-2 sm:basis-auto sm:flex-1">
            {hint}
          </p>
        ) : (
          <span className="hidden sm:order-2 sm:block sm:flex-1" />
        )}
        <div className="order-2 sm:order-1">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
              <ChevronLeft className="size-4" />
              Back
            </Button>
          ) : null}
        </div>
        <div className="order-3 flex items-center gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {step < LAST ? (
            <Button type="button" disabled={!canGoNext} onClick={() => setStep(step + 1)}>
              Continue
              <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={!canSave}>
              {appointment ? "Save changes" : "Create appointment"}
            </Button>
          )}
        </div>
      </DialogFooter>
    </form>
  );
}
