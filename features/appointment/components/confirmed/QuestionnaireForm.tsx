"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AppointmentQuestionnaireFields } from "@/components/admin/appointments/AppointmentQuestionnaireFields";
import { ChoiceChips } from "@/components/admin/forms/ChoiceChips";
import { QuestionLabel } from "@/components/admin/forms/QuestionLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import copy from "@/features/appointment/constants/questionnaire.json";
import { submitQuestionnaireAction } from "@/features/appointment/services/bookingActions";
import type { ConfirmedBooking } from "@/features/appointment/services/questionnaireDb";
import type { QuestionnaireAnswers, QuestionnaireQuestion } from "@/features/appointment/types/questionnaire";
import { useProgressToast } from "@/hooks/useProgressToast";
import { useShowToast } from "@/hooks/useShowToast";
import type { Lead, LeadGender } from "@/types/admin/lead";
import { unansweredRequiredCount } from "@/utils/admin/leadQuestionnaire";

const GENDERS: LeadGender[] = ["Female", "Male"];
// Name, age and gender come first, then the questions the admin form shows in step 2.
const PROFILE_QUESTIONS = 3;

// The questionnaire the customer fills in after paying. Same questions as the admin's step 2
// (er_questions), plus name, age and gender. The name starts as what they typed when booking.
// Submitting saves the answers on the appointment; the page then refreshes and shows the Meet link.
export function QuestionnaireForm({ booking, questions }: { booking: ConfirmedBooking; questions: QuestionnaireQuestion[] }) {
  const router = useRouter();
  const showToast = useShowToast();
  const showProgress = useProgressToast();
  const [name, setName] = useState(booking.name);
  const [age, setAge] = useState(booking.age ? String(booking.age) : "");
  const [gender, setGender] = useState<LeadGender | "">(booking.gender ?? "");
  const [answers, setAnswers] = useState<QuestionnaireAnswers>([]);
  const [submitting, setSubmitting] = useState(false);

  // The lead summary at the top of the questions shows what is typed here.
  const profile: Lead = {
    id: booking.id,
    name: name.trim() || booking.name,
    phone: booking.phone,
    age: age ? Number(age) : undefined,
    gender: gender || undefined,
    createdAt: "",
    updatedAt: "",
  };
  const requiredTotal = PROFILE_QUESTIONS + unansweredRequiredCount([], questions);
  const left = unansweredRequiredCount(answers, questions) + (name.trim().length >= 2 ? 0 : 1) + (age ? 0 : 1) + (gender ? 0 : 1);
  const done = requiredTotal - left;

  // After each change that moves the count, tell the customer how far along they are.
  const lastDone = useRef(done);
  useEffect(() => {
    if (lastDone.current === done) return;
    lastDone.current = done;
    showProgress(done, requiredTotal, "answered");
  }, [done, requiredTotal, showProgress]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (left > 0 || !gender || submitting) return;
    setSubmitting(true);
    const id = showToast({ title: "Submitting your answers…", type: "pending" });
    const result = await submitQuestionnaireAction(booking.id, { name, age: Number(age), gender, answers }).catch(
      () => ({ ok: false as const, error: "Check your connection and try again." }),
    );
    if (!result.ok) {
      setSubmitting(false);
      showToast({ title: "Please check your answers", description: result.error, type: "error", id });
      return;
    }
    showToast({ title: "Questionnaire submitted", description: "Your Google Meet link is ready.", type: "success", id });
    router.refresh();
  }

  return (
    <form noValidate onSubmit={submit} className="space-y-6">
      <header>
        <p className="m-0 type-eyebrow">{copy.kicker}</p>
        <h2 className="mt-2 mb-2 font-heading text-2xl font-bold text-ink">{copy.title}</h2>
        <p className="m-0 text-text">{copy.lead}</p>
        <p className="mt-2 mb-0 text-sm text-muted-foreground">{copy.note}</p>
      </header>

      <div className="space-y-2">
        <QuestionLabel number={1} text="Name" required htmlFor="q-name" />
        <Input id="q-name" autoComplete="name" maxLength={80} placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <QuestionLabel number={2} text="Age" required htmlFor="q-age" />
          <Input id="q-age" type="number" inputMode="numeric" min={13} max={90} placeholder="Your age" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className="space-y-2">
          <QuestionLabel number={3} text="Gender" required />
          <ChoiceChips options={GENDERS} value={gender ? [gender] : []} onChange={([next]) => setGender(next as LeadGender)} />
        </div>
      </div>

      <AppointmentQuestionnaireFields lead={profile} value={answers} onChange={setAnswers} questions={questions} firstNumber={PROFILE_QUESTIONS + 1} />

      <div className="flex flex-wrap items-center justify-end gap-3">
        {left > 0 ? (
          <p aria-live="polite" className="m-0 mr-auto text-sm text-muted-foreground">
            {left} required {left === 1 ? "answer" : "answers"} left
          </p>
        ) : null}
        <Button type="submit" size="xl" disabled={left > 0 || submitting}>
          {submitting ? "Submitting…" : "Submit questionnaire"}
        </Button>
      </div>
    </form>
  );
}
