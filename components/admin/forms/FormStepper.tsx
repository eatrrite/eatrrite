import { Check } from "lucide-react";
import { cn } from "cn";

export type FormStep = { label: string; done: boolean };

type FormStepperProps = {
  steps: FormStep[];
  current: number;
  /** A step is clickable when this returns true. */
  canOpen: (index: number) => boolean;
  onOpen: (index: number) => void;
};

// Numbered steps joined by a line that fills as steps are completed.
export function FormStepper({ steps, current, canOpen, onOpen }: FormStepperProps) {
  return (
    <ol className="flex items-center" aria-label="Form steps">
      {steps.map((step, index) => {
        const active = index === current;
        const open = canOpen(index);
        return (
          <li key={step.label} className={cn("flex items-center", index < steps.length - 1 && "flex-1")}>
            <button
              type="button"
              disabled={!open}
              aria-current={active ? "step" : undefined}
              onClick={() => onOpen(index)}
              className="group flex items-center gap-2 rounded-full text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed"
            >
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border text-xs font-semibold transition-colors",
                  active && "border-primary bg-primary text-primary-foreground",
                  !active && step.done && "border-accent-green/40 bg-accent-green/15 text-primary",
                  !active && !step.done && "border-border bg-card text-muted-foreground"
                )}
              >
                {step.done && !active ? <Check className="size-4" /> : index + 1}
              </span>
              <span className={cn("text-sm font-medium", active ? "text-foreground" : "hidden text-muted-foreground sm:inline")}>
                {step.label}
              </span>
            </button>
            {index < steps.length - 1 ? (
              <span aria-hidden className="mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-border">
                <span className={cn("block h-full rounded-full bg-primary transition-[width] duration-300", step.done ? "w-full" : "w-0")} />
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
