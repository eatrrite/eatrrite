import type { PatientStatus } from "@/types/admin/admin";

export const PATIENT_STATUSES = [
  "new",
  "follow-up-one",
  "follow-up-two",
  "follow-up-three",
  "done",
] as const satisfies readonly PatientStatus[];

export const PATIENT_STATUS_LABELS: Record<PatientStatus, string> = {
  new: "New",
  "follow-up-one": "Follow-up 1",
  "follow-up-two": "Follow-up 2",
  "follow-up-three": "Follow-up 3",
  done: "Done",
};

export const PATIENT_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All statuses" },
  ...PATIENT_STATUSES.map((status) => ({
    value: status,
    label: PATIENT_STATUS_LABELS[status],
  })),
] as const;
