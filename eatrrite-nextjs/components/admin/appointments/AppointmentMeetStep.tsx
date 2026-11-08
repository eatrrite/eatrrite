"use client";

import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ClinicAppointmentInput } from "@/types/admin/appointment";
import { hasAppointmentBasics } from "@/utils/admin/appointmentReady";
import { generateAdminMeetLink } from "@/utils/admin/generateMeetLink";
import { isAdminQuestionnaireComplete } from "@/utils/admin/leadQuestionnaire";
import type { Lead } from "@/types/admin/lead";

type AppointmentMeetStepProps = {
  value: ClinicAppointmentInput;
  lead: Lead | undefined;
  onChange: (next: ClinicAppointmentInput) => void;
};

export function AppointmentMeetStep({
  value,
  lead,
  onChange,
}: AppointmentMeetStepProps) {
  const basicsReady = hasAppointmentBasics(value);
  const questionnaireReady = isAdminQuestionnaireComplete(
    value.questionnaire,
    lead,
  );
  const canGenerate = basicsReady && questionnaireReady;

  function generate() {
    if (!canGenerate) return;
    onChange({ ...value, meetLink: generateAdminMeetLink() });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border px-3.5 py-4">
        <p className="mb-1 flex items-center gap-1.5 text-sm font-medium text-foreground">
          <Link2 className="size-4" />
          Google Meet link
        </p>
        <p className="mb-3 text-sm text-muted-foreground">
          Generate the Meet link after the booking details and questionnaire are
          complete. Save stays disabled until the link exists.
        </p>

        {!canGenerate ? (
          <p className="text-sm text-alert-text">
            Finish step 1 and step 2 before generating a Meet link.
          </p>
        ) : null}

        {value.meetLink ? (
          <div className="space-y-3">
            <a
              href={value.meetLink}
              target="_blank"
              rel="noreferrer"
              className="block break-all text-sm font-semibold text-primary underline-offset-2 hover:underline"
            >
              {value.meetLink}
            </a>
            <Button type="button" variant="outline" onClick={generate}>
              Generate new link
            </Button>
          </div>
        ) : (
          <Button type="button" disabled={!canGenerate} onClick={generate}>
            Generate Meet link
          </Button>
        )}
      </div>
    </div>
  );
}
