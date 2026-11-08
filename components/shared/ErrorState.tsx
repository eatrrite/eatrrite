"use client";

import { useEffect } from "react";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  error: unknown;
  /** Next.js error.tsx `retry`: loads the segment again. */
  retry: () => void;
  size?: "sm" | "md";
  className?: string;
};

// The body of every error.tsx: what went wrong in plain words and a button to try again.
export function ErrorState({ error, retry, size = "md", className }: ErrorStateProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      image="error"
      size={size}
      className={className}
      title="Something went wrong"
      description="This part of the page could not load. Check your connection and try again."
      action={<Button onClick={retry}>Try again</Button>}
    />
  );
}
