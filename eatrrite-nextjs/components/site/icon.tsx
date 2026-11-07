import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { cn } from "cn";

// Draws Font Awesome 6.5.2 glyphs, the same version the PHP site loads, as
// inline SVG. Size it with a text-* class, as with the PHP <i> icons.
export function Icon({ icon, className }: { icon: IconDefinition; className?: string }) {
  const [width, height, , , path] = icon.icon;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      className={cn("inline-block h-[1em] w-auto shrink-0 align-[-0.125em]", className)}
    >
      {(Array.isArray(path) ? path : [path]).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
