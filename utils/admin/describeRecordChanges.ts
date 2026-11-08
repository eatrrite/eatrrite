import { APPOINTMENT_STATUS_LABELS } from "@/constants/admin/appointments/statuses";
import type { ShowToastInput } from "@/hooks/useShowToast";
import type {
  Appointment,
  AppointmentInput,
} from "@/types/admin/appointment";
import type { Lead, LeadInput } from "@/types/admin/lead";

type FieldChange = { label: string; to: string };

function formatChanges(subject: string, changes: FieldChange[]): string {
  if (changes.length === 0) return `${subject}'s record was saved.`;
  if (changes.length === 1) {
    return `${subject}'s ${changes[0].label} was changed to ${changes[0].to}.`;
  }
  const [first, ...rest] = changes;
  const tail = rest.map((c) => `${c.label} to ${c.to}`).join(", ");
  return `${subject}'s ${first.label} was changed to ${first.to}, ${tail}.`;
}

function pushIfChanged(
  changes: FieldChange[],
  label: string,
  before: string,
  after: string,
) {
  if (before !== after) changes.push({ label, to: after });
}

export function leadSaveToast(
  editing: Lead | null,
  input: LeadInput,
): ShowToastInput {
  if (!editing) {
    return {
      title: "Lead added",
      description: [
        `${input.name} (${input.age ?? "age not set"}${input.age ? " years" : ""}`,
        input.profession ? `, ${input.profession}` : "",
        ") was added to the lead list.",
      ].join(""),
      type: "success",
    };
  }
  const changes: FieldChange[] = [];
  pushIfChanged(changes, "name", editing.name, input.name);
  pushIfChanged(changes, "phone", editing.phone, input.phone);
  pushIfChanged(changes, "age", String(editing.age ?? "not set"), String(input.age ?? "not set"));
  pushIfChanged(changes, "gender", editing.gender ?? "not set", input.gender ?? "not set");
  pushIfChanged(
    changes,
    "profession",
    editing.profession ?? "",
    input.profession ?? "",
  );
  pushIfChanged(changes, "email", editing.email ?? "", input.email ?? "");
  pushIfChanged(changes, "address", editing.address ?? "", input.address ?? "");
  return {
    title: "Lead updated",
    description: formatChanges(editing.name, changes),
    type: "success",
  };
}

export function appointmentSaveToast(
  editing: Appointment | null,
  input: AppointmentInput,
  previousLeadName: string,
  nextLeadName: string,
): ShowToastInput {
  if (!editing) {
    return {
      title: "Appointment added",
      description: `Consultation for ${nextLeadName} on ${input.date} at ${input.time} was scheduled.`,
      type: "success",
    };
  }
  const changes: FieldChange[] = [];
  pushIfChanged(changes, "lead", previousLeadName, nextLeadName);
  pushIfChanged(changes, "date", editing.date, input.date);
  pushIfChanged(changes, "time", editing.time, input.time);
  pushIfChanged(changes, "service", editing.service, input.service);
  pushIfChanged(
    changes,
    "status",
    APPOINTMENT_STATUS_LABELS[editing.status],
    APPOINTMENT_STATUS_LABELS[input.status],
  );
  pushIfChanged(changes, "notes", editing.notes ?? "", input.notes ?? "");
  pushIfChanged(changes, "Meet link", editing.meetLink ?? "", input.meetLink ?? "");
  pushIfChanged(
    changes,
    "questionnaire answers",
    String(editing.questionnaire.length),
    String(input.questionnaire.length),
  );
  return {
    title: "Appointment updated",
    description: formatChanges(previousLeadName, changes),
    type: "success",
  };
}
