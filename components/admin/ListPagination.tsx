"use client";

import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "cn";

type ListPaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
};

// The page numbers to show: always the first and last, the current page and its neighbours;
// "gap" marks the skipped runs. For 10 pages on page 5: 1 … 4 5 6 … 10.
function pageList(page: number, pageCount: number): (number | "gap")[] {
  const pages: (number | "gap")[] = [];
  for (let n = 1; n <= pageCount; n++) {
    const near = n === 1 || n === pageCount || Math.abs(n - page) <= 1;
    if (near) pages.push(n);
    else if (pages[pages.length - 1] !== "gap") pages.push("gap");
  }
  return pages;
}

// Small pager at the bottom right of every admin list. Hidden when everything fits on one page.
export function ListPagination({ page, pageCount, onPageChange, className }: ListPaginationProps) {
  if (pageCount <= 1) return null;
  return (
    <Pagination className={cn("mx-0 justify-end", className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious size="sm" disabled={page === 1} onClick={() => onPageChange(page - 1)} />
        </PaginationItem>
        {pageList(page, pageCount).map((item, index) =>
          item === "gap" ? (
            <PaginationItem key={`gap-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink size="icon-sm" isActive={item === page} onClick={() => onPageChange(item)}>
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext size="sm" disabled={page === pageCount} onClick={() => onPageChange(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
