"use client";

import { AdminMotion, AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProfileHeroCard } from "@/components/admin/account/ProfileHeroCard";
import { ProfileQuickLinks } from "@/components/admin/account/ProfileQuickLinks";
import { ProfileStats } from "@/components/admin/account/ProfileStats";

export default function AdminAccountPage() {
  return (
    <AdminPage>
      <AdminPageHeader
        eyebrow="Account"
        title="Your profile"
        description="A quiet overview of your admin identity and shortcuts."
      />
      <AdminMotion>
        <div className="grid gap-4 lg:grid-cols-[2fr_3fr]">
          <ProfileHeroCard />
          <div className="space-y-4">
            <ProfileStats />
            <ProfileQuickLinks />
          </div>
        </div>
      </AdminMotion>
    </AdminPage>
  );
}
