"use client";

import * as React from "react";

export interface DropdownItem {
  id: string;
  label: string;
  /** default=通常項目、danger=破壊的操作 */
  tone?: "default" | "danger";
  onSelect?: () => void;
}

export interface DropdownProps {
  /** トリガーボタンの文言 */
  label: string;
  items: DropdownItem[];
  className?: string;
}

export function Dropdown({ label, items, className = "" }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className={["relative inline-block", className].filter(Boolean).join(" ")}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
      >
        {label}
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute left-0 mt-1 w-max min-w-full rounded-md border border-neutral-200 bg-white py-1 shadow-md"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              onClick={() => {
                item.onSelect?.();
                setOpen(false);
              }}
              className={[
                "block w-full px-4 py-2 text-left text-sm hover:bg-neutral-50",
                item.tone === "danger" ? "text-danger-600" : "text-neutral-700",
              ].join(" ")}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
