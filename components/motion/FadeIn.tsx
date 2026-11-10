import type { HTMLAttributes, ReactNode } from "react";
import { Appear } from "@/components/motion/Appear";
import { cn } from "cn";

type FadeInProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
};

// Trigger point: revealViewport in constants/motion.ts (same as BlurIn and Reveal).
export function FadeIn({ children, className, delay = 0, duration = 0.65, y = 32, ...props }: FadeInProps) {
  return (
    <Appear delay={delay} duration={duration} y={y} className={className} {...props}>
      {children}
    </Appear>
  );
}

// Page-load entrance (rise, fade, clear the blur) in plain CSS (.hero-rise in globals.css), so it
// runs as soon as the page is painted, with no script needed. `key` on it replays it.
export function HeroMotion({
  children,
  className,
  delay = 0,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <div
      className={cn("hero-rise", className)}
      style={{ "--rise-y": `${y}px`, animationDelay: `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
