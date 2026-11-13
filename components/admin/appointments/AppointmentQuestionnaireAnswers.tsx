"use client";

import { useAdminStore } from "@/stores/useAdminStore";
import type { Appointment } from "@/types/admin/appointment";
import { answerForKey } from "@/utils/admin/questionnaireAnswers";

function formatAnswer(value: string | string[]) {
  return Array.isArray(value) ? value.join(", ") : value;
}

// The lead's answers in the details card, numbered 1, 2, 3 … in question order. The question is a
// small teal label and the answer sits under it in body text, so the eye can run down either one.
export function AppointmentQuestionnaireAnswers({ appointment }: { appointment: Appointment }) {
  const questions = useAdminStore((s) => s.questions);
  const answered = questions.flatMap((question) => {
    const answer = answerForKey(appointment.questionnaire, question.key);
    if (!answer || answer.length === 0) return [];
    return [{ key: question.key, label: question.label, answer: formatAnswer(answer) }];
  });

  return (
    <ol className="divide-y divide-border/70">
      {answered.map((item, index) => (
        <li key={item.key} className="flex gap-3 py-3 first:pt-1 last:pb-0">
          <span
            aria-hidden
            className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary tabular-nums"
          >
            {index + 1}
          </span>
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-xs leading-snug font-semibold text-primary">{item.label}</p>
            <p className="text-sm leading-snug text-foreground">{item.answer}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
