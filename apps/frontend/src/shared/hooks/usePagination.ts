import { useEffect, useMemo, useState } from "react";

/**
 * Client-side pagination for already-loaded lists (browse tabs, search
 * results, watchlist, recommendation rails). Resets to page 1 whenever the
 * source list or page size changes — i.e. on any filter/tab/sort change —
 * and clamps the page if the list shrinks beneath it.
 */
export function usePagination<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(1);

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // New result set (or new page size) → back to the first page.
  useEffect(() => {
    setPage(1);
  }, [items, pageSize]);

  // Keep the current page valid when the list shrinks.
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginatedItems = useMemo(
    () => items.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
    [items, page, pageSize],
  );

  const rangeStart = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalItems);

  return {
    page,
    setPage,
    totalPages,
    totalItems,
    paginatedItems,
    rangeStart,
    rangeEnd,
  };
}
