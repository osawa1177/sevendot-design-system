import * as React from "react";

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 進捗値（0〜100） */
  value: number;
  /** 上部に表示するラベル */
  label?: string;
}

export function Progress({
  value,
  label,
  className = "",
  ...props
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className={className} {...props}>
      {label ? (
        <div className="mb-1 flex items-center justify-between text-xs text-neutral-500">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-2 w-full overflow-hidden rounded-full bg-neutral-200"
      >
        <div
          className="h-full rounded-full bg-primary-600 transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
