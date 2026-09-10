"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BudgetForm } from "@/components/budgets/budget-form";
import { BudgetProgress } from "@/components/budgets/budget-progress";
import { useLocalBudget } from "@/components/providers/local-budget-provider";

export function BudgetsView() {
  const { ready, budgetsWithProgress, deleteBudget } = useLocalBudget();

  if (!ready) {
    return <p className="text-sm text-slate-500">Loading local data…</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Budgets
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Limits update from your local expense transactions
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>New budget</CardTitle>
            <CardDescription>Stored in this browser</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This period</CardTitle>
            <CardDescription>
              {budgetsWithProgress.length} budget
              {budgetsWithProgress.length === 1 ? "" : "s"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <BudgetProgress budgets={budgetsWithProgress} />
            {budgetsWithProgress.length > 0 && (
              <ul className="space-y-2 border-t border-slate-100 pt-4">
                {budgetsWithProgress.map((budget) => (
                  <li
                    key={budget.id}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-slate-700">{budget.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteBudget(budget.id)}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
