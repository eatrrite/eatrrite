"use server";

import { getBookingSettings } from "@/features/appointment/services/bookingConfig";
import { createMeetLink } from "@/features/appointment/services/meetLink";
import { isValidDate } from "@/features/appointment/utils/istTime";
import { assertAdmin } from "@/features/auth/services/session";
import { attempt, type ActionResult } from "@/utils/actionResult";

type AdminMeetInput = { key: string; name: string; service: string; date: string; time: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// The admin's "Generate Meet link": the same Apps Script as the website. `key` is the
// appointment's id (or a fresh id for a new link), which becomes the calendar event id, so a
// double click never makes two events. The link is saved on the row with the appointment.
export async function createMeetLinkAction(input: AdminMeetInput): Promise<ActionResult<{ meetLink: string }>> {
  return attempt(async () => {
    await assertAdmin();
    if (!UUID.test(input.key) || !isValidDate(input.date) || !/^\d{2}:\d{2}$/.test(input.time)) {
      throw new Error("Fill in the date and time first.");
    }
    const { meetingMinutes } = await getBookingSettings();
    const meetLink = await createMeetLink({
      appointmentId: input.key, name: input.name, service: input.service, date: input.date, time: input.time, minutes: meetingMinutes,
    });
    return { meetLink };
  }, "Could not create the Google Meet link. Please try again.");
}
