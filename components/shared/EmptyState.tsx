import Image from "next/image";
import { cn } from "cn";

// The illustrations in public/images/empty-states/, one per kind of empty or failed view.
export const EMPTY_STATE_IMAGES = {
  appointments: "/images/empty-states/appointments.png",
  leads: "/images/empty-states/leads.png",
  todos: "/images/empty-states/todos.png",
  today: "/images/empty-states/today.png",
  chart: "/images/empty-states/chart.png",
  search: "/images/empty-states/search.png",
  questionnaire: "/images/empty-states/questionnaire.png",
  slots: "/images/empty-states/slots.png",
  error: "/images/empty-states/error.png",
} as const;

export type EmptyStateImage = keyof typeof EMPTY_STATE_IMAGES;

type EmptyStateProps = {
  image: EmptyStateImage;
  title: string;
  description?: string;
  /** A button or link that gets the user going, such as "Add lead". */
  action?: React.ReactNode;
  /** "sm" for small cards and dialogs, "md" for tables and pages. */
  size?: "sm" | "md";
  className?: string;
};

// One look for every empty or failed view: illustration, short title, one line of help, optional action.
export function EmptyState({ image, title, description, action, size = "md", className }: EmptyStateProps) {
  return (
    <div role="status" className={cn("flex flex-col items-center justify-center text-center", size === "sm" ? "gap-2 py-6" : "gap-3 py-10", className)}>
      <Image src={EMPTY_STATE_IMAGES[image]} alt="" width={320} height={320} className={cn("h-auto", size === "sm" ? "w-24" : "w-32 sm:w-36")} />
      <p className="m-0 font-heading text-base font-bold text-foreground">{title}</p>
      {description ? <p className="m-0 max-w-xs text-sm text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}
