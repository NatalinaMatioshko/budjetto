"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { TransactionsPanel } from "@/components/transactions/transactions-panel";
import { useLocalBudget } from "@/components/providers/local-budget-provider";
import {
  CATEGORY_ID_BY_SLUG,
  categoryDisplayName,
} from "@/lib/budget-structure";
import { formatCurrency } from "@/lib/utils";
import type { TransactionType, TransactionWithRelations } from "@/types";

/**
 * Transactions with optional query filters:
 * - ?type=income|expense|transfer
 * - ?category=coffee|subscriptions|…
 */
export function TransactionsView() {
  const searchParams = useSearchParams();
  const typeParam = (searchParams.get("type") || "all").toLowerCase();
  const categoryParam = searchParams.get("category");

  const {
    ready,
    db,
    transactionsWithRelations,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useLocalBudget();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TransactionWithRelations | null>(null);

  const categoryId = useMemo(() => {
    if (!categoryParam) return null;
    if (CATEGORY_ID_BY_SLUG[categoryParam]) {
      return CATEGORY_ID_BY_SLUG[categoryParam];
    }
    if (db.categories.some((c) => c.id === categoryParam)) {
      return categoryParam;
    }
    return null;
  }, [categoryParam, db.categories]);

  const category = categoryId
    ? db.categories.find((c) => c.id === categoryId)
    : null;

  const categoryTitle = categoryId
    ? categoryDisplayName(categoryId, category?.name)
    : null;

  const typeFilter: TransactionType | "ALL" =
    typeParam === "income"
      ? "INCOME"
      : typeParam === "expense"
        ? "EXPENSE"
        : typeParam === "transfer"
          ? "TRANSFER"
          : "ALL";

  const filtered = useMemo(() => {
    return transactionsWithRelations.filter((tx) => {
      const matchesType = typeFilter === "ALL" || tx.type === typeFilter;
      const matchesCategory = !categoryId || tx.categoryId === categoryId;
      return matchesType && matchesCategory;
    });
  }, [transactionsWithRelations, typeFilter, categoryId]);

  const total = filtered.reduce((sum, tx) => sum + tx.amount, 0);

  const title = categoryTitle
    ? `${category?.icon ? `${category.icon} ` : ""}${categoryTitle}`
    : typeFilter === "INCOME"
      ? "Дохід"
      : typeFilter === "EXPENSE"
        ? "Усі витрати"
        : typeFilter === "TRANSFER"
          ? "Перекази"
          : "Усі записи";

  if (!ready) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-56 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-64 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-900" />
      </div>
    );
  }

  const defaultFormType: TransactionType =
    typeFilter === "ALL" ? "EXPENSE" : typeFilter;

  const formOpen = showForm || Boolean(editing);

  function closeForm() {
    setShowForm(false);
    setEditing(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            {(typeFilter === "EXPENSE" || categoryId) && (
              <Link href="/expenses">
                <Button variant="ghost" size="sm">
                  ← До категорій витрат
                </Button>
              </Link>
            )}
            {categoryId && (
              <Link href="/transactions?type=expense">
                <Button variant="ghost" size="sm">
                  Усі витрати
                </Button>
              </Link>
            )}
            {typeFilter === "INCOME" && (
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  ← На головну
                </Button>
              </Link>
            )}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {filtered.length} запис
            {filtered.length === 1 ? "" : "ів"} ·{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-200">
              {formatCurrency(total)}
            </span>
          </p>
        </div>
        <Button
          type="button"
          onClick={() => {
            if (formOpen) {
              closeForm();
            } else {
              setEditing(null);
              setShowForm(true);
            }
          }}
          variant={formOpen ? "outline" : "primary"}
        >
          {formOpen ? "Сховати форму" : "Додати запис"}
        </Button>
      </div>

      <div
        className={
          formOpen ? "grid gap-6 lg:grid-cols-[320px_1fr]" : "grid gap-6"
        }
      >
        {formOpen && (
          <Card>
            <CardHeader>
              <CardTitle>
                {editing ? "Редагувати запис" : "Новий запис"}
              </CardTitle>
              <CardDescription>
                {editing
                  ? "Зміни одразу оновлять залишки й бюджети"
                  : "Зберігається локально"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionForm
                key={editing?.id ?? "new"}
                accounts={db.accounts.map((a) => ({ id: a.id, name: a.name }))}
                categories={db.categories.map((c) => ({
                  id: c.id,
                  name: c.name,
                  type: c.type,
                }))}
                defaultType={editing?.type ?? defaultFormType}
                defaultCategoryId={editing?.categoryId ?? categoryId}
                initial={editing}
                onCancel={closeForm}
                onSubmit={(data) => {
                  if (editing) {
                    updateTransaction(editing.id, data);
                  } else {
                    addTransaction({
                      ...data,
                      categoryId: data.categoryId || categoryId,
                    });
                  }
                  closeForm();
                }}
              />
            </CardContent>
          </Card>
        )}

        <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-black dark:shadow-none sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Список
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {categoryTitle
                ? `Категорія: ${categoryTitle}`
                : typeFilter !== "ALL"
                  ? `Фільтр: ${typeFilter}`
                  : "Усі транзакції"}
            </p>
          </div>
          <TransactionsPanel
            transactions={filtered}
            onEdit={(tx) => {
              setShowForm(false);
              setEditing(tx);
            }}
            onDelete={deleteTransaction}
          />
        </section>
      </div>
    </div>
  );
}
