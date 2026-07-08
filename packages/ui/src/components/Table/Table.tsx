import * as React from "react";

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {}

export function Table({ className = "", ...props }: TableProps) {
  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      <table
        className={["w-full text-sm text-neutral-700", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </div>
  );
}

export function TableHead({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={["bg-neutral-50 text-xs text-neutral-500", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function TableBody({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={["divide-y divide-neutral-200", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function TableRow({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={["hover:bg-neutral-50 transition-colors", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function TableHeaderCell({
  className = "",
  scope = "col",
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope={scope}
      className={["px-4 py-3 text-left font-medium", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function TableCell({
  className = "",
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={["px-4 py-3", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
