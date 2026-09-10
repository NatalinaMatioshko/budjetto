import type { BudgetWithProgress } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface BudgetProgressProps {
  budgets: BudgetWithProgress[];
  emptyMessage?: string;
}

/**
 * Visual progress bars for budget usage.
 */
export function BudgetProgress({
  budgets,
  emptyMessage = "No budgets configured yet.",
}: BudgetProgressProps) {
  if (budgets.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-slate-500">{emptyMessage}</p>
    );
  }

  return (
    <ul className="space-y-4">
      {budgets.map((budget) => {
        const percent = budget.progressPercent;
        const over = percent >= 100;
        const warn = percent >= 80 && percent < 100;

        return (
          <li
            key={budget.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-slate-900">{budget.name}</p>
                {budget.category && (
                  <p className="text-xs text-slate-500">
                    {budget.category.name}
                  </p>
                )}
              </div>
              <p className="text-sm tabular-nums text-slate-600">
                {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
              </p>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  over
                    ? "bg-danger-500"
                    : warn
                      ? "bg-warning-500"
                      : "bg-success-500"
                )}
                style={{ width: `${Math.min(percent, 100)}%` }}
              />
            </div>

            <p
              className={cn(
                "mt-2 text-xs font-medium",
                over
                  ? "text-danger-600"
                  : warn
                    ? "text-warning-700"
                    : "text-success-700"
              )}
            >
              {percent}% used
              {over ? " — over budget" : warn ? " — almost there" : ""}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
