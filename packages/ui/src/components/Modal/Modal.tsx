"use client";

import * as React from "react";

export interface ModalProps {
  /** 開いているか */
  open: boolean;
  /** 閉じる要求（オーバーレイクリック・Escape・閉じるボタン） */
  onClose: () => void;
  /** ダイアログ見出し */
  title: string;
  children?: React.ReactNode;
  /** 下部のアクション領域（任意） */
  footer?: React.ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  const titleId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-sm bg-white rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
          <h2 id={titleId} className="text-base font-semibold text-neutral-900">
            {title}
          </h2>
          <button
            type="button"
            aria-label="閉じる"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-50"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="px-4 py-4 text-sm text-neutral-700">{children}</div>
        {footer ? (
          <div className="flex justify-end gap-2 px-4 py-3 border-t border-neutral-200">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
