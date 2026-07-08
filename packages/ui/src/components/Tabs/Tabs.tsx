"use client";

import * as React from "react";

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  items: TabItem[];
  /** 選択中のタブID（controlled） */
  value?: string;
  /** 初期選択タブID（uncontrolled） */
  defaultValue?: string;
  onChange?: (id: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export function Tabs({
  items,
  value,
  defaultValue,
  onChange,
  className = "",
  children,
}: TabsProps) {
  const [internal, setInternal] = React.useState(
    defaultValue ?? items[0]?.id ?? ""
  );
  const active = value ?? internal;

  const select = (id: string) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        className="flex gap-1 border-b border-neutral-200"
      >
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => select(item.id)}
              className={[
                "h-10 px-4 text-sm font-medium -mb-px border-b-2 transition-colors",
                selected
                  ? "border-primary-600 text-primary-700"
                  : "border-transparent text-neutral-500 hover:text-neutral-700",
              ].join(" ")}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {children}
    </div>
  );
}
