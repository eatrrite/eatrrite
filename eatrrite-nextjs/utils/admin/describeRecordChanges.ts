import { APPOINTMENT_STATUS_LABELS } from "@/constants/admin/appointments/statuses";
import { PATIENT_STATUS_LABELS } from "@/constants/admin/patients/statuses";
import type { ShowToastInput } from "@/hooks/admin/useShowToast";
import type {
  Appointment,
  AppointmentInput,
  Patient,
  PatientInput,
} from "@/types/admin/admin";

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

export function patientSaveToast(
  editing: Patient | null,
  input: PatientInput,
): ShowToastInput {
  if (!editing) {
    return {
      title: "Patient added",
      description: [
        `${input.name} (${input.age} years`,
        input.profession ? `, ${input.profession}` : "",
        `) was added as ${PATIENT_STATUS_LABELS[input.status]}.`,
      ].join(""),
      type: "success",
    };
  }
  const changes: FieldChange[] = [];
  pushIfChanged(changes, "name", editing.name, input.name);
  pushIfChanged(changes, "phone", editing.phone, input.phone);
  pushIfChanged(changes, "age", String(editing.age), String(input.age));
  pushIfChanged(
    changes,
    "profession",
    editing.profession ?? "",
    input.profession ?? "",
  );
  pushIfChanged(
    changes,
    "status",
    PATIENT_STATUS_LABELS[editing.status],
    PATIENT_STATUS_LABELS[input.status],
  );
  pushIfChanged(changes, "email", editing.email ?? "", input.email ?? "");
  pushIfChanged(changes, "address", editing.address ?? "", input.address ?? "");
  return {
    title: "Patient updated",
    description: formatChanges(editing.name, changes),
    type: "success",
  };
}

export function appointmentSaveToast(
  editing: Appointment | null,
  input: AppointmentInput,
  previousPatientName: string,
  nextPatientName: string,
): ShowToastInput {
  if (!editing) {
    return {
      title: "Appointment added",
      description: `Consultation for ${nextPatientName} on ${input.date} at ${input.time} was scheduled.`,
      type: "success",
    };
  }
  const changes: FieldChange[] = [];
  pushIfChanged(changes, "patient", previousPatientName, nextPatientName);
  pushIfChanged(changes, "date", editing.date, input.date);
  pushIfChanged(changes, "time", editing.time, input.time);
  pushIfChanged(changes, "reason", editing.reason, input.reason);
  pushIfChanged(
    changes,
    "status",
    APPOINTMENT_STATUS_LABELS[editing.status],
    APPOINTMENT_STATUS_LABELS[input.status],
  );
  pushIfChanged(changes, "notes", editing.notes ?? "", input.notes ?? "");
  return {
    title: "Appointment updated",
    description: formatChanges(previousPatientName, changes),
    type: "success",
  };
}
