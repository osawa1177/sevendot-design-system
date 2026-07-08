"use client";

import * as React from "react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** 複数同時に開くことを許可する。既定は false（単一展開） */
  multiple?: boolean;
  /** 初期で開いておくアイテムID */
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  className = "",
}: AccordionProps) {
  const [open, setOpen] = React.useState<string[]>(defaultOpen);

  const toggle = (id: string) => {
    setOpen((prev) => {
      const isOpen = prev.includes(id);
      if (multiple) {
        return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div
      className={[
        "border border-neutral-200 rounded-lg divide-y divide-neutral-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const btnId = `accordion-btn-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                <span>{item.title}</span>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={[
                    "shrink-0 text-neutral-500 transition-transform",
                    isOpen ? "rotate-180" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </h3>
            {isOpen ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className="px-4 py-3 text-sm text-neutral-700"
              >
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
