import { Appear } from "@/components/motion/Appear";
import { footerViewport, revealPresets, type RevealPreset } from "@/constants/motion";
import { cn } from "cn";

// revealOnEnter() from the PHP main.js (rise and fade, eased like GSAP power3.out).
// It animates this wrapper, so hover transforms on the child keep working.
// `immediate` runs on load instead of on scroll, as the PHP hero does.
const EASE = "cubic-bezier(0.215, 0.61, 0.355, 1)";

export function Reveal({
  children,
  className,
  preset = "default",
  y,
  duration,
  delay = 0,
  immediate = false,
}: {
  children: React.ReactNode;
  className?: string;
  preset?: RevealPreset;
  y?: number;
  duration?: number;
  delay?: number;
  immediate?: boolean;
}) {
  const p = revealPresets[preset];
  if (immediate) {
    return (
      <div
        className={cn("reveal-rise", className)}
        style={{ "--rise-y": `${y ?? p.y}px`, animationDuration: `${duration ?? p.duration}s`, animationDelay: `${delay}s` } as React.CSSProperties}
      >
        {children}
      </div>
    );
  }
  return (
    <Appear delay={delay} duration={duration ?? p.duration} y={y ?? p.y} ease={EASE} viewport={preset === "footer" ? footerViewport : undefined} className={className}>
      {children}
    </Appear>
  );
}
