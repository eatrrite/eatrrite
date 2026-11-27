import "server-only";
import { env } from "@/config/env";
import { ADMIN_TODAY_PATH, confirmedPath } from "@/constants/routes";
import type { BookingMessageData } from "@/features/appointment/types/bookingMessage";
import { db } from "@/services/database";
import { formatTimeLabel } from "@/utils/admin/time";

const displayDate = (date: string) =>
  new Date(`${date}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata",
  });

// "Tue, 10 Nov", short enough for a subject line.
const shortDate = (date: string) =>
  new Date(`${date}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata",
  });

// Everything an email or WhatsApp message about this appointment needs, or null when the
// appointment does not exist. One query, shared by both channels.
export async function bookingMessageData(appointmentId: string): Promise<BookingMessageData | null> {
  const [row] = await db()`
    select l.name, l.email, l.phone, a.service, a.meet_link, a.payment_id,
      to_char(a.date, 'YYYY-MM-DD') as date, to_char(a.time, 'HH24:MI') as time
    from er_appointments a join er_leads l on l.id = a.lead_id where a.id = ${appointmentId}`;
  if (!row) {
    console.warn(`Message skipped (appointment not found): ${appointmentId}`);
    return null;
  }
  return {
    appointmentId,
    name: row.name ?? "",
    email: row.email ?? "",
    phone: row.phone ?? "",
    service: row.service ?? "",
    displayDate: displayDate(row.date),
    shortDate: shortDate(row.date),
    displayTime: formatTimeLabel(row.time),
    meetLink: row.meet_link ?? "",
    paymentId: row.payment_id ?? "",
    questionnaireUrl: `${env.siteUrl()}${confirmedPath(appointmentId)}`,
    adminTodayUrl: `${env.siteUrl()}${ADMIN_TODAY_PATH}`,
  };
}
