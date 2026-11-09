"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  CircleHelp,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdminProfile } from "@/hooks/admin/useAdminProfile";

type AdminUserMenuProps = {
  onLogout: () => Promise<void>;
};

export function AdminUserMenu({ onLogout }: AdminUserMenuProps) {
  const router = useRouter();
  const profile = useAdminProfile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  // Stays true from "Log Out" until the login page has loaded, so the dialog shows "Logging out…".
  const [loggingOut, startLogout] = useTransition();

  const go = (href: string) => {
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger
        className="p-1 border border-border"
          aria-label={`${profile.name} account`}
          render={
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full p-0.5 outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          }
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
            {profile.initials}
          </span>
          <span className="hidden max-w-[7.5rem] truncate text-sm font-medium text-foreground sm:inline">
            {profile.name}
          </span>
          <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-52" sideOffset={8}>
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-2 py-1.5">
              <p className="text-sm font-medium text-foreground">
                {profile.name}
              </p>
              <p className="text-xs font-normal text-muted-foreground">
                {profile.email}
              </p>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => go("/admin/account")}>
              <UserRound />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => go("/admin/settings")}>
              <Settings />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(event) => event.preventDefault()}>
              <CircleHelp />
              Help & support
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                setMenuOpen(false);
                setConfirmOpen(true);
              }}
            >
              <LogOut />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Log out?"
        description="You will need to sign in again to open the admin dashboard."
        cancelLabel="Cancel"
        confirmLabel="Log Out"
        confirmVariant="destructive"
        closeOnConfirm={false}
        pending={loggingOut}
        pendingLabel="Logging out…"
        onConfirm={() => startLogout(onLogout)}
      />
    </>
  );
}
