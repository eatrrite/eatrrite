"use client";

import { AppointmentLeadSummary } from "@/components/admin/appointments/AppointmentLeadSummary";
import { ChoiceChips } from "@/components/admin/forms/ChoiceChips";
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
import type {
  QuestionnaireAnswers,
  QuestionnaireQuestion,
} from "@/features/appointment/types/questionnaire";
import { adminQuestionnaireQuestions } from "@/utils/admin/leadQuestionnaire";
import {
  answerForKey,
  setAnswerForKey,
} from "@/utils/admin/questionnaireAnswers";

type AppointmentQuestionnaireFieldsProps = {
  lead: Lead | undefined;
  value: QuestionnaireAnswers;
  onChange: (next: QuestionnaireAnswers) => void;
};

// Short radio lists read better as tap options; long ones stay in a dropdown.
const MAX_CHIP_OPTIONS = 3;

function QuestionLabel({ question, htmlFor }: { question: QuestionnaireQuestion; htmlFor?: string }) {
  return (
    <Label htmlFor={htmlFor} className="leading-snug">
      {question.label}
      {question.required ? <span aria-hidden className="ml-1 text-alert-text">*</span> : null}
    </Label>
  );
}

export function AppointmentQuestionnaireFields({
  lead,
  value,
  onChange,
}: AppointmentQuestionnaireFieldsProps) {
  return (
    <div className="space-y-5">
      <AppointmentLeadSummary lead={lead} />

      {adminQuestionnaireQuestions().map((question) => {
        const answer = answerForKey(value, question.key);
        const text = typeof answer === "string" ? answer : "";
        const list = Array.isArray(answer) ? answer : typeof answer === "string" && answer ? [answer] : [];
        const set = (next: string | string[]) => onChange(setAnswerForKey(value, question.key, next));

        if (question.type === "radio" && question.options) {
          if (question.options.length <= MAX_CHIP_OPTIONS) {
            return (
              <div key={question.key} className="space-y-2">
                <QuestionLabel question={question} />
                <ChoiceChips options={question.options} value={list} onChange={([next]) => set(next)} />
              </div>
            );
          }
          return (
            <div key={question.key} className="space-y-2">
              <QuestionLabel question={question} />
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
              <QuestionLabel question={question} />
              <p className="m-0 text-xs text-muted-foreground">Select all that apply.</p>
              <ChoiceChips multiple options={question.options} value={list} onChange={set} />
            </div>
          );
        }

        if (question.type === "checkbox-groups" && question.groups) {
          return (
            <div key={question.key} className="space-y-3">
              <div className="space-y-1">
                <QuestionLabel question={question} />
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
              <QuestionLabel question={question} htmlFor={`q-${question.key}`} />
              <Input id={`q-${question.key}`} type="number" min={question.min} max={question.max} value={text} onChange={(e) => set(e.target.value)} />
            </div>
          );
        }

        if (question.type === "textarea") {
          return (
            <div key={question.key} className="space-y-2">
              <QuestionLabel question={question} htmlFor={`q-${question.key}`} />
              <Textarea id={`q-${question.key}`} rows={3} value={text} onChange={(e) => set(e.target.value)} />
            </div>
          );
        }

        return (
          <div key={question.key} className="space-y-2">
            <QuestionLabel question={question} htmlFor={`q-${question.key}`} />
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
