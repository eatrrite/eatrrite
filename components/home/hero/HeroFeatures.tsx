import { CalendarCheck2, FileText, UtensilsCrossed, Video } from "lucide-react";

// What sets Eat Rrite apart, drawn from the site copy: plans built on reports,
// everyday meals, online consultations and the Friday check-ins.
const FEATURES = [
  { label: "Report-based Plans", icon: FileText },
  { label: "Your Everyday Meals", icon: UtensilsCrossed },
  { label: "Online Consultations", icon: Video },
  { label: "Friday Check-ins", icon: CalendarCheck2 },
] as const;

export function HeroFeatures() {
  return (
    <ul className="mt-10 mb-0 grid grid-cols-2 gap-4 p-0 sm:grid-cols-4 sm:gap-5">
      {FEATURES.map(({ label, icon: Icon }) => (
        <li key={label} className="flex items-center gap-2.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/12 text-accent backdrop-blur-sm">
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
          <span className="text-xs leading-snug text-white/90 sm:text-sm">{label}</span>
        </li>
      ))}
    </ul>
  );
}
