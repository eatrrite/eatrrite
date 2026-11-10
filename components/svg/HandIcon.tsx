import { cn } from "cn";

// Shared frame for the hand-drawn icons in this folder: a 48×48 drawing in round, slightly uneven
// ink lines (currentColor, the site's teal), with fills in the brand gold and, where the subject
// calls for it, a warm red. Decorative: the card's text says what it is.
export const GOLD = "var(--color-accent)";
export const RED = "#d45a3f";

export type IconProps = { className?: string };

export function HandIcon({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={cn("shrink-0", className)}
    >
      {children}
    </svg>
  );
}
