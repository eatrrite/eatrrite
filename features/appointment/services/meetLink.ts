import "server-only";
import { env } from "@/config/env";
import { generateAdminMeetLink } from "@/utils/admin/generateMeetLink";

/** `appointmentId` makes the calendar event id, so one appointment never gets two events. */
export type MeetRequest = { appointmentId: string; name: string; service: string; date: string; time: string; minutes: number };

const istIso = (date: string, time: string) => `${date}T${time}:00+05:30`;
const endTime = (date: string, time: string, minutes: number) =>
  new Date(new Date(istIso(date, time)).getTime() + minutes * 60_000).toISOString();

// Creates the Google Meet link through the Apps Script in apps-script/Code.gs (action
// create_meet). The caller saves the link on the same appointment row. Without APPS_SCRIPT_URL
// and APPS_SCRIPT_SECRET (local development) it returns a placeholder link.
export async function createMeetLink(request: MeetRequest): Promise<string> {
  const url = env.appsScriptUrl();
  const secret = env.appsScriptSecret();
  if (!url || !secret) return generateAdminMeetLink();

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    redirect: "follow",
    signal: AbortSignal.timeout(30_000),
    body: JSON.stringify({
      action: "create_meet",
      secret,
      appointment_id: request.appointmentId,
      name: request.name,
      service: request.service,
      start_iso: istIso(request.date, request.time),
      end_iso: endTime(request.date, request.time, request.minutes),
    }),
  });
  const result = (await response.json().catch(() => null)) as { ok?: boolean; meet_link?: string; error?: string } | null;
  if (!result?.ok || !result.meet_link) throw new Error(result?.error ?? "The Google Meet link was not returned.");
  return result.meet_link;
}
