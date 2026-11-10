"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type HTMLAttributes } from "react";
import { revealViewport } from "@/constants/motion";
import { cn } from "cn";

// The site's scroll reveal, without an animation library: the element starts faded (and a little
// low, and optionally blurred), and when it enters the screen (past the trigger margin in
// constants/motion.ts) it eases to rest, once. Plain CSS transitions, one shared
// IntersectionObserver per margin, so a page of reveals costs almost no JavaScript. The server
// renders the starting look, as the animation library did. With "reduce motion" on, the .appear
// rule in globals.css shows it at once.

type Margin = string;
const observers = new Map<Margin, { io: IntersectionObserver; callbacks: Map<Element, () => void> }>();

function watch(element: Element, margin: Margin, onEnter: () => void) {
  let entry = observers.get(margin);
  if (!entry) {
    const callbacks = new Map<Element, () => void>();
    const io = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (!record.isIntersecting) continue;
          callbacks.get(record.target)?.();
          callbacks.delete(record.target);
          io.unobserve(record.target);
        }
      },
      { rootMargin: margin, threshold: 0 },
    );
    entry = { io, callbacks };
    observers.set(margin, entry);
  }
  entry.callbacks.set(element, onEnter);
  entry.io.observe(element);
  return () => {
    entry.callbacks.delete(element);
    entry.io.unobserve(element);
  };
}

export type AppearProps = Omit<HTMLAttributes<HTMLElement>, "style"> & {
  as?: ElementType;
  delay?: number;
  duration?: number;
  /** Seconds-based easing curve as a CSS timing function. */
  ease?: string;
  /** Pixels the element rises from. */
  y?: number;
  /** Starting blur in pixels (0: no blur). */
  blur?: number;
  /** Trigger margin: `viewport={{ margin }}`; defaults to the site's. */
  viewport?: { margin?: string };
};

export function Appear({
  as: Tag = "div",
  delay = 0,
  duration = 0.7,
  ease = "cubic-bezier(0.22, 1, 0.36, 1)",
  y = 24,
  blur = 0,
  viewport,
  className,
  children,
  ...rest
}: AppearProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const margin = viewport?.margin ?? revealViewport.margin;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return watch(element, margin, () => setShown(true));
  }, [margin]);

  const style: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : `translateY(${y}px)`,
    filter: blur ? (shown ? "blur(0px)" : `blur(${blur}px)`) : undefined,
    transition: `opacity ${duration}s ${ease} ${delay}s, transform ${duration}s ${ease} ${delay}s${blur ? `, filter ${duration}s ${ease} ${delay}s` : ""}`,
  };

  return (
    <Tag ref={ref} className={cn("appear", className)} style={style} {...rest}>
      {children}
    </Tag>
  );
}
