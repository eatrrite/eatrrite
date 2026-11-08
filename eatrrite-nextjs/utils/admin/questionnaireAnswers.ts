import type {
  QuestionnaireAnswerMap,
  QuestionnaireAnswerValue,
  QuestionnaireAnswers,
} from "@/types/appointment/questionnaire";

export function answerForKey(
  answers: QuestionnaireAnswers,
  key: string,
): QuestionnaireAnswerValue | undefined {
  return answers.find((item) => item.key === key)?.answer;
}

export function setAnswerForKey(
  answers: QuestionnaireAnswers,
  key: string,
  answer: QuestionnaireAnswerValue,
): QuestionnaireAnswers {
  const next = answers.filter((item) => item.key !== key);
  if (Array.isArray(answer) ? answer.length === 0 : !String(answer).trim()) {
    return next;
  }
  return [...next, { key, answer }];
}

export function answersToMap(answers: QuestionnaireAnswers): QuestionnaireAnswerMap {
  return Object.fromEntries(answers.map((item) => [item.key, item.answer]));
}
