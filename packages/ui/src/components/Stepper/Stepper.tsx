import * as React from "react";

export interface StepperStep {
  label: string;
  /** 補足説明（任意） */
  description?: string;
}

export interface StepperProps
  extends React.HTMLAttributes<HTMLOListElement> {
  steps: StepperStep[];
  /** 現在のステップ（0始まりの index） */
  current: number;
}

export function Stepper({
  steps,
  current,
  className = "",
  ...props
}: StepperProps) {
  return (
    <ol
      role="list"
      className={["flex items-start", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = index < current;
        const isActive = index === current;
        const isLast = index === steps.length - 1;

        return (
          <li
            role="listitem"
            key={index}
            aria-current={isActive ? "step" : undefined}
            className={[
              "flex items-start gap-3",
              isLast ? "" : "flex-1",
            ].join(" ")}
          >
            <div className="flex flex-col items-center">
              <span
                className={[
                  "inline-flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium shrink-0",
                  isCompleted
                    ? "bg-primary-600 text-white"
                    : isActive
                    ? "border-2 border-primary-600 text-primary-600"
                    : "bg-neutral-100 text-neutral-500",
                ].join(" ")}
              >
                {isCompleted ? (
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
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>
            </div>

            <div className="flex-1 pt-1">
              <p
                className={[
                  "text-sm font-medium",
                  isActive || isCompleted
                    ? "text-neutral-900"
                    : "text-neutral-500",
                ].join(" ")}
              >
                {step.label}
              </p>
              {step.description ? (
                <p className="text-xs text-neutral-500 mt-1">
                  {step.description}
                </p>
              ) : null}
              {isLast ? null : (
                <span
                  aria-hidden="true"
                  className={[
                    "mt-3 mr-3 block h-px",
                    isCompleted ? "bg-primary-600" : "bg-neutral-200",
                  ].join(" ")}
                />
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
