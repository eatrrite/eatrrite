import { DashboardAvatar } from "@/components/admin/dashboard/DashboardAvatar";
import type { Lead } from "@/types/admin/lead";

// Who the appointment is for, shown on the questionnaire and Meet steps.
export function AppointmentLeadSummary({ lead }: { lead: Lead | undefined }) {
  if (!lead) {
    return (
      <p className="rounded-xl bg-mint px-3.5 py-3 text-sm text-muted-foreground">
        Go back and choose a lead first.
      </p>
    );
  }
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-mint px-3.5 py-3">
      <DashboardAvatar name={lead.name} className="size-10" />
      <div className="min-w-0">
        <p className="m-0 truncate text-sm font-semibold text-foreground">
          {lead.name}
        </p>
        <p className="m-0 truncate text-xs text-muted-foreground">
          {[lead.gender, lead.age ? `${lead.age} years` : "", lead.phone]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
    </div>
  );
}
