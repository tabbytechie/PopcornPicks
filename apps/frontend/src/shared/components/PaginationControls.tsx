import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Optional "Showing X–Y of N" summary. */
  rangeStart?: number;
  rangeEnd?: number;
  totalItems?: number;
}

/** Page numbers with ellipses for long ranges: 1 … 4 5 6 … 20 */
const getPageNumbers = (page: number, totalPages: number): (number | "ellipsis")[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "ellipsis")[] = [1];
  if (page > 3) pages.push("ellipsis");
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  for (let p = start; p <= end; p++) pages.push(p);
  if (page < totalPages - 2) pages.push("ellipsis");
  pages.push(totalPages);
  return pages;
};

/**
 * Themed pagination bar used by Browse, Search, For You and Watchlist.
 * Renders nothing when there is only one page. Clicking a page smoothly
 * scrolls back to the top so the first row of the new page is in view.
 */
export const PaginationControls = ({
  page,
  totalPages,
  onPageChange,
  rangeStart,
  rangeEnd,
  totalItems,
}: PaginationControlsProps) => {
  if (totalPages <= 1) return null;

  const go = (next: number) => {
    if (next < 1 || next > totalPages || next === page) return;
    onPageChange(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="mt-10 flex flex-col items-center gap-3" aria-label="Pagination">
      {typeof totalItems === "number" && (
        <p className="text-sm text-muted-foreground">
          Showing {rangeStart}–{rangeEnd} of {totalItems}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => go(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers(page, totalPages).map((p, i) =>
          p === "ellipsis" ? (
            <span key={`ellipsis-${i}`} className="px-1 text-muted-foreground" aria-hidden="true">
              …
            </span>
          ) : (
            <Button
              key={p}
              variant={p === page ? "primary-red" : "outline"}
              size="icon"
              onClick={() => go(p)}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={() => go(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
          className="gap-1"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};

export default PaginationControls;
