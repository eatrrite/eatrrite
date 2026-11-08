"use client";

import { ErrorState } from "@/components/shared/ErrorState";

// The admin could not load at all (for example the database or sign-in service did not answer).
export default function AdminError({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <div className="admin-shell flex min-h-dvh items-center justify-center bg-background p-6">
      <ErrorState error={error} retry={retry} />
    </div>
  );
}
