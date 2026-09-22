import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const selectClassName = cn(
  "flex h-10 w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors",
  "border-zinc-300 bg-white text-zinc-900",
  "dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-100",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1",
  "dark:focus-visible:ring-[#2f6fed] dark:focus-visible:ring-offset-zinc-950",
  "disabled:cursor-not-allowed disabled:opacity-60"
);

/**
 * Theme-aware native select (fixes white-on-white in dark mode).
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, id, children, ...props }, ref) => {
    const selectId = id ?? props.name;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(selectClassName, className)}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";

export { selectClassName };
