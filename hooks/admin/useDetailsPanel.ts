"use client";

import { useCallback, useEffect, useRef } from "react";

// The details card beside a list. From lg up it sits beside the table and stays in view (sticky).
// Below lg it is under the table, so picking a row scrolls it into view.
export const DETAILS_PANEL_CLASS = "min-w-0 scroll-mt-4 self-start lg:sticky lg:top-4 lg:rounded-2xl";

const GAP = 16; // px between the panel and the edges of the scrolling area (top-4)
const DESKTOP = "(min-width: 1024px)";

// Two-way sticky, so the panel never needs a scrollbar of its own. A panel shorter than the
// screen just stays pinned at the top. A taller one moves with the page: scrolling down it stops
// once its bottom is in view, scrolling up once its top is, so every part can be read by
// scrolling the page. It works by moving the sticky `top` by each scroll step, kept between
// GAP (top edge pinned) and the value that pins the bottom edge.
function useTwoWaySticky(ref: React.RefObject<HTMLDivElement | null>) {
  const reset = useRef(() => {});

  useEffect(() => {
    const panel = ref.current;
    const scroller = panel?.closest("main");
    if (!panel || !scroller) return;
    const desktop = window.matchMedia(DESKTOP);
    let top = Number.POSITIVE_INFINITY;
    let lastScroll = scroller.scrollTop;

    const apply = () => {
      if (!desktop.matches) {
        panel.style.top = "";
        return;
      }
      // Sticky offsets start below the scroller's top padding. A pinned toolbar (StickyToolbar)
      // covers the top of the scroller, so the panel's highest place is GAP below it.
      const padTop = parseFloat(getComputedStyle(scroller).paddingTop) || 0;
      const bar = scroller.querySelector<HTMLElement>("[data-sticky-toolbar]");
      const highest = bar ? bar.offsetHeight + GAP - padTop : GAP;
      const lowest = Math.min(highest, scroller.clientHeight - padTop - panel.offsetHeight - GAP);
      top = Math.max(lowest, Math.min(highest, top));
      panel.style.top = `${top}px`;
    };
    const onScroll = () => {
      top -= scroller.scrollTop - lastScroll;
      lastScroll = scroller.scrollTop;
      apply();
    };
    reset.current = () => {
      top = Number.POSITIVE_INFINITY; // apply() brings it to the highest place
      apply();
    };

    const resized = new ResizeObserver(apply);
    resized.observe(panel);
    resized.observe(scroller);
    const toolbar = scroller.querySelector("[data-sticky-toolbar]");
    if (toolbar) resized.observe(toolbar); // filters wrapping to two rows make it taller
    scroller.addEventListener("scroll", onScroll, { passive: true });
    desktop.addEventListener("change", apply);
    apply();
    return () => {
      resized.disconnect();
      scroller.removeEventListener("scroll", onScroll);
      desktop.removeEventListener("change", apply);
    };
  }, [ref]);

  return reset;
}

export function useDetailsPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const resetSticky = useTwoWaySticky(ref);
  const reveal = useCallback(() => {
    // Desktop: show the new details from their header. Phones and tablets: scroll down to them.
    if (window.matchMedia(DESKTOP).matches) {
      resetSticky.current();
      return;
    }
    // Wait a frame so the new details have rendered before scrolling to them.
    requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, [resetSticky]);
  return { ref, reveal };
}
