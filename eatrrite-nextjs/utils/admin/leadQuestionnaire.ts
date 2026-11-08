import { QUESTIONNAIRE_QUESTIONS } from "@/features/appointment/constants/questionnaire-questions";
import { isProfileQuestionKey } from "@/features/appointment/constants/profile-questions";
import type { Lead } from "@/types/admin/lead";
import type {
  QuestionnaireAnswers,
  QuestionnaireQuestion,
} from "@/features/appointment/types/questionnaire";
import { answerForKey, setAnswerForKey } from "@/utils/admin/questionnaireAnswers";

/** Questions the admin must fill (name/age/gender come from the lead). */
export function adminQuestionnaireQuestions(): QuestionnaireQuestion[] {
  return QUESTIONNAIRE_QUESTIONS.filter((q) => !isProfileQuestionKey(q.key));
}

/** Build name/age/gender answers from the selected lead. */
export function answersFromLead(lead: Lead): QuestionnaireAnswers {
  const answers: QuestionnaireAnswers = [
    { key: "name", answer: lead.name },
    { key: "age", answer: String(lead.age) },
  ];
  if (lead.gender) answers.push({ key: "gender", answer: lead.gender });
  return answers;
}

/** Replace name/age/gender on the questionnaire with the lead's values. */
export function applyLeadToQuestionnaire(
  answers: QuestionnaireAnswers,
  lead: Lead | undefined,
): QuestionnaireAnswers {
  if (!lead) return answers;
  let next = answers.filter((item) => !isProfileQuestionKey(item.key));
  for (const item of answersFromLead(lead)) {
    next = setAnswerForKey(next, item.key, item.answer);
  }
  return next;
}

/** True when every required admin question (plus lead profile) has an answer. */
export function isAdminQuestionnaireComplete(
  answers: QuestionnaireAnswers,
  lead: Lead | undefined,
): boolean {
  if (!lead?.name || !lead.age || !lead.gender) return false;
  for (const question of adminQuestionnaireQuestions()) {
    if (!question.required) continue;
    const answer = answerForKey(answers, question.key);
    if (Array.isArray(answer) ? answer.length === 0 : !String(answer ?? "").trim()) {
      return false;
    }
  }
  return true;
}

/** How many required admin questions have no answer yet. */
export function unansweredRequiredCount(answers: QuestionnaireAnswers): number {
  return adminQuestionnaireQuestions().filter((question) => {
    if (!question.required) return false;
    const answer = answerForKey(answers, question.key);
    return Array.isArray(answer) ? answer.length === 0 : !String(answer ?? "").trim();
  }).length;
}
