import type { DateRange } from "react-day-picker";
import type { QuestionnaireAnswers } from "@/features/appointment/types/questionnaire";

export type AppointmentStatus =
  | "upcoming"
  | "completed"
  | "not-attended"
  | "cancelled";

/** Bulk "mark as completed" changes only these. Cancelled stays cancelled: its slot may be rebooked. */
export const canBulkComplete = (status: AppointmentStatus) => status === "upcoming" || status === "not-attended";

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
  /** The ₹800 fee is paid (website checkout, or marked paid by the admin). False: still due. */
  paymentDone: boolean;
  /** When the fee was received (paid_at). Places revenue in the dashboard's date range. */
  paidAt?: string;
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
  payment: AppointmentPaymentFilter;
  sort: AppointmentSort;
  /** Appointments on days between these (replaces the date preset while set). */
  dateRange?: DateRange;
};

export type AppointmentPaymentFilter = "all" | "paid" | "due";

/** List order: last added or changed first (updated_at), or by appointment date and time. */
export type AppointmentSort = "updated" | "date-asc" | "date-desc";
