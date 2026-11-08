import { cn } from "cn";

// "Question N of M" with a teal bar and numbered dots, as in DESIGN.md.
export function QuestionProgress({
  index,
  total,
  label = "Question",
}: {
  index: number;
  total: number;
  label?: string;
}) {
  return (
    <div className="my-5" aria-live="polite">
      <div className="mb-2 flex justify-between text-sm text-text">
        <span>
          {label} {index + 1} of {total}
        </span>
        <span>{total - index - 1} remaining</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slot-line" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={index + 1}>
        <span className="block h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>
      <ol className="mt-3 flex flex-wrap gap-2">
        {Array.from({ length: total }, (_, i) => (
          <li
            key={i}
            className={cn(
              "grid size-7 place-items-center rounded-full text-xs font-semibold",
              i === index ? "bg-primary text-white" : i < index ? "bg-slot-hover text-primary" : "bg-slot-line text-muted-foreground"
            )}
          >
            {i + 1}
          </li>
        ))}
      </ol>
    </div>
  );
}
