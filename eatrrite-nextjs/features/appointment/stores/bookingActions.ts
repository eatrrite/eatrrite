import type { Appointment } from "@/types/admin/appointment";
import type { Lead, LeadGender } from "@/types/admin/lead";
import { QUESTIONNAIRE_QUESTIONS } from "@/features/appointment/constants/questionnaire-questions";
import type { BookingInput, BookingSlot, SlotHold } from "@/features/appointment/types/booking";
import type { QuestionnaireAnswers } from "@/features/appointment/types/questionnaire";
import { hasSlotConflict } from "@/features/appointment/utils/appointmentSlots";
import { activeHolds, customerSlotError, newHoldExpiry, type SlotSource } from "@/features/appointment/utils/customerSlots";
import { createId } from "@/utils/admin/id";
import { applyLeadToQuestionnaire, isAdminQuestionnaireComplete } from "@/utils/admin/leadQuestionnaire";
import { generateAdminMeetLink } from "@/utils/admin/generateMeetLink";

type BookingState = SlotSource & { leads: Lead[] };
type SetState = (partial: Partial<BookingState> | ((state: BookingState) => Partial<BookingState>)) => void;

export type HoldResult = { ok: true; holdId: string } | { ok: false; error: string };
export type ConfirmResult = { ok: true; appointment: Appointment } | { ok: false; error: string };

export type QuestionnaireInput = { name: string; age: number; gender: LeadGender; answers: QuestionnaireAnswers };

const AGE = QUESTIONNAIRE_QUESTIONS.find((question) => question.key === "age");

const digits = (phone: string) => phone.replace(/\D/g, "").slice(-10);
const formatPhone = (phone: string) => `${phone.slice(0, 5)} ${phone.slice(5)}`;

// A customer's booking: hold the slot, then confirm it once the payment is verified.
export function createBookingActions(set: SetState, get: () => BookingState) {
  const withoutHold = (holds: SlotHold[], id: string) => holds.filter((hold) => hold.id !== id);

  return {
    // Keeps the slot for the customer while they pay. Fails if it was just taken.
    holdSlot: (slot: BookingSlot): HoldResult => {
      const problem = customerSlotError(slot.date, slot.time, get());
      if (problem) return { ok: false, error: problem.message };
      const hold: SlotHold = { ...slot, id: createId(), expiresAt: newHoldExpiry() };
      set((state) => ({ holds: [...activeHolds(state.holds), hold] }));
      return { ok: true, holdId: hold.id };
    },

    releaseHold: (holdId: string) => set((state) => ({ holds: withoutHold(state.holds, holdId) })),

    // Saves the lead and the appointment after a verified payment. Safe to call
    // twice for the same payment: the second call returns the first appointment.
    confirmBooking: (input: BookingInput, holdId: string, paymentId: string): ConfirmResult => {
      const { appointments, leads, holds } = get();
      const duplicate = appointments.find((item) => item.paymentId === paymentId);
      if (duplicate) return { ok: true, appointment: duplicate };
      if (hasSlotConflict(input.date, input.time, appointments)) {
        set({ holds: withoutHold(holds, holdId) });
        return { ok: false, error: `Payment ${paymentId} went through, but this slot was taken. Please contact us to rebook.` };
      }

      const now = new Date().toISOString();
      const known = leads.find((lead) => digits(lead.phone) === input.phone);
      const lead: Lead = known ?? { id: createId(), name: input.name, phone: formatPhone(input.phone), email: input.email, createdAt: now, updatedAt: now };
      const appointment: Appointment = {
        id: createId(),
        leadId: lead.id,
        date: input.date,
        time: input.time,
        service: input.service,
        status: "upcoming",
        questionnaire: [],
        paymentId,
        createdAt: now,
        updatedAt: now,
      };
      const nextLeads = known
        ? leads.map((item) => (item.id === known.id ? { ...item, email: item.email ?? input.email, updatedAt: now } : item))
        : [lead, ...leads];
      set({ leads: nextLeads, appointments: [appointment, ...appointments], holds: withoutHold(holds, holdId) });
      return { ok: true, appointment };
    },

    // Saves the answers on the appointment and the customer's name, age and gender on their lead,
    // then creates the (placeholder) Meet link. Answers are saved once and never overwritten.
    submitQuestionnaire: (appointmentId: string, { name, age, gender, answers }: QuestionnaireInput): ConfirmResult => {
      const { appointments, leads } = get();
      const appointment = appointments.find((item) => item.id === appointmentId);
      const lead = leads.find((item) => item.id === appointment?.leadId);
      if (!appointment || !lead) return { ok: false, error: "We could not find this booking." };
      if (appointment.questionnaire.length > 0 && appointment.meetLink) return { ok: true, appointment };
      if (name.trim().length < 2) return { ok: false, error: "Please enter your full name." };
      if (!Number.isInteger(age) || age < (AGE?.min ?? 1) || age > (AGE?.max ?? 120)) {
        return { ok: false, error: `Please enter an age between ${AGE?.min} and ${AGE?.max}.` };
      }

      const profile = { ...lead, name: name.trim(), age, gender };
      const saved = applyLeadToQuestionnaire(answers, profile);
      if (!isAdminQuestionnaireComplete(saved, profile)) return { ok: false, error: "Please answer every required question." };

      const now = new Date().toISOString();
      const next = { ...appointment, questionnaire: saved, meetLink: generateAdminMeetLink(), updatedAt: now };
      set({
        appointments: appointments.map((item) => (item.id === appointmentId ? next : item)),
        leads: leads.map((item) => (item.id === lead.id ? { ...profile, updatedAt: now } : item)),
      });
      return { ok: true, appointment: next };
    },
  };
}
