"use client";

import { useEffect, useState } from "react";
import { fetchSlotTimes } from "@/features/appointment/services/bookingApi";

type SlotState = { date: string; times: string[] | null };

// Loads open times for the selected date. `times` is null when loading failed.
export function useSlotTimes(date: string | null) {
  const [state, setState] = useState<SlotState>({ date: "", times: [] });

  useEffect(() => {
    if (!date) return;
    let current = true;
    fetchSlotTimes(date).then((times) => current && setState({ date, times }));
    return () => {
      current = false;
    };
  }, [date]);

  const loading = Boolean(date) && state.date !== date;
  return { loading, times: loading ? [] : state.times };
}
