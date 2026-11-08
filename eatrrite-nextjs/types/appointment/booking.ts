import type { QuestionnaireAnswerMap } from "@/types/appointment/questionnaire";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "finalizing"
  | "completed"
  | "failed"
  | "cancelled";

export type BookingInput = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string; // YYYY-MM-DD in IST
  time: string; // HH:MM in IST
};

export type BookingAppointment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  slotStart: string;
  status: BookingStatus;
  razorpayPaymentId: string | null;
  questionnaire: QuestionnaireAnswerMap | null;
  meetLink: string | null;
};

export type BookingSlot = {
  date: string;
  time: string;
};
