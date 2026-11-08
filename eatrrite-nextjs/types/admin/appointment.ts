import type { QuestionnaireAnswers } from "@/features/appointment/types/questionnaire";

export type AppointmentStatus =
  | "upcoming"
  | "completed"
  | "not-attended"
  | "cancelled";

export type Appointment = {
  id: string;
  leadId: string;
  date: string;
  time: string;
  service: string;
  status: AppointmentStatus;
  notes?: string;
  meetLink?: string;
  /** Razorpay payment id of a website booking. Stops one payment creating two appointments. */
  paymentId?: string;
  questionnaire: QuestionnaireAnswers;
  createdAt: string;
  updatedAt: string;
};

export type AppointmentInput = Omit<
  Appointment,
  "id" | "createdAt" | "updatedAt"
>;

export type AppointmentDateFilter =
  | "all"
  | "today"
  | "this-week"
  | "this-month";

export type AppointmentListFilters = {
  query: string;
  status: "all" | AppointmentStatus;
  date: AppointmentDateFilter;
};
