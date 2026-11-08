"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  DashboardCard,
  DashboardCardHeader,
} from "@/components/admin/dashboard/DashboardCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { todayIst } from "@/features/appointment/utils/istTime";
import { useAdminStore } from "@/stores/useAdminStore";
import { appointmentTrend } from "@/utils/admin/appointmentTrend";

const RANGES = { "7d": 7, "14d": 14, "30d": 30 } as const;
type Range = keyof typeof RANGES;

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-semibold text-foreground">
        {payload[0]?.value} appointments
      </p>
      <p className="mt-0.5 text-muted-foreground">{label}</p>
    </div>
  );
}

export function AppointmentsChart() {
  const appointments = useAdminStore((s) => s.appointments);
  const [range, setRange] = useState<Range>("7d");
  const data = useMemo(() => appointmentTrend(appointments, todayIst(), RANGES[range]), [appointments, range]);
  return (
    <DashboardCard>
      <DashboardCardHeader
        icon={<CalendarDays className="size-4" />}
        tone="gold"
        title="Appointments"
        subtitle={`Daily appointments for the last ${RANGES[range]} days`}
        action={
          <Select value={range} onValueChange={(next) => next && setRange(next as Range)}>
            <SelectTrigger size="sm" className="w-[8.5rem]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} align="end">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="14d">Last 14 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        }
      />
      <div className="min-h-0 flex-1 pt-2">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
          >
            <defs>
              <linearGradient id="apptFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ stroke: "var(--primary)", strokeDasharray: "4 4" }}
              content={<ChartTooltip />}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="var(--primary)"
              strokeWidth={2.5}
              fill="url(#apptFill)"
              dot={{ r: 4, fill: "var(--accent)", stroke: "var(--card)", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "var(--accent)", stroke: "var(--primary)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
