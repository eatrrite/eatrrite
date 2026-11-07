import questionnaire from "@/constants/appointment/questionnaire.json";

export type QuestionStep = {
  key: string;
  label: string;
  type: string;
  required: boolean;
  min?: number;
  max?: number;
  options?: string[];
  groups?: Record<string, string[]>;
  follow_key?: string;
  follow_label?: string;
};

export const QUESTION_STEPS = questionnaire.steps as QuestionStep[];

// True when a required step has an answer.
export function isAnswered(step: QuestionStep, value: string | string[] | undefined) {
  if (!step.required) return true;
  return Array.isArray(value) ? value.length > 0 : Boolean(value && String(value).trim());
}
