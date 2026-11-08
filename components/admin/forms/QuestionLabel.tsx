import { Label } from "@/components/ui/label";

// A numbered question: larger than a plain field label so the questions stand out.
export function QuestionLabel({ number, text, required, htmlFor }: { number: number; text: string; required?: boolean; htmlFor?: string }) {
  return (
    <Label htmlFor={htmlFor} className="flex items-baseline gap-2 font-heading text-base leading-snug font-bold text-ink">
      <span className="text-primary tabular-nums">{number}.</span>
      <span>
        {text}
        {required ? <span aria-hidden className="ml-1 text-alert-text">*</span> : null}
      </span>
    </Label>
  );
}
