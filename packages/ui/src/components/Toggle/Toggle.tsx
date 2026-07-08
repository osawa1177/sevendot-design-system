"use client";

import * as React from "react";

export interface ToggleProps {
  /** ラベル（必須） */
  label: string;
  /** ラベル下の補足説明 */
  description?: string;
  /** ON/OFF（controlled） */
  checked?: boolean;
  /** 初期状態（uncontrolled） */
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function Toggle({
  label,
  description,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  id,
  className = "",
}: ToggleProps) {
  const toggleId = id ?? React.useId();
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = checked ?? internal;
  const descId = description ? `${toggleId}-desc` : undefined;

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (checked === undefined) setInternal(next);
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className={["flex items-start gap-3", className].filter(Boolean).join(" ")}
    >
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-labelledby={`${toggleId}-label`}
        aria-describedby={descId}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className={[
          "relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
          "disabled:opacity-50 disabled:pointer-events-none",
          on ? "bg-primary-600" : "bg-neutral-200",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            on ? "translate-x-5" : "translate-x-1",
          ].join(" ")}
        />
      </button>
      <div className="flex flex-col">
        <label
          id={`${toggleId}-label`}
          onClick={toggle}
          className={[
            "text-sm font-medium text-neutral-900 select-none",
            disabled ? "opacity-50" : "cursor-pointer",
          ].join(" ")}
        >
          {label}
        </label>
        {description ? (
          <span id={descId} className="text-xs text-neutral-500">
            {description}
          </span>
        ) : null}
      </div>
    </div>
  );
}
