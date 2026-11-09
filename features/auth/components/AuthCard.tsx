import Image from "next/image";
import type { ReactNode } from "react";
import { BRAND } from "@/constants/brand";

// The card shell every admin sign-in screen shares: logo, eyebrow, title and lead.
export function AuthCard({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <Image src={BRAND.logo} alt={BRAND.name} width={1162} height={332} priority className="h-12 w-auto" />
      <p className="mt-6 type-eyebrow">Admin</p>
      <h1 className="mt-1 font-heading text-3xl font-bold text-foreground">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{lead}</p>
      {children}
    </div>
  );
}

export function AuthError({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-4 rounded-lg bg-alert-bg px-3 py-2 text-sm text-alert-text">
      {message}
    </p>
  );
}
