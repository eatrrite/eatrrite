"use client";

import { useMemo } from "react";
import { parseISO } from "date-fns";
import { motion } from "framer-motion";
import { CalendarCheck, CalendarDays, Clock3, Leaf, Salad, Sprout } from "lucide-react";
import { HeroMotion } from "@/components/motion/FadeIn";
import { DashboardFiltersBar } from "@/components/admin/dashboard/DashboardFiltersBar";
import { useAdminProfile } from "@/hooks/admin/useAdminProfile";
import { adminNow } from "@/constants/admin/dashboard/reference";
import { nowIst } from "@/features/appointment/utils/istTime";
import { useAdminStore } from "@/stores/useAdminStore";
import type { DashboardFilters } from "@/types/admin/dashboard";
import { formatTimeLabel } from "@/utils/admin/time";

type DashboardPageHeaderProps = {
  filters: DashboardFilters;
  onChange: (next: DashboardFilters) => void;
};

function greetingForHour(hour: number) {
  if (hour < 12) return "Good Morning,";
  if (hour < 17) return "Good Afternoon,";
  return "Good Evening,";
}

const toMinutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));

// Today at a glance: consultations booked today and the next one still to come.
function useToday() {
  const appointments = useAdminStore((s) => s.appointments);
  return useMemo(() => {
    const { date, minutes } = nowIst();
    const today = appointments.filter((item) => item.date === date && item.status !== "cancelled");
    const next = today
      .filter((item) => item.status === "upcoming" && toMinutes(item.time) >= minutes)
      .sort((a, b) => a.time.localeCompare(b.time))[0];
    const label = parseISO(`${date}T00:00:00`).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
    return { count: today.length, next: next ? formatTimeLabel(next.time) : null, label };
  }, [appointments]);
}

const DRIFT = [
  { Icon: Salad, className: "right-[6%] top-[14%] w-20", rotate: -12 },
  { Icon: Leaf, className: "right-[22%] bottom-[-10%] w-24", rotate: 18 },
  { Icon: Sprout, className: "right-[38%] top-[8%] hidden w-14 lg:block", rotate: -6 },
];

// The dashboard's welcome band: the website's teal with a gold rule and drifting food outlines,
// the greeting in the handwritten eyebrow, and today's numbers as glass chips. Filters sit below.
export function DashboardPageHeader({ filters, onChange }: DashboardPageHeaderProps) {
  const profile = useAdminProfile();
  const greeting = greetingForHour(parseISO(adminNow()).getHours());
  const today = useToday();
  const chip = "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm text-white/90 backdrop-blur-sm";

  return (
    <div className="space-y-5">
      <HeroMotion delay={0.05}>
        <section className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary-dark px-6 py-7 text-white shadow-[0_28px_60px_-32px_rgba(1,54,54,0.85)] sm:px-9 sm:py-9">
          <div aria-hidden className="absolute -top-24 -right-16 -z-10 size-72 rounded-full bg-accent/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
            {DRIFT.map(({ Icon, className, rotate }, index) => (
              <motion.div
                key={className}
                className={`absolute text-white/10 ${className}`}
                animate={{ y: [0, -10, 0], rotate: [rotate - 2, rotate + 3, rotate - 2] }}
                transition={{ duration: 8 + index, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon strokeWidth={1.2} className="h-auto w-full" />
              </motion.div>
            ))}
          </div>

          <p className="m-0 type-eyebrow text-accent">{greeting}</p>
          <h2 className="mt-2 font-heading text-[1.9rem] leading-tight font-bold tracking-tight text-white sm:text-[2.4rem]">
            {profile.name} <span aria-hidden>👋</span>
          </h2>
          <span aria-hidden className="mt-4 block h-[3px] w-12 rounded-full bg-accent" />
          <p className="mt-4 mb-0 max-w-xl text-white/80">Here&apos;s what&apos;s happening at Eat Rrite today.</p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className={chip}>
              <CalendarDays aria-hidden className="size-4 text-accent" />
              {today.label}
            </span>
            <span className={chip}>
              <CalendarCheck aria-hidden className="size-4 text-accent" />
              {today.count === 1 ? "1 consultation today" : `${today.count} consultations today`}
            </span>
            <span className={chip}>
              <Clock3 aria-hidden className="size-4 text-accent" />
              {today.next ? `Next at ${today.next}` : "No more today"}
            </span>
          </div>
        </section>
      </HeroMotion>

      <HeroMotion delay={0.18}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="m-0 type-eyebrow text-xl">Overview</p>
            <p className="m-0 text-sm text-muted-foreground">Totals for the filters you pick.</p>
          </div>
          <DashboardFiltersBar filters={filters} onChange={onChange} />
        </div>
      </HeroMotion>
    </div>
  );
}
