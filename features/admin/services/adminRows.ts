import "server-only";
import type { QuestionnaireAnswers } from "@/features/appointment/types/questionnaire";
import type { Appointment, AppointmentStatus } from "@/types/admin/appointment";
import type { Lead, LeadGender } from "@/types/admin/lead";
import type { Todo } from "@/types/admin/todo";

// Database rows to the shapes the admin pages use. Empty columns become missing fields.

const iso = (value: Date | string) => new Date(value).toISOString();
const optional = <T,>(value: T | null) => value ?? undefined;

export type LeadRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  age: number | null;
  gender: LeadGender | null;
  profession: string | null;
  address: string | null;
  created_at: Date;
  updated_at: Date;
};

export const toLead = (row: LeadRow): Lead => ({
  id: row.id,
  name: row.name,
  phone: row.phone,
  email: optional(row.email),
  age: optional(row.age),
  gender: optional(row.gender),
  profession: optional(row.profession),
  address: optional(row.address),
  createdAt: iso(row.created_at),
  updatedAt: iso(row.updated_at),
});

export type AppointmentRow = {
  id: string;
  lead_id: string;
  date: string;
  time: string;
  service: string;
  status: AppointmentStatus;
  notes: string | null;
  meet_link: string | null;
  payment_id: string | null;
  questionnaire: QuestionnaireAnswers;
  created_at: Date;
  updated_at: Date;
};

export const toAppointment = (row: AppointmentRow): Appointment => ({
  id: row.id,
  leadId: row.lead_id,
  date: row.date,
  time: row.time,
  service: row.service,
  status: row.status,
  notes: optional(row.notes),
  meetLink: optional(row.meet_link),
  paymentId: optional(row.payment_id),
  questionnaire: row.questionnaire ?? [],
  createdAt: iso(row.created_at),
  updatedAt: iso(row.updated_at),
});

export type TodoRow = { id: string; label: string; done: boolean; date: string };

export const toTodo = (row: TodoRow): Todo => ({ id: row.id, label: row.label, done: row.done, date: row.date });
