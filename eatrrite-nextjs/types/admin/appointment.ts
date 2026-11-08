import type { QuestionnaireAnswers } from "@/features/appointment/types/questionnaire";

export type ClinicAppointmentStatus =
  | "upcoming"
  | "completed"
  | "not-attended"
  | "cancelled";

export type ClinicAppointment = {
  id: string;
  leadId: string;
  date: string;
  time: string;
  service: string;
  status: ClinicAppointmentStatus;
  notes?: string;
  meetLink?: string;
  questionnaire: QuestionnaireAnswers;
  createdAt: string;
  updatedAt: string;
};

export type ClinicAppointmentInput = Omit<
  ClinicAppointment,
  "id" | "createdAt" | "updatedAt"
>;

export type AppointmentDateFilter =
  | "all"
  | "today"
  | "this-week"
  | "this-month";

export type AppointmentListFilters = {
  query: string;
  status: "all" | ClinicAppointmentStatus;
  date: AppointmentDateFilter;
};
