"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useLocalBudget } from "@/components/providers/local-budget-provider";
import {
  ExpenseCategoryGrid,
  ExpenseCategoryGridSkeleton,
  CategoryShowcase,
} from "@/components/expenses/expense-category-grid";

/**
 * Expense categories as dark media cards (reference layout).
 */
export function ExpensesView() {
  const { ready, expenseBlocks, monthExpense } = useLocalBudget();

  if (!ready) {
    return (
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 dark:border-transparent dark:bg-black">
        <div className="mb-6 h-8 w-48 animate-pulse rounded bg-zinc-200 dark:bg-white/10" />
        <ExpenseCategoryGridSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Витрати
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Категорії · разом{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-200">
              {formatCurrency(monthExpense)}
            </span>
          </p>
        </div>
        <Link href="/transactions?type=expense">
          <Button variant="outline" size="sm">
            Усі витрати
          </Button>
        </Link>
      </div>

      <CategoryShowcase
        title="Категорії витрат"
        subtitle="Натисни картку — відкриються записи цієї категорії"
      >
        <ExpenseCategoryGrid
          blocks={expenseBlocks}
          linkMode="transactions"
          showProgress
          totalExpenses={monthExpense}
        />
      </CategoryShowcase>
    </div>
  );
}
