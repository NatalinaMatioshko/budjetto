"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useLocalBudget } from "@/components/providers/local-budget-provider";
import { BudgetProgress } from "@/components/budgets/budget-progress";
import { TransactionList } from "@/components/transactions/transaction-list";

export function DashboardView() {
  const {
    ready,
    totalBalance,
    monthExpense,
    monthIncome,
    budgetsWithProgress,
    transactionsWithRelations,
    resetData,
  } = useLocalBudget();

  if (!ready) {
    return <p className="text-sm text-slate-500">Loading local data…</p>;
  }

  const summary = [
    {
      label: "Total balance",
      value: formatCurrency(totalBalance),
      hint: "Across all accounts",
      tone: "text-primary-700",
    },
    {
      label: "Spent this month",
      value: formatCurrency(monthExpense),
      hint: "From local transactions",
      tone: "text-danger-600",
    },
    {
      label: "Income this month",
      value: formatCurrency(monthIncome),
      hint: "From local transactions",
      tone: "text-success-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Вересень: дохід 33&nbsp;800&nbsp;грн (аванс ~9&nbsp;000&nbsp;грн не
            враховано). Дані локально в браузері.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={resetData}>
            Reset demo data
          </Button>
          <Link href="/transactions">
            <Button>Add transaction</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summary.map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className={`text-2xl tabular-nums ${item.tone}`}>
                {item.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500">{item.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budgets</CardTitle>
            <CardDescription>Progress this period</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetProgress budgets={budgetsWithProgress.slice(0, 3)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent transactions</CardTitle>
            <CardDescription>Latest activity</CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionList
              transactions={transactionsWithRelations.slice(0, 5)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
