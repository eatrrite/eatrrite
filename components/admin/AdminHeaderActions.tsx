"use client";

import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { AdminNavSearch } from "@/components/admin/AdminNavSearch";
import { AdminUserMenu } from "@/components/admin/AdminUserMenu";
import { Button } from "@/components/ui/button";

type AdminHeaderActionsProps = {
  onLogout: () => void;
};

export function AdminHeaderActions({ onLogout }: AdminHeaderActionsProps) {
  const router = useRouter();

  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <AdminNavSearch />

      <button
        type="button"
        aria-label="Notifications"
        className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Bell className="size-4" />
        <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
      </button>

      <AdminUserMenu onLogout={onLogout} />
      <Button
        type="button"
        size="lg"
        className="hidden shrink-0 sm:inline-flex px-4"
        onClick={() => router.push("/")}
      >
        Back to website
      </Button>
    </div>
  );
}
