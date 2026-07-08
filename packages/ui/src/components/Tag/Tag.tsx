import * as React from "react";

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** 表示テキスト */
  label: string;
  /** 意味に応じた色。装飾目的で色を選ばない */
  tone?: "primary" | "neutral";
  /** 削除ボタンのハンドラ。渡すと × ボタンを表示 */
  onRemove?: () => void;
}

const tones: Record<NonNullable<TagProps["tone"]>, string> = {
  primary: "bg-primary-50 text-primary-700",
  neutral: "bg-neutral-100 text-neutral-700",
};

export function Tag({
  label,
  tone = "neutral",
  onRemove,
  className = "",
  ...props
}: TagProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full h-6 text-xs font-medium",
        onRemove ? "pl-2 pr-1" : "px-2",
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {label}
      {onRemove ? (
        <button
          type="button"
          aria-label={`${label}を削除`}
          onClick={onRemove}
          className="inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-neutral-200"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1l8 8M9 1l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : null}
    </span>
  );
}
