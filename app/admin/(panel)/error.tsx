"use client";

import { ErrorState } from "@/components/shared/ErrorState";

// One admin page failed; the sidebar and header stay so the admin can move on.
export default function AdminPageError({ error, retry }: { error: unknown; retry: () => void }) {
  return <ErrorState error={error} retry={retry} />;
}
