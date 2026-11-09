"use client";

import { useCallback, useRef } from "react";

// The details card beside a list. From lg up it sits beside the table and stays in view (sticky,
// see DETAILS_PANEL_CLASS). Below lg it is under the table, so picking a row scrolls it into view.
export const DETAILS_PANEL_CLASS =
  "min-w-0 scroll-mt-4 self-start lg:sticky lg:top-4 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:rounded-2xl";

export function useDetailsPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useCallback(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    // Wait a frame so the new details have rendered before scrolling to them.
    requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, []);
  return { ref, reveal };
}
