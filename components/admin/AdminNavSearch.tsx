"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { filterAdminNav } from "@/utils/admin/filterAdminNav";

export function AdminNavSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const results = useMemo(() => filterAdminNav(query), [query]);

  return (
    <div className="relative hidden min-w-0 md:block md:w-56 lg:w-72">
      <label className="relative block">
        <span className="sr-only">Search admin pages</span>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 120);
          }}
          placeholder="Search pages..."
          className="h-10 w-full rounded-full border border-input bg-background py-2 pr-3 pl-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </label>

      {open && query.trim() ? (
        <div className="absolute top-[calc(100%+0.5rem)] left-0 z-50 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-md surface-overlay">
          {results.length === 0 ? (
            <p className="px-3 py-3 text-sm text-muted-foreground">
              No pages match “{query.trim()}”.
            </p>
          ) : (
            <ul className="max-h-64 overflow-y-auto py-1">
              {results.map((item) => (
                <li key={item.href}>
                  <button
                    type="button"
                    className="flex w-full items-center px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      setQuery("");
                      setOpen(false);
                      router.push(item.href);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
