import Link from "next/link";
import { ROUTES } from "@/constants/routes";

type ConsentCheckboxProps = { id: string; checked: boolean; onChange: (checked: boolean) => void };

// The consent tick box for every form: never pre-ticked, with a link to the Privacy Policy
// (brief §5.1, §8.3).
export function ConsentCheckbox({ id, checked, onChange }: ConsentCheckboxProps) {
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 size-5 shrink-0 accent-primary"
      />
      <label htmlFor={id} className="text-sm leading-relaxed text-text">
        I agree that Eat Rrite may use my details to arrange my consultation, as explained in the{" "}
        <Link href={ROUTES.privacy} target="_blank" className="font-semibold text-primary underline underline-offset-2">Privacy Policy</Link>.
      </label>
    </div>
  );
}
