import * as React from "react";

export interface SkeletonProps {
  /** 形状。text=行、circle=丸、rect=矩形 */
  variant?: "text" | "circle" | "rect";
  /** 幅（CSS値。例 "100%" / 40） */
  width?: string | number;
  /** 高さ（CSS値。例 "1rem" / 40） */
  height?: string | number;
  className?: string;
}

const shapes: Record<NonNullable<SkeletonProps["variant"]>, string> = {
  text: "rounded-md h-4",
  circle: "rounded-full",
  rect: "rounded-md",
};

export function Skeleton({
  variant = "text",
  width,
  height,
  className = "",
}: SkeletonProps) {
  return (
    <span role="status" aria-busy="true" className="inline-block">
      <span
        aria-hidden="true"
        style={{ width, height }}
        className={[
          "block bg-neutral-200 animate-pulse",
          shapes[variant],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
      <span className="sr-only">読み込み中</span>
    </span>
  );
}
