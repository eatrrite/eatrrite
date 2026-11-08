"use client";

import { useEffect, useState } from "react";
import { fetchAvailability } from "@/features/appointment/services/bookingApi";

type Availability = { days: Record<string, string[]>; loading: boolean; error: string };

// Open times from the server, loaded each time the slot picker opens, so a slot booked a
// moment ago is already gone.
export function useAvailability(open: boolean): Availability {
  const [state, setState] = useState<Availability>({ days: {}, loading: true, error: "" });

  useEffect(() => {
    if (!open) return;
    let current = true;
    fetchAvailability().then((result) => {
      if (!current) return;
      setState(result.ok ? { days: result.days, loading: false, error: "" } : { days: {}, loading: false, error: result.error });
    });
    return () => {
      current = false;
    };
  }, [open]);

  return state;
}
