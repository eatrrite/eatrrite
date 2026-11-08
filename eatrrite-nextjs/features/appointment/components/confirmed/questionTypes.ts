import { QUESTIONNAIRE_QUESTIONS } from "@/features/appointment/constants/questionnaire-questions";
import type { QuestionnaireQuestion } from "@/features/appointment/types/questionnaire";

export const QUESTION_STEPS = QUESTIONNAIRE_QUESTIONS;

export function isAnswered(
  step: QuestionnaireQuestion,
  value: string | string[] | undefined,
) {
  if (!step.required) return true;
  return Array.isArray(value)
    ? value.length > 0
    : Boolean(value && String(value).trim());
}
