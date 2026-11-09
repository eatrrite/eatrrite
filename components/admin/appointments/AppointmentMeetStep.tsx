"use client";

import { Check, CircleDashed, Copy, Link2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useMeetLink } from "@/hooks/admin/useMeetLink";
import { AppointmentLeadSummary } from "@/components/admin/appointments/AppointmentLeadSummary";
import { Button } from "@/components/ui/button";
import { APPOINTMENT_STATUS_LABELS } from "@/constants/admin/appointments/statuses";
import type { AppointmentInput } from "@/types/admin/appointment";
import type { Lead } from "@/types/admin/lead";
import type { QuestionnaireQuestion } from "@/features/appointment/types/questionnaire";
import { hasAppointmentBasics } from "@/utils/admin/appointmentReady";
import { formatDateLabel } from "@/utils/admin/date";
import { isAdminQuestionnaireComplete } from "@/utils/admin/leadQuestionnaire";
import { formatTimeLabel } from "@/utils/admin/time";

type AppointmentMeetStepProps = {
  value: AppointmentInput;
  lead: Lead | undefined;
  onChange: (next: AppointmentInput) => void;
  questions: QuestionnaireQuestion[];
  /** Set when editing: the first link uses the appointment's own id. */
  appointmentId?: string;
};

function Ready({ done, children }: { done: boolean; children: string }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      {done ? <Check className="size-4 text-primary" /> : <CircleDashed className="size-4 text-muted-foreground" />}
      <span className={done ? "text-foreground" : "text-muted-foreground"}>{children}</span>
    </li>
  );
}

export function AppointmentMeetStep({ value, lead, onChange, questions, appointmentId }: AppointmentMeetStepProps) {
  const basicsReady = hasAppointmentBasics(value);
  const questionnaireReady = isAdminQuestionnaireComplete(value.questionnaire, lead, questions);
  const canGenerate = basicsReady;
  const { creating, generate } = useMeetLink({ value, leadName: lead?.name, appointmentId, enabled: canGenerate, onCreated: (meetLink) => onChange({ ...value, meetLink }) });

  async function copy() {
    if (!value.meetLink) return;
    try {
      await navigator.clipboard.writeText(value.meetLink);
      toast.success("Meet link copied");
    } catch {
      toast.error("Could not copy the link");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <AppointmentLeadSummary lead={lead} />

      <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-xl border border-border px-3.5 py-3 text-sm">
        <dt className="text-muted-foreground">When</dt>
        <dd className="m-0 text-foreground">
          {value.date ? formatDateLabel(value.date) : "—"}
          {value.time ? ` · ${formatTimeLabel(value.time)}` : ""}
        </dd>
        <dt className="text-muted-foreground">Service</dt>
        <dd className="m-0 text-foreground">{value.service || "—"}</dd>
        <dt className="text-muted-foreground">Status</dt>
        <dd className="m-0 text-foreground">{APPOINTMENT_STATUS_LABELS[value.status]}</dd>
      </dl>

      <div className="flex flex-col items-start gap-3 rounded-xl border border-border bg-mint px-3.5 py-4">
        <p className="m-0 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Link2 className="size-4 text-primary" />
          Google Meet link
        </p>

        {value.meetLink ? (
          <>
            <a href={value.meetLink} target="_blank" rel="noreferrer" className="block text-sm font-semibold break-all text-primary underline-offset-2 hover:underline">
              {value.meetLink}
            </a>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" onClick={copy}>
                <Copy className="size-4" />
                Copy link
              </Button>
              <Button type="button" variant="secondary" disabled={creating} onClick={() => generate(true)}>
                <RefreshCw className="size-4" />
                {creating ? "Creating…" : "Generate a new link"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              <Ready done={basicsReady}>Booking details filled in</Ready>
              <Ready done={questionnaireReady}>{questionnaireReady ? "Questionnaire answered" : "Questionnaire: the lead fills it from the link"}</Ready>
            </ul>
            <Button type="button" disabled={!canGenerate || creating} onClick={() => generate()}>
              {creating ? "Creating…" : "Generate Meet link"}
            </Button>
            <p className="m-0 text-xs text-muted-foreground">
              {questionnaireReady
                ? "The appointment can be saved once the link exists."
                : "You can save without it: the link is made when the lead sends the questionnaire."}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
