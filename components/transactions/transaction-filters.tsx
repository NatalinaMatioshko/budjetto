"use client";

import { Input } from "@/components/ui/input";
import type { TransactionType } from "@/types";

export interface TransactionFiltersProps {
  query: string;
  type: "ALL" | TransactionType;
  onQueryChange: (value: string) => void;
  onTypeChange: (value: "ALL" | TransactionType) => void;
}

const TYPE_OPTIONS: Array<"ALL" | TransactionType> = [
  "ALL",
  "EXPENSE",
  "INCOME",
  "TRANSFER",
];

/**
 * Search + type filters for the transactions list.
 */
export function TransactionFilters({
  query,
  type,
  onQueryChange,
  onTypeChange,
}: TransactionFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <Input
          label="Search"
          placeholder="Search description, category, account…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-slate-700">Type</span>
        <div className="flex flex-wrap gap-1.5">
          {TYPE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onTypeChange(option)}
              className={
                type === option
                  ? "rounded-lg bg-primary-600 px-3 py-2 text-xs font-semibold text-white"
                  : "rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              }
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
