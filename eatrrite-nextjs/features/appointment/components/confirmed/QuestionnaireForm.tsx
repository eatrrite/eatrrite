"use client";

import { useEffect, useRef, useState } from "react";
import { AppointmentQuestionnaireFields } from "@/components/admin/appointments/AppointmentQuestionnaireFields";
import { ChoiceChips } from "@/components/admin/forms/ChoiceChips";
import { QuestionLabel } from "@/components/admin/forms/QuestionLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import copy from "@/features/appointment/constants/questionnaire.json";
import type { QuestionnaireAnswers } from "@/features/appointment/types/questionnaire";
import { useProgressToast } from "@/hooks/useProgressToast";
import { useShowToast } from "@/hooks/useShowToast";
import { useAdminStore } from "@/stores/useAdminStore";
import type { Lead, LeadGender } from "@/types/admin/lead";
import { unansweredRequiredCount } from "@/utils/admin/leadQuestionnaire";

const GENDERS: LeadGender[] = ["Female", "Male"];
// Name, age and gender come first, then the questions the admin form shows in step 2.
const PROFILE_QUESTIONS = 3;
const REQUIRED_TOTAL = PROFILE_QUESTIONS + unansweredRequiredCount([]);

// The questionnaire the customer fills in after paying. Same questions as the admin's step 2,
// plus name, age and gender. The name starts as what they typed when booking. Submitting saves
// the answers on the appointment and shows the Meet link.
export function QuestionnaireForm({ appointmentId, lead }: { appointmentId: string; lead: Lead }) {
  const submitQuestionnaire = useAdminStore((s) => s.submitQuestionnaire);
  const showToast = useShowToast();
  const showProgress = useProgressToast();
  const [name, setName] = useState(lead.name);
  const [age, setAge] = useState(lead.age ? String(lead.age) : "");
  const [gender, setGender] = useState<LeadGender | "">(lead.gender ?? "");
  const [answers, setAnswers] = useState<QuestionnaireAnswers>([]);

  const profile = { ...lead, name: name.trim() || lead.name, age: age ? Number(age) : undefined, gender: gender || undefined };
  const left = unansweredRequiredCount(answers) + (name.trim().length >= 2 ? 0 : 1) + (age ? 0 : 1) + (gender ? 0 : 1);
  const done = REQUIRED_TOTAL - left;

  // After each change that moves the count, tell the customer how far along they are.
  const lastDone = useRef(done);
  useEffect(() => {
    if (lastDone.current === done) return;
    lastDone.current = done;
    showProgress(done, REQUIRED_TOTAL, "answered");
  }, [done, showProgress]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (left > 0 || !gender) return;
    const result = submitQuestionnaire(appointmentId, { name, age: Number(age), gender, answers });
    if (!result.ok) {
      showToast({ title: "Please check your answers", description: result.error, type: "error" });
      return;
    }
    showToast({ title: "Questionnaire submitted", description: "Your Google Meet link is ready.", type: "success" });
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

      <AppointmentQuestionnaireFields lead={profile} value={answers} onChange={setAnswers} firstNumber={PROFILE_QUESTIONS + 1} />

      <div className="flex flex-wrap items-center justify-end gap-3">
        {left > 0 ? (
          <p aria-live="polite" className="m-0 mr-auto text-sm text-muted-foreground">
            {left} required {left === 1 ? "answer" : "answers"} left
          </p>
        ) : null}
        <Button type="submit" size="xl" disabled={left > 0}>
          Submit questionnaire
        </Button>
      </div>
    </form>
  );
}
