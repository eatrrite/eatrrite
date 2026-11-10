import { Check } from "lucide-react";
import { cn } from "cn";

type ChoiceChipsProps = {
  options: readonly string[];
  /** Selected options. A single choice is a one-item list. */
  value: string[];
  multiple?: boolean;
  onChange: (next: string[]) => void;
  labelFor?: (option: string) => string;
  className?: string;
};

// Tap-to-select options. Radio behaviour for one answer, checkbox for many.
export function ChoiceChips({ options, value, multiple = false, onChange, labelFor, className }: ChoiceChipsProps) {
  const toggle = (option: string) => {
    if (!multiple) return onChange([option]);
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);
  };

  return (
    <div role={multiple ? "group" : "radiogroup"} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const selected = value.includes(option);
        return (
          <button
            key={option}
            type="button"
            role={multiple ? "checkbox" : "radio"}
            aria-checked={selected}
            onClick={() => toggle(option)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-left text-sm leading-snug transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/30",
              selected ? "border-primary bg-primary/5 font-medium text-primary" : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-beige"
            )}
          >
            {selected ? <Check className="size-3.5 shrink-0" /> : null}
            {labelFor ? labelFor(option) : option}
          </button>
        );
      })}
    </div>
  );
}
