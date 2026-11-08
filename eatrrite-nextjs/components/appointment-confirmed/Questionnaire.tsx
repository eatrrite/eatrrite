"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import questionnaire from "@/constants/appointment/questionnaire.json";
import { submitQuestionnaire } from "@/services/bookingApi";
import type { QuestionnaireAnswerMap } from "@/types/appointment/questionnaire";
import { MeetStatus } from "./MeetStatus";
import { QuestionProgress } from "./QuestionProgress";
import { FollowUpField, QuestionField } from "./QuestionField";
import { isAnswered, QUESTION_STEPS } from "./questionTypes";

type QuestionnaireProps = {
  appointmentId: string;
  /** Name from the booking form, same as PHP questionnaire-fields.php. */
  prefillName: string;
};

// One question per step, then the Meet link panel. Copies questionnaire-form.php.
export function Questionnaire({ appointmentId, prefillName }: QuestionnaireProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswerMap>(() => {
    const initial: QuestionnaireAnswerMap = {};
    const name = prefillName.trim();
    if (name) initial.name = name;
    return initial;
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const step = QUESTION_STEPS[index];
  const isLast = index === QUESTION_STEPS.length - 1;
  const setAnswer = (key: string) => (value: string | string[]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  async function next() {
    if (!isAnswered(step, answers[step.key])) {
      return setError(`Please answer: ${step.label}`);
    }
    setError("");
    if (!isLast) return setIndex(index + 1);
    setBusy(true);
    const result = await submitQuestionnaire(appointmentId, answers);
    setBusy(false);
    if (!result.ok) return setError(result.error);
    setSubmitted(true);
  }

  if (submitted) return <MeetStatus appointmentId={appointmentId} initialLink={null} />;
  return (
    <div>
      <p className="mb-2 font-script text-2xl text-primary sm:text-3xl">{questionnaire.kicker}</p>
      <p className="mb-2 text-text">{questionnaire.lead}</p>
      <p className="mb-0 text-sm text-muted-foreground">{questionnaire.note}</p>
      <QuestionProgress index={index} total={QUESTION_STEPS.length} />
      {error ? (
        <p role="alert" className="mb-4 rounded-xs bg-alert-bg px-4 py-3 text-sm text-alert-text">
          {error}
        </p>
      ) : null}
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-4 font-heading text-xl font-semibold text-ink">{step.label}</legend>
        <QuestionField
          key={step.key}
          step={step}
          value={answers[step.key] ?? ""}
          onChange={setAnswer(step.key)}
        />
        {step.follow_key ? (
          <FollowUpField
            label={step.follow_label ?? ""}
            value={String(answers[step.follow_key] ?? "")}
            onChange={setAnswer(step.follow_key)}
          />
        ) : null}
      </fieldset>
      <div className="mt-6 flex justify-between gap-3">
        {index > 0 ? (
          <button
            type="button"
            className="cursor-pointer px-4 font-semibold text-text"
            onClick={() => setIndex(index - 1)}
          >
            Back
          </button>
        ) : (
          <span />
        )}
        <Button type="button" size="xl" onClick={next} disabled={busy}>
          {busy ? "Submitting…" : isLast ? "Submit questionnaire" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
