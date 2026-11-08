import { env } from "@/config/env";

export type MeetRequest = {
  name: string;
  service: string;
  phone: string;
  paymentId: string;
  startIso: string;
  endIso: string;
};

// Calls the existing Google Apps Script deployment, with the same payload as
// appointment-form/src/GoogleAppsScriptClient.php. Returns the Meet link.
export async function createMeetLink(request: MeetRequest): Promise<string> {
  const response = await fetch(env.appsScriptUrl(), {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    redirect: "follow",
    body: JSON.stringify({
      action: "create_meet",
      secret: env.appsScriptSecret(),
      name: request.name,
      service: request.service,
      phone: request.phone,
      payment_id: request.paymentId,
      start_iso: request.startIso,
      end_iso: request.endIso,
    }),
  });
  const data = await response.json();
  if (!data?.ok || !data?.meet_link) throw new Error(data?.error ?? "Meet link was not returned");
  return String(data.meet_link);
}
