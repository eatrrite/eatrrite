"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Lead } from "@/types/admin/lead";
import type { QuestionnaireAnswers } from "@/types/appointment/questionnaire";
import {
  adminQuestionnaireQuestions,
} from "@/utils/admin/leadQuestionnaire";
import {
  answerForKey,
  setAnswerForKey,
} from "@/utils/admin/questionnaireAnswers";

type AppointmentQuestionnaireFieldsProps = {
  lead: Lead | undefined;
  value: QuestionnaireAnswers;
  onChange: (next: QuestionnaireAnswers) => void;
};

export function AppointmentQuestionnaireFields({
  lead,
  value,
  onChange,
}: AppointmentQuestionnaireFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-muted/50 px-3.5 py-3 text-sm">
        <p className="mb-1 text-xs font-medium text-muted-foreground">
          From lead (same as booking name on the website)
        </p>
        {lead ? (
          <p className="text-foreground">
            {lead.name} · {lead.age} years · {lead.gender}
          </p>
        ) : (
          <p className="text-muted-foreground">Select a lead on the previous step.</p>
        )}
      </div>

      <div className="max-h-72 space-y-3 overflow-y-auto rounded-xl border border-border p-3">
        {adminQuestionnaireQuestions().map((question) => {
          const answer = answerForKey(value, question.key);
          const set = (next: string | string[]) =>
            onChange(setAnswerForKey(value, question.key, next));

          if (question.type === "radio" && question.options) {
            return (
              <div key={question.key} className="space-y-2">
                <Label>{question.label}</Label>
                <Select
                  value={typeof answer === "string" ? answer : null}
                  onValueChange={(v) => {
                    if (v) set(v);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an answer">
                      {typeof answer === "string" ? answer : "Select an answer"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {question.options.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className="whitespace-normal"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }

          if (question.type === "number") {
            return (
              <div key={question.key} className="space-y-2">
                <Label htmlFor={`q-${question.key}`}>{question.label}</Label>
                <Input
                  id={`q-${question.key}`}
                  type="number"
                  min={question.min}
                  max={question.max}
                  value={typeof answer === "string" ? answer : ""}
                  onChange={(e) => set(e.target.value)}
                />
              </div>
            );
          }

          if (
            question.type === "checkbox" ||
            question.type === "checkbox-groups"
          ) {
            const selected = Array.isArray(answer) ? answer : [];
            return (
              <div key={question.key} className="space-y-2">
                <Label>{question.label}</Label>
                <Textarea
                  value={selected.join(", ")}
                  placeholder="Comma-separated answers"
                  onChange={(e) => {
                    set(
                      e.target.value
                        .split(",")
                        .map((part) => part.trim())
                        .filter(Boolean),
                    );
                  }}
                />
              </div>
            );
          }

          return (
            <div key={question.key} className="space-y-2">
              <Label htmlFor={`q-${question.key}`}>{question.label}</Label>
              <Input
                id={`q-${question.key}`}
                value={typeof answer === "string" ? answer : ""}
                onChange={(e) => set(e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
