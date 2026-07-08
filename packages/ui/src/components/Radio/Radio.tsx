"use client";

import * as React from "react";

interface RadioGroupContextValue {
  name: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null
);

export interface RadioGroupProps {
  /** グループの見出し（必須）。fieldset の legend になる */
  legend: string;
  /** グループ内の radio が共有する name（必須） */
  name: string;
  className?: string;
  children?: React.ReactNode;
}

export function RadioGroup({
  legend,
  name,
  className = "",
  children,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name }}>
      <fieldset
        className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}
      >
        <legend className="text-sm font-medium text-neutral-900">
          {legend}
        </legend>
        {children}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** ラベル（必須） */
  label: string;
}

export function Radio({
  label,
  id,
  name,
  className = "",
  disabled,
  ...props
}: RadioProps) {
  const inputId = id ?? React.useId();
  const group = React.useContext(RadioGroupContext);
  const resolvedName = name ?? group?.name;

  return (
    <div
      className={["flex items-center gap-2", className].filter(Boolean).join(" ")}
    >
      <input
        id={inputId}
        type="radio"
        name={resolvedName}
        disabled={disabled}
        style={{ width: 18, height: 18 }}
        className={[
          "shrink-0 border-neutral-200 accent-primary-600",
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
