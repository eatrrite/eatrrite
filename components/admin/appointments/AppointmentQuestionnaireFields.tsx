"use client";

import { AppointmentLeadSummary } from "@/components/admin/appointments/AppointmentLeadSummary";
import { ChoiceChips } from "@/components/admin/forms/ChoiceChips";
import { QuestionLabel } from "@/components/admin/forms/QuestionLabel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Lead } from "@/types/admin/lead";
import type { QuestionnaireAnswers, QuestionnaireQuestion } from "@/features/appointment/types/questionnaire";
import { adminQuestionnaireQuestions } from "@/utils/admin/leadQuestionnaire";
import {
  answerForKey,
  setAnswerForKey,
} from "@/utils/admin/questionnaireAnswers";

type AppointmentQuestionnaireFieldsProps = {
  lead: Lead | undefined;
  value: QuestionnaireAnswers;
  onChange: (next: QuestionnaireAnswers) => void;
  /** The questionnaire, from er_questions. */
  questions: QuestionnaireQuestion[];
  /** Number of the first question. The public form numbers its own questions before these. */
  firstNumber?: number;
};

// Short radio lists read better as tap options; long ones stay in a dropdown.
const MAX_CHIP_OPTIONS = 3;

export function AppointmentQuestionnaireFields({
  lead,
  value,
  onChange,
  questions,
  firstNumber = 1,
}: AppointmentQuestionnaireFieldsProps) {
  return (
    <div className="space-y-5">
      <AppointmentLeadSummary lead={lead} />

      {adminQuestionnaireQuestions(questions).map((question, index) => {
        const label = (htmlFor?: string) => (
          <QuestionLabel number={firstNumber + index} text={question.label} required={question.required} htmlFor={htmlFor} />
        );
        const answer = answerForKey(value, question.key);
        const text = typeof answer === "string" ? answer : "";
        const list = Array.isArray(answer) ? answer : typeof answer === "string" && answer ? [answer] : [];
        const set = (next: string | string[]) => onChange(setAnswerForKey(value, question.key, next));

        if (question.type === "radio" && question.options) {
          if (question.options.length <= MAX_CHIP_OPTIONS) {
            return (
              <div key={question.key} className="space-y-2">
                {label()}
                <ChoiceChips options={question.options} value={list} onChange={([next]) => set(next)} />
              </div>
            );
          }
          return (
            <div key={question.key} className="space-y-2">
              {label()}
              <Select
                value={text || null}
                onValueChange={(next) => {
                  if (next) set(next);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an answer">{text || "Select an answer"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {question.options.map((option) => (
                    <SelectItem key={option} value={option} className="whitespace-normal">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }

        if (question.type === "checkbox" && question.options) {
          return (
            <div key={question.key} className="space-y-2">
              {label()}
              <p className="m-0 text-xs text-muted-foreground">Select all that apply.</p>
              <ChoiceChips multiple options={question.options} value={list} onChange={set} />
            </div>
          );
        }

        if (question.type === "checkbox-groups" && question.groups) {
          return (
            <div key={question.key} className="space-y-3">
              <div className="space-y-1">
                {label()}
                <p className="m-0 text-xs text-muted-foreground">Select all that apply.</p>
              </div>
              {Object.entries(question.groups).map(([group, options]) => (
                <div key={group} className="space-y-1.5">
                  <p className="m-0 text-xs font-semibold tracking-wide text-primary uppercase">{group}</p>
                  <ChoiceChips multiple options={options} value={list} onChange={(next) => set(mergeGroup(list, options, next))} />
                </div>
              ))}
            </div>
          );
        }

        if (question.type === "number") {
          return (
            <div key={question.key} className="space-y-2">
              {label(`q-${question.key}`)}
              <Input id={`q-${question.key}`} type="number" min={question.min} max={question.max} value={text} onChange={(e) => set(e.target.value)} />
            </div>
          );
        }

        if (question.type === "textarea") {
          return (
            <div key={question.key} className="space-y-2">
              {label(`q-${question.key}`)}
              <Textarea id={`q-${question.key}`} rows={3} value={text} onChange={(e) => set(e.target.value)} />
            </div>
          );
        }

        return (
          <div key={question.key} className="space-y-2">
            {label(`q-${question.key}`)}
            <Input id={`q-${question.key}`} value={text} onChange={(e) => set(e.target.value)} />
          </div>
        );
      })}
    </div>
  );
}

// One group's chips report only their own selection; keep the other groups' picks.
function mergeGroup(all: string[], groupOptions: string[], groupSelected: string[]) {
  return [...all.filter((item) => !groupOptions.includes(item)), ...groupSelected];
}
