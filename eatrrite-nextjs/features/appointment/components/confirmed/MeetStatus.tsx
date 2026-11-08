"use client";

import { useEffect, useState } from "react";
import questionnaire from "@/features/appointment/constants/questionnaire.json";
import { requestMeetLink } from "@/features/appointment/services/bookingApi";

type MeetState = { link: string; error: string };

// "We have received your response" panel. Asks the server for the Meet link
// once, unless the page already has it.
export function MeetStatus({ appointmentId, initialLink }: { appointmentId: string; initialLink: string | null }) {
  const [state, setState] = useState<MeetState>({ link: initialLink ?? "", error: "" });

  useEffect(() => {
    if (initialLink) return;
    requestMeetLink(appointmentId).then((result) => {
      if (!result.ok) return setState({ link: "", error: result.error });
      if (result.meetLink) return setState({ link: result.meetLink, error: "" });
      setState({ link: "", error: "Your Meet link is still being created. Refresh this page in a minute." });
    });
  }, [appointmentId, initialLink]);

  const pending = !state.link && !state.error;
  return (
    <div className="text-center">
      <div aria-hidden className="mx-auto mb-3 grid size-14 place-items-center rounded-full bg-primary text-2xl text-white">✓</div>
      <h2 className="mb-2 text-2xl text-primary">{questionnaire.received}</h2>
      <p className="text-text">{questionnaire.closing[0]}</p>
      {pending ? (
        <p className="inline-flex items-center gap-3 rounded-xs bg-white px-4 py-2.5 text-sm text-text">
          <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-primary/18 border-t-primary" />
          {questionnaire.generating}
        </p>
      ) : null}
      {state.link ? (
        <a href={state.link} target="_blank" rel="noopener noreferrer" className="inline-block rounded-xs bg-white px-4 py-2.5 font-semibold break-all text-primary">
          {state.link}
        </a>
      ) : null}
      {state.error ? <p role="alert" className="m-0 rounded-xs bg-alert-bg px-4 py-2.5 text-sm text-alert-text">{state.error}</p> : null}
    </div>
  );
}
