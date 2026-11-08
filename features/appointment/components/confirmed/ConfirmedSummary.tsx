import { BlurIn } from "@/components/motion/BlurIn";
import { displayDate, displayTime } from "@/features/appointment/utils/istTime";

export type ConfirmedDetails = { name: string; service: string; date: string; time: string };

// Left column of appointment-confirmed.php: status line and booking details.
export function ConfirmedSummary({ details, done }: { details: ConfirmedDetails; done: boolean }) {
  const rows = [
    ["Name", details.name],
    ["Consultation", details.service],
    ["Date", displayDate(details.date)],
    ["Time", displayTime(details.time)],
  ];
  return (
    // Stays in view on wide screens while the right side scrolls. top-28 clears the sticky header.
    <aside className="lg:sticky lg:top-28">
      <BlurIn>
        <p className="m-0 type-eyebrow">Payment received</p>
        <h1 className="mt-3 mb-0 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">Appointment Confirmed</h1>
        <p className="mt-4 mb-0 text-text">
          {done
            ? "Your questionnaire is in and your Google Meet link is ready."
            : "Please complete this questionnaire before we can generate your Google Meet link. Your slot is already reserved."}
        </p>
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
