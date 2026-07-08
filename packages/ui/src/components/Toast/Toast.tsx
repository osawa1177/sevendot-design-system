import * as React from "react";

export interface ToastProps {
  /** 意味に応じた色 */
  tone?: "success" | "info" | "warning" | "danger";
  /** 表示メッセージ */
  message: string;
  /** 閉じる操作（任意）。自動消去タイマーは呼び出し側の責務 */
  onClose?: () => void;
}

const tones: Record<
  NonNullable<ToastProps["tone"]>,
  { box: string; icon: React.ReactNode }
> = {
  success: {
    box: "bg-success-100 border-success-600 text-success-700",
    icon: (
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  info: {
    box: "bg-primary-50 border-primary-300 text-primary-700",
    icon: (
      <>
        <circle cx="8" cy="4.5" r="1" fill="currentColor" />
        <path d="M8 7.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  warning: {
    box: "bg-warning-100 border-warning-700 text-warning-700",
    icon: (
      <>
        <path
          d="M8 2.5l6 10.5H2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
      </>
    ),
  },
  danger: {
    box: "bg-danger-100 border-danger-600 text-danger-700",
    icon: (
      <>
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11" r="0.75" fill="currentColor" />
      </>
    ),
  },
};

export function Toast({ tone = "info", message, onClose }: ToastProps) {
  const t = tones[tone];
  const urgent = tone === "danger" || tone === "warning";
  return (
    <div
      role={urgent ? "alert" : "status"}
      aria-live={urgent ? "assertive" : "polite"}
      className={[
        "flex items-center gap-2 border rounded-md px-4 py-3 text-sm shadow-md",
        t.box,
      ].join(" ")}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {t.icon}
      </svg>
      <p className="flex-1">{message}</p>
      {onClose ? (
        <button
          type="button"
          aria-label="閉じる"
          onClick={onClose}
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md opacity-70 transition-opacity hover:opacity-100"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
