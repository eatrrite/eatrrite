import { cn } from "cn";
import type { FloatingFoodItem } from "@/constants/home/floatingFood";
import { FloatingFood } from "@/components/shared/section/FloatingFood";

// One home section in the reference design pattern: alternating background,
// bottom border, faint floating images behind the content.
export function PageSection({
  id,
  tone,
  food,
  defer = false,
  className,
  children,
}: {
  id?: string;
  tone: "white" | "beige";
  food: FloatingFoodItem[];
  /**
   * A section well below the first screen: the browser skips drawing it (and loading its images)
   * until it is about to scroll into view. Not for sections with a sticky or scroll-driven part.
   */
  defer?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        // Keep overflow visible so sticky children (e.g. program rail) can pin.
        // FloatingFood clips itself in its own absolute layer.
        "relative border-b border-border py-20",
        tone === "white" ? "bg-white" : "bg-beige",
        defer && "defer-section",
        className
      )}
    >
      <FloatingFood items={food} />
      <div className="er-container relative z-10">{children}</div>
    </section>
  );
}
