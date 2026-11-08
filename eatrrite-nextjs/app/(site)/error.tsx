"use client";

import { ErrorState } from "@/components/shared/ErrorState";

// A page of the public site failed to render (for example the database did not answer).
export default function SiteError({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <main className="er-container py-16">
      <ErrorState error={error} retry={retry} />
    </main>
  );
}
