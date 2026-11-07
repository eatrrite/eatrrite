export type AppointmentStatus =
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

export type Appointment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  slotStart: string;
  status: AppointmentStatus;
  razorpayPaymentId: string | null;
  questionnaire: Record<string, string | string[]> | null;
  meetLink: string | null;
};

export type QuestionnaireAnswers = Record<string, string | string[]>;
