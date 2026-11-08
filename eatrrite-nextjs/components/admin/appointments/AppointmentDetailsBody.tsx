"use client";

import { CalendarDays, Clock3, Link2, Salad } from "lucide-react";
import { format, parseISO } from "date-fns";
import { AppointmentStatusBadge } from "@/components/admin/appointments/AppointmentStatusBadge";
import { QUESTIONNAIRE_QUESTIONS } from "@/constants/appointment/questionnaire-questions";
import type { ClinicAppointment } from "@/types/admin/appointment";
import { answerForKey } from "@/utils/admin/questionnaireAnswers";

type AppointmentDetailsBodyProps = {
  appointment: ClinicAppointment;
  leadName: string;
};

function formatStamp(iso: string) {
  return format(parseISO(iso), "MMM d, yyyy");
}

function formatAnswer(value: string | string[] | undefined) {
  if (!value) return "—";
  return Array.isArray(value) ? value.join(", ") : value;
}

export function AppointmentDetailsBody({
  appointment,
  leadName,
}: AppointmentDetailsBodyProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CalendarDays className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-heading text-lg font-bold text-foreground">
                {leadName}
              </p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground">
                <span>{appointment.date}</span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="size-3.5" />
                  {appointment.time}
                </span>
              </p>
            </div>
            <AppointmentStatusBadge status={appointment.status} />
          </div>
        </div>
      </div>

      <div className="space-y-3 rounded-xl bg-muted/50 px-3.5 py-3">
        <div>
          <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Salad className="size-3.5" />
            Service
          </p>
          <p
            className={`text-sm leading-snug ${appointment.service ? "text-foreground" : "text-muted-foreground"}`}
          >
            {appointment.service || "No service added"}
          </p>
        </div>
        <div className="border-t border-border/70 pt-3">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Link2 className="size-3.5" />
            Google Meet
          </p>
          {appointment.meetLink ? (
            <a
              href={appointment.meetLink}
              target="_blank"
              rel="noreferrer"
              className="break-all text-sm text-primary underline-offset-2 hover:underline"
            >
              {appointment.meetLink}
            </a>
          ) : (
            <p className="text-sm text-muted-foreground">No Meet link yet</p>
          )}
        </div>
        <div className="border-t border-border/70 pt-3">
          <p className="mb-1 text-xs font-medium text-muted-foreground">Notes</p>
          <p
            className={`text-sm leading-snug ${appointment.notes ? "text-foreground" : "text-muted-foreground"}`}
          >
            {appointment.notes ?? "No notes added"}
          </p>
        </div>
      </div>

      <div className="space-y-2 rounded-xl border border-border px-3.5 py-3">
        <p className="text-xs font-medium text-muted-foreground">Questionnaire</p>
        {appointment.questionnaire.length === 0 ? (
          <p className="text-sm text-muted-foreground">No answers yet</p>
        ) : (
          <ul className="space-y-2">
            {QUESTIONNAIRE_QUESTIONS.map((question) => {
              const answer = answerForKey(appointment.questionnaire, question.key);
              if (!answer) return null;
              return (
                <li key={question.key} className="text-sm">
                  <p className="text-muted-foreground">{question.label}</p>
                  <p className="text-foreground">{formatAnswer(answer)}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Added {formatStamp(appointment.createdAt)} · Updated{" "}
        {formatStamp(appointment.updatedAt)}
      </p>
    </div>
  );
}
