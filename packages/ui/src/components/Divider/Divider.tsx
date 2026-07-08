import * as React from "react";

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 向き。既定は水平 */
  orientation?: "horizontal" | "vertical";
  /** 中央に表示するテキスト（例: 「または」）。水平のみ有効 */
  label?: string;
}

export function Divider({
  orientation = "horizontal",
  label,
  className = "",
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={["self-stretch border-l border-neutral-200", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={["flex items-center gap-3 text-xs text-neutral-500", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <span className="flex-1 border-t border-neutral-200" />
        <span>{label}</span>
        <span className="flex-1 border-t border-neutral-200" />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={["w-full border-t border-neutral-200", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
