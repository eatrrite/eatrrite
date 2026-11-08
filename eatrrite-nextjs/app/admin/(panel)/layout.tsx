import { Suspense } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Toaster } from "@/components/ui/sonner";
import { AdminDataProvider } from "@/features/admin/components/AdminDataProvider";
import { loadAdminData } from "@/features/admin/services/adminData";
import { requireAdmin } from "@/features/auth/services/session";

// Checks the session, loads the admin data from Neon, then renders the panel.
async function AdminGate({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const data = await loadAdminData(admin);
  return (
    <AdminDataProvider data={data}>
      <AdminShell>{children}</AdminShell>
    </AdminDataProvider>
  );
}

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="admin-shell h-dvh bg-background" />}>
        <AdminGate>{children}</AdminGate>
      </Suspense>
      <Toaster />
    </>
  );
}
