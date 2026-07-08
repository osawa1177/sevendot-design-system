import * as React from "react";

export interface PaginationProps {
  /** 現在のページ（1始まり） */
  page: number;
  /** 総ページ数 */
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

/** 最大7ボタン（数字）に収まるようページ列を組み立てる。gap は "ellipsis" を返す */
function buildPages(page: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "ellipsis")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i += 1) pages.push(i);
  if (end < totalPages - 1) pages.push("ellipsis");
  pages.push(totalPages);
  return pages;
}

const arrowBtn =
  "inline-flex items-center justify-center h-10 w-10 rounded-md border border-neutral-200 text-neutral-700 " +
  "transition-colors hover:bg-neutral-50 disabled:opacity-50 disabled:pointer-events-none " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500";

export function Pagination({
  page,
  totalPages,
  onChange,
  className = "",
}: PaginationProps) {
  const pages = buildPages(page, totalPages);

  return (
    <nav
      aria-label="ページネーション"
      className={["flex items-center gap-1", className]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        aria-label="前のページ"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={arrowBtn}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {pages.map((p, index) =>
        p === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="inline-flex items-center justify-center h-10 w-10 text-neutral-500"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-label={`${p} ページ目`}
            aria-current={p === page ? "page" : undefined}
            onClick={() => onChange(p)}
            className={[
              "inline-flex items-center justify-center h-10 min-w-10 px-3 rounded-md text-sm font-medium transition-colors",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
              p === page
                ? "bg-primary-600 text-white"
                : "border border-neutral-200 text-neutral-700 hover:bg-neutral-50",
            ].join(" ")}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        aria-label="次のページ"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className={arrowBtn}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </nav>
  );
}
