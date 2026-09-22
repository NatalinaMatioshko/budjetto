"use client";

import { useState } from "react";
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
import { TransactionList } from "@/components/transactions/transaction-list";
import { TransactionForm } from "@/components/transactions/transaction-form";
import type { TransactionWithRelations } from "@/types";

export function IncomeView() {
  const {
    ready,
    db,
    incomeTotal,
    incomeTransactions,
    mainBalance,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useLocalBudget();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TransactionWithRelations | null>(null);

  if (!ready) {
    return <p className="text-sm text-zinc-500 dark:text-zinc-400">Завантаження…</p>;
  }

  const formOpen = showForm || Boolean(editing);

  function closeForm() {
    setShowForm(false);
    setEditing(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Дохід
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            ЗП та інші надходження. Можна додавати й редагувати записи.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/transactions?type=income">
            <Button variant="outline" size="sm">
              Усі доходи
            </Button>
          </Link>
          <Button
            type="button"
            size="sm"
            variant={formOpen ? "outline" : "primary"}
            onClick={() => {
              if (formOpen) closeForm();
              else {
                setEditing(null);
                setShowForm(true);
              }
            }}
          >
            {formOpen ? "Сховати" : "Додати"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-success-200 bg-success-50/40 dark:border-success-800 dark:bg-success-950/30">
          <CardHeader>
            <CardDescription>Дохід цього місяця</CardDescription>
            <CardTitle className="text-3xl tabular-nums text-success-700 dark:text-success-400">
              {formatCurrency(incomeTotal)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Залишок на основному</CardDescription>
            <CardTitle className="text-3xl tabular-nums text-primary-700 dark:text-[#6ea0ff]">
              {formatCurrency(mainBalance)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Після планових витрат і відкладень
            </p>
          </CardContent>
        </Card>
      </div>

      {formOpen && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editing ? "Редагувати дохід" : "Новий дохід"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm
              key={editing?.id ?? "new-income"}
              accounts={db.accounts.map((a) => ({ id: a.id, name: a.name }))}
              categories={db.categories
                .filter((c) => c.type === "INCOME")
                .map((c) => ({ id: c.id, name: c.name, type: c.type }))}
              defaultType="INCOME"
              defaultCategoryId="cat_salary"
              initial={editing}
              onCancel={closeForm}
              onSubmit={(data) => {
                if (editing) updateTransaction(editing.id, data);
                else addTransaction(data);
                closeForm();
              }}
            />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Надходження</CardTitle>
          <CardDescription>Записи доходу — редагуй або видаляй</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionList
            transactions={incomeTransactions}
            onEdit={(tx) => {
              setShowForm(false);
              setEditing(tx);
            }}
            onDelete={deleteTransaction}
            emptyMessage="Поки немає записів."
          />
        </CardContent>
      </Card>
    </div>
  );
}
