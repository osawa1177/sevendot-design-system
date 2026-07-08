import * as React from "react";

export interface BreadcrumbItem {
  label: string;
  /** 遷移先。最終要素は省略する */
  href?: string;
}

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export function Breadcrumb({
  items,
  className = "",
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="パンくずリスト"
      className={className}
      {...props}
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={
                    isLast
                      ? "text-neutral-900 font-medium"
                      : "text-neutral-700"
                  }
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </a>
              )}
              {isLast ? null : (
                <span aria-hidden="true" className="text-neutral-500">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
