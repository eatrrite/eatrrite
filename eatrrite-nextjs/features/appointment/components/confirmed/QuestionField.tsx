"use client";

import { cn } from "cn";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { QuestionnaireQuestion } from "@/features/appointment/types/questionnaire";

type Value = string | string[];

const choice = (active: boolean) =>
  cn(
    "flex w-full cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
    active ? "border-primary bg-slot-hover text-primary" : "border-border bg-white text-ink hover:border-primary"
  );

function toggle(list: string[], option: string) {
  return list.includes(option) ? list.filter((o) => o !== option) : [...list, option];
}

function Options({ options, value, multi, onChange }: { options: string[]; value: Value; multi: boolean; onChange: (v: Value) => void }) {
  const list = Array.isArray(value) ? value : [];
  return (
    <div className="grid gap-2">
      {options.map((option) => {
        const active = multi ? list.includes(option) : value === option;
        return (
          <button key={option} type="button" aria-pressed={active} className={choice(active)} onClick={() => onChange(multi ? toggle(list, option) : option)}>
            {option}
          </button>
        );
      })}
    </div>
  );
}

// Renders one question in the style of the PHP .er-q-choice tap targets.
export function QuestionField({ step, value, onChange }: { step: QuestionnaireQuestion; value: Value; onChange: (v: Value) => void }) {
  if (step.type === "text" || step.type === "number") {
    return <Input type={step.type} min={step.min} max={step.max} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} aria-label={step.label} />;
  }
  if (step.type === "radio") return <Options options={step.options ?? []} value={value} multi={false} onChange={onChange} />;
  if (step.type === "checkbox") return <Options options={step.options ?? []} value={value} multi onChange={onChange} />;
  return (
    <div className="grid gap-4">
      {Object.entries(step.groups ?? {}).map(([group, options]) => (
        <div key={group}>
          <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{group}</p>
          <Options options={options} value={value} multi onChange={onChange} />
        </div>
      ))}
    </div>
  );
}

// Optional text answer under a checklist ("What has been missing until now?").
export function FollowUpField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="mt-4 grid gap-2">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <Textarea className="min-h-24" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
