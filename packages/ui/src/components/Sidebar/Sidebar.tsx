import * as React from "react";

export interface SidebarItem {
  id: string;
  label: string;
  /** 先頭アイコン（任意）。インラインSVG等の ReactNode */
  icon?: React.ReactNode;
  href?: string;
}

export interface SidebarProps
  extends React.HTMLAttributes<HTMLElement> {
  items: SidebarItem[];
  /** 現在アクティブなアイテムID */
  activeId?: string;
  /** ヘッダー（ブランド名など） */
  header?: React.ReactNode;
  /** フッター */
  footer?: React.ReactNode;
  onSelect?: (id: string) => void;
}

export function Sidebar({
  items,
  activeId,
  header,
  footer,
  onSelect,
  className = "",
  ...props
}: SidebarProps) {
  return (
    <aside
      className={[
        "flex w-64 flex-col border-r border-neutral-200 bg-white",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {header ? (
        <div className="border-b border-neutral-200 px-4 py-4">
          {header}
        </div>
      ) : null}

      <nav aria-label="サイドナビゲーション" className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = item.id === activeId;
            const content = (
              <>
                {item.icon ? (
                  <span aria-hidden="true" className="shrink-0">
                    {item.icon}
                  </span>
                ) : null}
                <span className="truncate">{item.label}</span>
              </>
            );
            const cls = [
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors text-left",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
              isActive
                ? "bg-primary-50 text-primary-700"
                : "text-neutral-700 hover:bg-neutral-50",
            ].join(" ");

            return (
              <li key={item.id}>
                {item.href ? (
                  <a
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cls}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => onSelect?.(item.id)}
                    className={cls}
                  >
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {footer ? (
        <div className="border-t border-neutral-200 px-4 py-4">
          {footer}
        </div>
      ) : null}
    </aside>
  );
}
