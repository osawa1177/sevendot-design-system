import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** ホバーで浮かせる（一覧のリンクカード用） */
  interactive?: boolean;
}

export function Card({
  interactive = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "bg-white border border-neutral-200 rounded-lg",
        interactive ? "transition-shadow hover:shadow-md cursor-pointer" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function CardHeader({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["px-4 pt-4 pb-2", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export function CardBody({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["px-4 pb-4", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
