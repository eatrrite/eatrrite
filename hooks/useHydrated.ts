"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// False while the page hydrates, true after. Data saved in the browser (the persisted store)
// is only the real data once this is true, so do not act on "not found" before then.
export const useHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
