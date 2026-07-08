import * as React from "react";

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** ラベル（必須）。placeholder をラベル代わりにしない */
  label: string;
  /** 補足説明 */
  helperText?: string;
  /** エラーメッセージ。指定するとエラー表示になる */
  error?: string;
}

export function DatePicker({
  label,
  helperText,
  error,
  id,
  className = "",
  ...props
}: DatePickerProps) {
  const inputId = id ?? React.useId();
  const describedBy = error
    ? `${inputId}-error`
    : helperText
      ? `${inputId}-helper`
      : undefined;

  return (
    <div className={["flex flex-col gap-1", className].filter(Boolean).join(" ")}>
      <label htmlFor={inputId} className="text-sm font-medium text-neutral-900">
        {label}
      </label>
      <input
        id={inputId}
        type="date"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={[
          "h-10 px-3 text-sm rounded-md border bg-white text-neutral-900",
          "focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-primary-500",
          "disabled:bg-neutral-100 disabled:text-neutral-500",
          error ? "border-danger-600" : "border-neutral-200",
        ].join(" ")}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-xs text-danger-600">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="text-xs text-neutral-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
