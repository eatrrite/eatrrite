"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { Mail, MapPin, Pencil, Phone, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { HeroMotion } from "@/components/motion/FadeIn";
import type { Lead } from "@/types/admin/lead";
import { getInitials } from "@/utils/admin/initials";

type LeadDetailsCardProps = {
  lead: Lead | null;
  onEdit: () => void;
  onDelete: () => void;
};

function formatStamp(iso: string) {
  return format(parseISO(iso), "MMM d, yyyy");
}

export function LeadDetailsCard({
  lead,
  onEdit,
  onDelete,
}: LeadDetailsCardProps) {
  if (!lead) {
    return (
      <aside className="flex h-fit min-h-48 items-center justify-center self-start rounded-2xl border border-dashed border-border bg-card p-6">
        <EmptyState
          size="sm"
          image="leads"
          title="No lead selected"
          description="Pick one from the list to see their details."
        />
      </aside>
    );
  }

  return (
    <aside className="flex h-fit flex-col gap-4 self-start overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-[0_14px_40px_-28px_rgba(1,78,78,0.35)]">
      <HeroMotion key={`${lead.id}-head`} delay={0.05}>
        {/* Teal band with the lead's name, like the website's banners. */}
        <div className="relative -mx-5 -mt-5 flex items-center gap-3.5 bg-linear-to-br from-primary to-primary-dark px-5 pt-5 pb-5 text-white">
          <div aria-hidden className="absolute -top-10 -right-8 size-32 rounded-full bg-accent/20 blur-2xl" />
          <span className="relative inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold text-ink ring-4 ring-white/15">
            {getInitials(lead.name)}
          </span>
          <div className="relative min-w-0 flex-1">
            <p className="m-0 type-eyebrow text-lg text-accent">Lead</p>
            <p className="truncate font-heading text-xl font-bold text-white">
              {lead.name}
            </p>
            <p className="mt-0.5 text-sm text-white/75">
              {[
                lead.age ? `${lead.age} years` : "",
                lead.gender,
                lead.profession,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        </div>
      </HeroMotion>

      <HeroMotion key={`${lead.id}-contact`} delay={0.18}>
        <div className="space-y-2.5 rounded-xl border border-border bg-background px-3.5 py-3">
          <p className="flex items-start gap-2.5 text-sm text-foreground">
            <Phone className="mt-0.5 size-3.5 shrink-0 text-primary" />
            <span>{lead.phone}</span>
          </p>
          <p className="flex items-start gap-2.5 text-sm text-foreground">
            <Mail className="mt-0.5 size-3.5 shrink-0 text-primary" />
            <span className={lead.email ? undefined : "text-muted-foreground"}>
              {lead.email ?? "Email not provided"}
            </span>
          </p>
          <p className="flex items-start gap-2.5 text-sm text-foreground">
            <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" />
            <span
              className={lead.address ? undefined : "text-muted-foreground"}
            >
              {lead.address ?? "Address not provided"}
            </span>
          </p>
        </div>
      </HeroMotion>

      <HeroMotion key={`${lead.id}-meta`} delay={0.28}>
        <p className="text-xs text-muted-foreground">
          Added {formatStamp(lead.createdAt)} · Updated{" "}
          {formatStamp(lead.updatedAt)}
        </p>
      </HeroMotion>

      <HeroMotion key={`${lead.id}-actions`} delay={0.38}>
        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <Button
            type="button"
            variant="outline"
            className="w-fit gap-1.5"
            onClick={onEdit}
          >
            <Pencil className="size-3.5" />
            Edit
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="w-fit gap-1.5"
            onClick={onDelete}
          >
            <Trash2 className="size-3.5" />
            Delete
          </Button>
        </div>
      </HeroMotion>
    </aside>
  );
}
