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
import { ShoppingList } from "@/components/shopping/shopping-list";

export function DashboardView() {
  const {
    ready,
    totalBalance,
    monthExpense,
    monthIncome,
    budgetsWithProgress,
    transactionsWithRelations,
    pendingShopping,
    pendingShoppingTotal,
    toggleShoppingBought,
    deleteShoppingItem,
    resetData,
  } = useLocalBudget();

  if (!ready) {
    return <p className="text-sm text-slate-500">Loading local data…</p>;
  }

  const summary = [
    {
      label: "Залишок",
      value: formatCurrency(totalBalance),
      hint: "Після планових витрат",
      tone: "text-primary-700",
    },
    {
      label: "Витрати (план)",
      value: formatCurrency(monthExpense),
      hint: "За цей місяць",
      tone: "text-danger-600",
    },
    {
      label: "Ще купити",
      value: formatCurrency(pendingShoppingTotal),
      hint: `${pendingShopping.length} пунктів у списку`,
      tone: "text-warning-700",
    },
    {
      label: "Дохід",
      value: formatCurrency(monthIncome),
      hint: "Аванс не враховано",
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
          <Link href="/shopping">
            <Button variant="secondary">Що купити</Button>
          </Link>
          <Link href="/transactions">
            <Button>Додати витрату</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
          <CardHeader className="flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle>Що купити</CardTitle>
              <CardDescription>
                Ще не придбано — наприклад, прокладки
              </CardDescription>
            </div>
            <Link href="/shopping">
              <Button variant="ghost" size="sm">
                Усі
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <ShoppingList
              items={pendingShopping.slice(0, 6)}
              onToggle={toggleShoppingBought}
              onDelete={deleteShoppingItem}
              emptyMessage="Усе зі списку вже куплено."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Останні витрати</CardTitle>
            <CardDescription>План транзакцій</CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionList
              transactions={transactionsWithRelations
                .filter((t) => t.type === "EXPENSE")
                .slice(0, 5)}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Бюджети</CardTitle>
          <CardDescription>Прогрес по категоріях</CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetProgress budgets={budgetsWithProgress.slice(0, 4)} />
        </CardContent>
      </Card>
    </div>
  );
}
