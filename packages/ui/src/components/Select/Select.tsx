import * as React from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** ラベル（必須）。placeholder をラベル代わりにしない */
  label: string;
  /** 補足説明 */
  helperText?: string;
  /** エラーメッセージ。指定するとエラー表示になる */
  error?: string;
  /** 選択肢。children で option を直接渡す場合は省略可 */
  options?: SelectOption[];
}

export function Select({
  label,
  helperText,
  error,
  options,
  id,
  className = "",
  children,
  ...props
}: SelectProps) {
  const selectId = id ?? React.useId();
  const describedBy = error
    ? `${selectId}-error`
    : helperText
      ? `${selectId}-helper`
      : undefined;

  return (
    <div className={["flex flex-col gap-1", className].filter(Boolean).join(" ")}>
      <label htmlFor={selectId} className="text-sm font-medium text-neutral-900">
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={[
            "h-10 w-full appearance-none pl-3 pr-10 text-sm rounded-md border bg-white text-neutral-900",
            "focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-primary-500",
            "disabled:bg-neutral-100 disabled:text-neutral-500",
            error ? "border-danger-600" : "border-neutral-200",
          ].join(" ")}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error ? (
        <p id={`${selectId}-error`} className="text-xs text-danger-600">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${selectId}-helper`} className="text-xs text-neutral-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
