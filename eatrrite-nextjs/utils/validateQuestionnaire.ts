import questionnaire from "@/constants/appointment/questionnaire.json";
import type { QuestionnaireAnswers } from "@/types/appointment";

type Step = (typeof questionnaire.steps)[number] & {
  min?: number;
  max?: number;
  follow_key?: string;
};

const isList = (step: Step) => step.type === "checkbox" || step.type === "checkbox-groups";

function answerFor(step: Step, value: unknown): string | string[] {
  if (isList(step)) return Array.isArray(value) ? value.map(String).filter(Boolean) : [];
  return typeof value === "string" || typeof value === "number" ? String(value).trim() : "";
}

function stepError(step: Step, answer: string | string[]): string | null {
  if (step.required && answer.length === 0) return `Please answer: ${step.label}`;
  if (step.type !== "number") return null;
  const age = Number(answer);
  const inRange = age >= (step.min ?? 13) && age <= (step.max ?? 90);
  return inRange ? null : `Please enter an age between ${step.min ?? 13} and ${step.max ?? 90}.`;
}

// Same rules as QuestionnaireValidator.php. Returns answers or an error message.
export function validateQuestionnaire(input: Record<string, unknown>): QuestionnaireAnswers | string {
  const answers: QuestionnaireAnswers = {};
  for (const step of questionnaire.steps as Step[]) {
    const answer = answerFor(step, input[step.key]);
    const error = stepError(step, answer);
    if (error) return error;
    answers[step.key] = answer;
    if (step.follow_key) answers[step.follow_key] = answerFor({ ...step, type: "textarea" }, input[step.follow_key]);
  }
  return answers;
}
