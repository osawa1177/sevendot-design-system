import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 見た目のバリアント。1画面に primary は原則1つ */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** サイズ。既定は md */
  size?: "sm" | "md" | "lg";
  /** 幅いっぱいに広げる */
  fullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary-600 text-white hover:bg-primary-700",
  secondary:
    "bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50",
  ghost: "bg-transparent text-primary-600 hover:bg-primary-50",
  danger: "bg-danger-600 text-white hover:bg-danger-700",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        base,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
