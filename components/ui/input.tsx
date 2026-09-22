import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

/**
 * Text input with optional label, hint, and error message.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, type = "text", ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors",
            "bg-white text-zinc-900 placeholder:text-zinc-400",
            "dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 dark:focus-visible:ring-[#2f6fed] dark:focus-visible:ring-offset-zinc-950",
            "disabled:cursor-not-allowed disabled:opacity-60 dark:disabled:bg-zinc-900/60",
            error
              ? "border-danger-500 focus-visible:ring-danger-500"
              : "border-zinc-300",
            className
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-danger-600 dark:text-danger-400">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="text-xs text-zinc-500 dark:text-zinc-400">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
