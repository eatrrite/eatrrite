"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import {
  DashboardCard,
  DashboardCardHeader,
} from "@/components/admin/dashboard/DashboardCard";
import { useAdminProfile } from "@/hooks/admin/useAdminProfile";

export function ProfileHeroCard() {
  const profile = useAdminProfile();

  return (
    <DashboardCard>
      <DashboardCardHeader
        icon={
          <span className="font-heading text-sm font-bold">
            {profile.initials}
          </span>
        }
        title={profile.name}
        subtitle="Admin"
      />
      <div className="space-y-2.5 rounded-xl bg-mint px-3.5 py-3">
        <p className="flex items-center gap-2.5 text-sm text-foreground">
          <Mail className="size-3.5 shrink-0 text-muted-foreground" />
          {profile.email}
        </p>
        <p className="flex items-center gap-2.5 text-sm text-foreground">
          <Phone className="size-3.5 shrink-0 text-muted-foreground" />
          {profile.mobile ?? "Mobile not added"}
        </p>
        <p className="flex items-center gap-2.5 text-sm text-foreground">
          <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
          {profile.address ?? "Address not added"}
        </p>
      </div>
    </DashboardCard>
  );
}
