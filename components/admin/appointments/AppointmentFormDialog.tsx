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
  Appointment,
  AppointmentInput,
} from "@/types/admin/appointment";
import type { Lead } from "@/types/admin/lead";
import { useAdminStore } from "@/stores/useAdminStore";
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
  { label: "Questionnaire", title: "Health questionnaire", hint: "Optional. Answer on the lead's behalf, or skip it and share the questionnaire link from the appointment details." },
  { label: "Meet link", title: "Review and create the Meet link", hint: "Check the details. Generate the link now, or save and it is made when the lead sends the questionnaire." },
] as const;
const LAST = STEPS.length - 1;

type AppointmentFormDialogProps = {
  open: boolean;
  appointment?: Appointment | null;
  defaults?: Partial<AppointmentInput>;
  leads: Lead[];
  onClose: () => void;
  /** Resolves true once saved; the dialog stays open otherwise. */
  onSave: (input: AppointmentInput) => Promise<boolean>;
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
  const [saving, setSaving] = useState(false);
  const [value, setValue] = useState(() => {
    const input = appointmentToInput(appointment, leads, defaults);
    const lead = leads.find((item) => item.id === input.leadId);
    return {
      ...input,
      questionnaire: applyLeadToQuestionnaire(input.questionnaire, lead),
    };
  });

  const days = useAdminStore((s) => s.days);
  const appointments = useAdminStore((s) => s.appointments);
  const slotsFor = useAdminStore((s) => s.slotsFor);
  const settings = useAdminStore((s) => s.settings);
  const questions = useAdminStore((s) => s.questions);

  const lead = leads.find((item) => item.id === value.leadId);
  const slotError = value.date && value.time ? adminSlotError(value, days, appointments, settings, appointment) : null;
  // Editing an appointment: the steps above are free tabs, and Save needs only the booking details.
  // A website booking may still have no questionnaire or Meet link, and the admin must still be
  // able to change its status. Creating one keeps all three steps.
  // The questionnaire is optional: the lead usually fills it from the link in the appointment
  // details (see canSaveAppointment).
  const isEdit = Boolean(appointment);
  const basicsDone = hasAppointmentBasics(value) && !slotError;
  const questionnaireDone = isAdminQuestionnaireComplete(value.questionnaire, lead, questions);
  const canSave = isEdit ? basicsDone : canSaveAppointment(value, lead, questions) && !slotError;
  // An edit may keep its saved time even if the schedule has since changed.
  const keepsSavedTime = (date: string, time: string) => appointment?.date === date && appointment.time === time;
  const timeOptions = slotsFor(value.date, appointment?.id);
  const visibleTimes = value.time && keepsSavedTime(value.date, value.time) && !timeOptions.includes(value.time) ? [...timeOptions, value.time].sort() : timeOptions;
  const stepDone = [basicsDone, questionnaireDone, canSave];
  const canGoNext = step === 0 ? basicsDone : step === 1;

  // A step opens once the booking step is complete; the questionnaire never blocks.
  const canOpen = (index: number) => isEdit || index === 0 || basicsDone;

  // Say what is missing instead of leaving "Continue" greyed out without a reason.
  const missing = missingBasics(value);
  const unanswered = unansweredRequiredCount(value.questionnaire, questions);
  const bookingHint = slotError ?? `Still needed: ${missing.join(", ")}`;
  const createHint =
    step === 0 && !basicsDone
      ? bookingHint
      : step === 1 && !questionnaireDone
        ? `${unanswered} required ${unanswered === 1 ? "question" : "questions"} left. Unfinished answers are not saved.`
        : step === LAST && !canSave
          ? "Generate the Meet link to finish"
          : null;
  const hint = isEdit ? (basicsDone ? null : bookingHint) : createHint;

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

  // Waits for the database: the dialog closes only when the appointment is saved.
  async function save() {
    if (!canSave || saving) return;
    setSaving(true);
    // Unfinished answers are dropped: the questionnaire link only opens for an empty one, and the
    // lead then fills it in full.
    const questionnaire = questionnaireDone ? applyLeadToQuestionnaire(value.questionnaire, lead) : [];
    const saved = await onSave({ ...value, questionnaire });
    setSaving(false);
    if (saved) onClose();
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        // Creating: Enter moves forward until the last step, where it saves. Editing: Enter saves.
        if (!isEdit && step < LAST) {
          if (canGoNext) setStep(step + 1);
          return;
        }
        save();
      }}
    >
      <DialogHeader className="sticky top-0 z-10 -mx-4 -mt-4 gap-4 border-b bg-popover px-4 pt-4 pb-4">
        <div>
          <DialogTitle className="font-heading text-xl font-bold">
            {isEdit ? "Edit appointment" : "New appointment"}
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
          questions={questions}
          value={value.questionnaire}
          onChange={(questionnaire) =>
            setValue({
              ...value,
              questionnaire: applyLeadToQuestionnaire(questionnaire, lead),
            })
          }
        />
      ) : null}
      {step === 2 ? <AppointmentMeetStep value={value} lead={lead} onChange={setValue} questions={questions} appointmentId={appointment?.id} /> : null}

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
          {!isEdit && step > 0 ? (
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
          {!isEdit && step < LAST ? (
            <Button type="button" disabled={!canGoNext} onClick={() => setStep(step + 1)}>
              Continue
              <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={!canSave || saving}>
              {saving ? "Saving…" : isEdit ? "Save changes" : "Create appointment"}
            </Button>
          )}
        </div>
      </DialogFooter>
    </form>
  );
}
