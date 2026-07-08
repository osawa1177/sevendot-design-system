import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 意味に応じた色。装飾目的で色を選ばない */
  tone?: "neutral" | "primary" | "success" | "warning" | "danger";
}

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "bg-neutral-100 text-neutral-700",
  primary: "bg-primary-50 text-primary-700",
  success: "bg-success-100 text-success-700",
  warning: "bg-warning-100 text-warning-700",
  danger: "bg-danger-100 text-danger-700",
};

export function Badge({
  tone = "neutral",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 h-6 text-xs font-medium",
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
