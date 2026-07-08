import * as React from "react";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {}

export function List({ className = "", ...props }: ListProps) {
  return (
    <ul
      className={["divide-y divide-neutral-200", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export interface ListItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  /** 行頭の要素（Avatar・アイコン等） */
  leading?: React.ReactNode;
  /** 主テキスト */
  title: React.ReactNode;
  /** 補足テキスト */
  description?: React.ReactNode;
  /** 行末の要素（Badge・ボタン等） */
  trailing?: React.ReactNode;
}

export function ListItem({
  leading,
  title,
  description,
  trailing,
  className = "",
  ...props
}: ListItemProps) {
  return (
    <li
      className={[
        "flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {leading ? <div className="shrink-0">{leading}</div> : null}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-neutral-900 truncate">{title}</p>
        {description ? (
          <p className="text-xs text-neutral-500 truncate">{description}</p>
        ) : null}
      </div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </li>
  );
}
