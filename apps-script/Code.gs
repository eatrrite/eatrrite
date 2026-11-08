/**
 * Eat Rrite: creates the Google Meet link for one consultation.
 *
 * The website (Next.js) calls this once per appointment and saves the returned link on that
 * appointment in Neon. The calendar event id is made from the appointment id, so calling it
 * again for the same appointment returns the same link instead of making a second event.
 *
 * Needs: Services → Google Calendar API (advanced service), and a Script Property SECRET.
 */
const CALENDAR_ID = "primary";
const TIME_ZONE = "Asia/Kolkata";

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    if (!secret || body.secret !== secret) return reply({ ok: false, error: "Unauthorized" });
    if (body.action !== "create_meet") return reply({ ok: false, error: "Unknown action" });
    return reply({ ok: true, meet_link: meetLinkFor(body) });
  } catch (err) {
    return reply({ ok: false, error: String((err && err.message) || err) });
  }
}

// Insert the event with its Meet conference. If an event with this id already exists
// (the same appointment asked twice), return the link it already has.
function meetLinkFor(b) {
  const eventId = "er" + String(b.appointment_id).replace(/-/g, "").toLowerCase();
  try {
    return linkOf(
      Calendar.Events.insert(
        {
          id: eventId,
          summary: "Eat Rrite consultation · " + b.name,
          description: b.service,
          start: { dateTime: b.start_iso, timeZone: TIME_ZONE },
          end: { dateTime: b.end_iso, timeZone: TIME_ZONE },
          conferenceData: { createRequest: { requestId: eventId, conferenceSolutionKey: { type: "hangoutsMeet" } } },
        },
        CALENDAR_ID,
        { conferenceDataVersion: 1 }
      )
    );
  } catch (err) {
    if (String(err).indexOf("already exists") === -1) throw err;
    return linkOf(Calendar.Events.get(CALENDAR_ID, eventId));
  }
}

function linkOf(event) {
  if (event.hangoutLink) return event.hangoutLink;
  const video = ((event.conferenceData && event.conferenceData.entryPoints) || []).filter(function (p) {
    return p.entryPointType === "video";
  })[0];
  if (!video) throw new Error("Google Meet link was not created.");
  return video.uri;
}

function reply(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
