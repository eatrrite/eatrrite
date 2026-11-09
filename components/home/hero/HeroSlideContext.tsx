"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

// About 2 seconds for the headline to write itself in, then 5 seconds fully on screen.
const DELAY_MS = 6000;

type HeroSlideState = { active: number; count: number; go: (step: number) => void };

const HeroSlideContext = createContext<HeroSlideState>({ active: 0, count: 1, go: () => {} });

// One clock for the hero: the background image and the headline change together. Moves on every
// 7 seconds; a slide picked by hand (arrows, swipe) restarts the wait.
export function HeroSlideProvider({ count, children }: { count: number; children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);

  const go = useCallback(
    (step: number) => {
      setActive((current) => (current + step + count) % count);
      setCycle((n) => n + 1);
    },
    [count],
  );

  useEffect(() => {
    if (count < 2) return;
    const timer = window.setTimeout(() => go(1), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, cycle, go, count]);

  return <HeroSlideContext.Provider value={{ active, count, go }}>{children}</HeroSlideContext.Provider>;
}

export const useHeroSlide = () => useContext(HeroSlideContext);
