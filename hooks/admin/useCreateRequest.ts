"use client";

import { useEffect, useEffectEvent } from "react";

// Lets an "Add …" button in the page header open the form that a list component owns, without
// lifting the form's state up to the page. The button sends a request; the list listens for it.
export type CreateKind = "lead" | "appointment";

const requests = new EventTarget();

export function requestCreate(kind: CreateKind) {
  requests.dispatchEvent(new Event(kind));
}

/** Runs `onCreate` each time an Add button for `kind` is pressed. */
export function useCreateRequest(kind: CreateKind, onCreate: () => void) {
  const handle = useEffectEvent(onCreate);
  useEffect(() => {
    const listener = () => handle();
    requests.addEventListener(kind, listener);
    return () => requests.removeEventListener(kind, listener);
  }, [kind]);
}
