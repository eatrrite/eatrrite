"use client";

import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

type BulkActionBarProps = {
  count: number;
  /** What one row is called, for "3 leads selected". */
  noun: [singular: string, plural: string];
  onClear: () => void;
  children: ReactNode;
};

const noSubscribe = () => () => {};

// Floats at the bottom centre of the screen while rows are ticked, so the actions are always in
// view and the table never jumps. Rendered into <body>: the admin page's motion wrapper uses a
// transform, which would otherwise pin a fixed bar to the page instead of the screen.
export function BulkActionBar({ count, noun, onClear, children }: BulkActionBarProps) {
  const mounted = useSyncExternalStore(noSubscribe, () => true, () => false);
  // Keeps the last count while the bar slides out, so it never reads "0 selected".
  const [shown, setShown] = useState(count);
  if (count > 0 && count !== shown) setShown(count);

  if (!mounted) return null;
  return (
    <>
      {/* Room under the list, so the bar never covers the last rows or the pager. */}
      {count > 0 ? <div aria-hidden className="h-28 sm:h-20" /> : null}
      {createPortal(
    <AnimatePresence>
      {count > 0 ? (
        <motion.div
          key="bulk-bar"
          role="toolbar"
          aria-label="Bulk actions"
          initial={{ opacity: 0, y: 24, x: "-50%", scale: 0.97 }}
          animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
          exit={{ opacity: 0, y: 24, x: "-50%", scale: 0.97 }}
          transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.8 }}
          className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-xl flex-col gap-2 rounded-2xl border border-border bg-card/95 py-2.5 pr-2.5 pl-3 text-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-3 shadow-[0_12px_40px_-12px_rgba(1,78,78,0.35)] backdrop-blur-md sm:bottom-8"
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Clear selection"
              onClick={onClear}
              className="text-muted-foreground"
            >
              <XIcon />
            </Button>
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-primary/10 px-2 text-sm font-bold text-primary tabular-nums">
              {shown}
            </span>
            <p className="truncate text-sm font-semibold" aria-live="polite">
              {shown === 1 ? noun[0] : noun[1]} selected
            </p>
          </div>
          <div className="flex items-center gap-2 *:flex-1 sm:shrink-0 sm:*:flex-none">{children}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
      )}
    </>
  );
}
