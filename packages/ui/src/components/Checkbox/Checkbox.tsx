import * as React from "react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** ラベル（必須） */
  label: string;
}

export function Checkbox({
  label,
  id,
  className = "",
  disabled,
  ...props
}: CheckboxProps) {
  const inputId = id ?? React.useId();

  return (
    <div
      className={["flex items-center gap-2", className].filter(Boolean).join(" ")}
    >
      <input
        id={inputId}
        type="checkbox"
        disabled={disabled}
        style={{ width: 18, height: 18 }}
        className={[
          "shrink-0 rounded border-neutral-200 accent-primary-600",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
          "disabled:opacity-50",
        ].join(" ")}
        {...props}
      />
      <label
        htmlFor={inputId}
        className={[
          "text-sm text-neutral-900 select-none",
          disabled ? "opacity-50" : "cursor-pointer",
        ].join(" ")}
      >
        {label}
      </label>
    </div>
  );
}
