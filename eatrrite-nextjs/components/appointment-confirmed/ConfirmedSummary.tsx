import { SectionPill } from "@/components/shared/SectionHeading";
import type { Appointment } from "@/types/appointment";

const IST = "Asia/Kolkata";

function statusText(appointment: Appointment) {
  if (appointment.meetLink) return "Your questionnaire is in and your Google Meet link is ready.";
  if (appointment.questionnaire) return "Thank you. We have your responses and are generating your Google Meet link.";
  return "Please complete this questionnaire before we can generate your Google Meet link. Your slot is already reserved.";
}

// Left column of appointment-confirmed.php: status line and booking details.
export function ConfirmedSummary({ appointment }: { appointment: Appointment }) {
  const start = new Date(appointment.slotStart);
  const rows = [
    ["Name", appointment.name],
    ["Consultation", appointment.service],
    ["Date", start.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: IST })],
    ["Time", start.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: IST })],
  ];
  return (
    <aside>
      <SectionPill>Payment received</SectionPill>
      <h1 className="type-section mb-4">Appointment Confirmed</h1>
      <p>{statusText(appointment)}</p>
      <dl className="m-0 grid gap-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="type-field-label text-muted-foreground">{label}</dt>
            <dd className="m-0 mt-1 font-heading text-lg text-primary">{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
