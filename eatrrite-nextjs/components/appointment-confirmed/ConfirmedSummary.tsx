import { BlurIn } from "@/components/motion/BlurIn";
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
      <BlurIn>
        <p className="m-0 text-xs font-semibold tracking-[0.12em] text-primary uppercase sm:text-sm">Payment received</p>
        <h1 className="mt-3 mb-0 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">Appointment Confirmed</h1>
        <p className="mt-4 mb-0 text-text">{statusText(appointment)}</p>
      </BlurIn>
      <BlurIn delay={0.1}>
        <dl className="mt-8 mb-0 grid gap-1 border-l border-border pl-5">
          {rows.map(([label, value]) => (
            <div key={label} className="relative py-2.5">
              <span aria-hidden className="absolute top-4 -left-[1.53rem] size-2.5 rounded-full border-2 border-mint bg-primary" />
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</dt>
              <dd className="m-0 mt-1 font-heading text-lg text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </BlurIn>
    </aside>
  );
}
