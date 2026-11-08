export type QuestionnaireAnswerValue = string | string[];

/** One answered question on an appointment. */
export type QuestionnaireAnswer = {
  key: string;
  answer: QuestionnaireAnswerValue;
};

/** Ordered list of answers for an appointment. */
export type QuestionnaireAnswers = QuestionnaireAnswer[];

/** Map form used while filling the stepper UI. */
export type QuestionnaireAnswerMap = Record<string, QuestionnaireAnswerValue>;

export type QuestionnaireQuestionType =
  | "text"
  | "number"
  | "radio"
  | "checkbox"
  | "checkbox-groups"
  | "textarea";

export type QuestionnaireQuestion = {
  key: string;
  label: string;
  type: QuestionnaireQuestionType;
  required: boolean;
  min?: number;
  max?: number;
  options?: string[];
  groups?: Record<string, string[]>;
  follow_key?: string;
  follow_label?: string;
  follow_type?: string;
  follow_required?: boolean;
};
