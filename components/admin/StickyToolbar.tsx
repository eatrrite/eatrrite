"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "cn";

// Keeps a list's search and filters in view while the list scrolls, so what is searched or
// filtered stays visible. It pins to the top edge of the admin's scrolling <main> (-top-6 cancels
// main's py-6) and runs edge to edge (the negative margins cancel main's side padding). The
// frosted background shows only once it is pinned, so the page looks unchanged before scrolling.
// useDetailsPanel reads data-sticky-toolbar to keep the details card below it.
export function StickyToolbar({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const bar = ref.current;
    const scroller = bar?.closest("main");
    if (!bar || !scroller) return;
    const check = () => setStuck(bar.getBoundingClientRect().top <= scroller.getBoundingClientRect().top + 1);
    check();
    scroller.addEventListener("scroll", check, { passive: true });
    return () => scroller.removeEventListener("scroll", check);
  }, []);

  return (
    <div
      ref={ref}
      data-sticky-toolbar=""
      className={cn(
        "sticky -top-6 z-20 -mx-4 -mt-3 border-b px-4 pt-3 pb-2 transition-[background-color,border-color,box-shadow] duration-200 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8",
        stuck
          ? "border-border/70 bg-background/85 shadow-[0_10px_24px_-20px_rgba(1,54,54,0.45)] backdrop-blur-md"
          : "border-transparent",
      )}
    >
      {children}
    </div>
  );
}
