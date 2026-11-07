import { Mail, MapPin, Phone } from "lucide-react";
import {
  DashboardCard,
  DashboardCardHeader,
} from "@/components/admin/dashboard/DashboardCard";
import { ADMIN_USER_PROFILE } from "@/constants/admin/admin";

export function ProfileHeroCard() {
  const profile = ADMIN_USER_PROFILE;

  return (
    <DashboardCard>
      <DashboardCardHeader
        icon={
          <span className="font-heading text-sm font-bold">
            {profile.initials}
          </span>
        }
        title={profile.displayName}
        subtitle={profile.role}
      />
      <div className="space-y-2.5 rounded-xl bg-muted/50 px-3.5 py-3">
        <p className="flex items-center gap-2.5 text-sm text-foreground">
          <Mail className="size-3.5 shrink-0 text-muted-foreground" />
          {profile.email}
        </p>
        <p className="flex items-center gap-2.5 text-sm text-foreground">
          <Phone className="size-3.5 shrink-0 text-muted-foreground" />
          {profile.phone}
        </p>
        <p className="flex items-center gap-2.5 text-sm text-foreground">
          <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
          {profile.branch} branch
        </p>
      </div>
    </DashboardCard>
  );
}
