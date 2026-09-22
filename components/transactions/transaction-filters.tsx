"use client";

import { Input } from "@/components/ui/input";
import type { TransactionType } from "@/types";
import { cn } from "@/lib/utils";

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
          label="Пошук"
          placeholder="Опис, категорія, рахунок…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Тип
        </span>
        <div className="flex flex-wrap gap-1.5">
          {TYPE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onTypeChange(option)}
              className={cn(
                "rounded-lg px-3 py-2 text-xs font-semibold transition-colors",
                type === option
                  ? "bg-[#2f6fed] text-white"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
