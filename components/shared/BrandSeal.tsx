import { Leaf } from "lucide-react";
import { cn } from "cn";

// Round brand seal for the corner of Mukta's photo: beige disc, gold ring type, leaf centre.
const TAGLINE = "NUTRITION · HOLISTIC HEALTH · FITNESS · ";

export function BrandSeal({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-beige border border-accent/40 shadow-[0_12px_28px_-12px_rgba(1,78,78,0.35)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full animate-[spin_28s_linear_infinite] motion-reduce:animate-none p-0.5"
      >
        <defs>
          <path id="brand-seal-ring" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="var(--color-primary)"
          strokeOpacity="0.18"
          strokeWidth="0.8"
        />
        <text
          fill="var(--color-primary)"
          fillOpacity="0.72"
          fontSize="8.2"
          fontWeight="600"
          letterSpacing="1.1"
        >
          <textPath href="#brand-seal-ring" textLength="230" lengthAdjust="spacing">
            {TAGLINE}
          </textPath>
        </text>
      </svg>
      <span className="relative inline-flex size-[36%] items-center justify-center rounded-full bg-primary text-primary-dark shadow-sm">
        <Leaf className="size-1/2 text-white" strokeWidth={2.2} />
      </span>
    </span>
  );
}
