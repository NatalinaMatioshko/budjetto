"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useLocalBudget } from "@/components/providers/local-budget-provider";
import {
  OverviewCard,
  OverviewCardsSkeleton,
} from "@/components/dashboard/overview-cards";
import {
  ExpenseCategoryGrid,
  CategoryShowcase,
} from "@/components/expenses/expense-category-grid";
import { ShoppingList } from "@/components/shopping/shopping-list";

export function DashboardView() {
  const {
    ready,
    incomeTotal,
    monthExpense,
    totalBalance,
    savingsBalance,
    expenseBlocks,
    pendingShopping,
    pendingShoppingTotal,
    toggleShoppingBought,
    deleteShoppingItem,
    resetData,
  } = useLocalBudget();

  if (!ready) {
    return (
      <div className="space-y-6">
        <OverviewCardsSkeleton />
        <div className="h-72 animate-pulse rounded-3xl bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Огляд місяця · дані зберігаються локально в браузері
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={resetData}>
          Скинути дані
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          title="Дохід"
          amount={incomeTotal}
          hint="ЗП цього місяця"
          href="/transactions?type=income"
          tone="success"
          icon={<IncomeIcon />}
        />
        <OverviewCard
          title="Витрати"
          amount={monthExpense}
          hint="Сума по всіх категоріях"
          href="/transactions?type=expense"
          tone="danger"
          icon={<ExpenseIcon />}
        />
        <OverviewCard
          title="Накопичення"
          amount={savingsBalance}
          hint="Відкладено на майбутнє"
          href="/savings"
          tone="primary"
          icon={<SavingsIcon />}
        />
        <OverviewCard
          title="Рахунки"
          amount={totalBalance}
          hint="Усі рахунки разом"
          href="/accounts"
          tone="purple"
          icon={<AccountsIcon />}
        />
      </div>

      <CategoryShowcase
        title="Витрати по категоріях"
        subtitle="Обери картку, щоб відкрити транзакції"
        action={
          <Link href="/expenses">
            <Button variant="outline" size="sm">
              Усі категорії
            </Button>
          </Link>
        }
      >
        <ExpenseCategoryGrid
          blocks={expenseBlocks}
          compact
          linkMode="transactions"
          totalExpenses={monthExpense}
        />
      </CategoryShowcase>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Що купити</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {pendingShopping.length} пунктів ·{" "}
              {formatCurrency(pendingShoppingTotal)}
            </p>
          </div>
          <Link href="/shopping">
            <Button variant="ghost" size="sm">
              Список
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="pt-4">
            <ShoppingList
              items={pendingShopping.slice(0, 5)}
              onToggle={toggleShoppingBought}
              onDelete={deleteShoppingItem}
              emptyMessage="Усе зі списку вже куплено."
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function IncomeIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-4 4m4-4l4 4" />
    </svg>
  );
}

function ExpenseIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 22a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
  );
}

function SavingsIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v1m0 7v1m-7-5a7 7 0 1114 0 7 7 0 01-14 0z" />
    </svg>
  );
}

function AccountsIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}
