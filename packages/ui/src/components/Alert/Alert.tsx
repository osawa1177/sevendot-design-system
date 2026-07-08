import * as React from "react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 意味に応じた色 */
  tone?: "info" | "success" | "warning" | "danger";
  /** 見出し（任意） */
  title?: string;
}

const tones: Record<
  NonNullable<AlertProps["tone"]>,
  { box: string; title: string }
> = {
  info: {
    box: "bg-primary-50 border-primary-300 text-primary-700",
    title: "text-primary-700",
  },
  success: {
    box: "bg-success-100 border-success-600 text-success-700",
    title: "text-success-700",
  },
  warning: {
    box: "bg-warning-100 border-warning-700 text-warning-700",
    title: "text-warning-700",
  },
  danger: {
    box: "bg-danger-100 border-danger-600 text-danger-700",
    title: "text-danger-700",
  },
};

export function Alert({
  tone = "info",
  title,
  className = "",
  children,
  ...props
}: AlertProps) {
  const t = tones[tone];
  return (
    <div
      role={tone === "danger" || tone === "warning" ? "alert" : "status"}
      className={[
        "border rounded-md px-4 py-3 text-sm",
        t.box,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {title ? (
        <p className={["font-semibold mb-1", t.title].join(" ")}>{title}</p>
      ) : null}
      {children}
    </div>
  );
}
