"use client";

import type { TransactionWithRelations } from "@/types";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface TransactionListProps {
  transactions: TransactionWithRelations[];
  emptyMessage?: string;
  onEdit?: (tx: TransactionWithRelations) => void;
  onDelete?: (id: string) => void;
}

function amountTone(type: TransactionWithRelations["type"]) {
  if (type === "INCOME") {
    return "text-emerald-600 dark:bg-gradient-to-br dark:from-emerald-300 dark:via-emerald-400 dark:to-teal-500 dark:bg-clip-text dark:text-transparent";
  }
  if (type === "TRANSFER") {
    return "text-sky-600 dark:bg-gradient-to-br dark:from-sky-300 dark:via-blue-400 dark:to-indigo-500 dark:bg-clip-text dark:text-transparent";
  }
  return "text-rose-600 dark:bg-gradient-to-br dark:from-rose-300 dark:via-pink-400 dark:to-fuchsia-500 dark:bg-clip-text dark:text-transparent";
}

function amountPrefix(type: TransactionWithRelations["type"]) {
  if (type === "INCOME") return "+";
  if (type === "TRANSFER") return "↔ ";
  return "−";
}

/**
 * Transaction cards — light glass on light theme, dark glass on dark.
 */
export function TransactionList({
  transactions,
  emptyMessage = "Поки немає записів.",
  onEdit,
  onDelete,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {transactions.map((tx) => {
        const isIncome = tx.type === "INCOME";
        return (
          <li key={tx.id}>
            <article
              className={cn(
                "rounded-2xl border p-5 backdrop-blur-md transition-colors",
                "border-zinc-200 bg-white shadow-sm",
                "hover:border-zinc-300 hover:bg-zinc-50",
                "dark:border-white/10 dark:bg-zinc-900/60 dark:shadow-none",
                "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                "dark:hover:border-white/20 dark:hover:bg-white/[0.07]"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-3xl font-bold tabular-nums tracking-tight",
                      amountTone(tx.type)
                    )}
                  >
                    {amountPrefix(tx.type)}
                    {formatCurrency(Math.abs(tx.amount))}
                  </p>
                  <p className="mt-2 truncate text-sm font-medium text-zinc-900 dark:text-zinc-200">
                    {tx.description || "Без опису"}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {formatDate(tx.date)}
                    {tx.category ? ` · ${tx.category.name}` : ""}
                    {tx.account ? ` · ${tx.account.name}` : ""}
                  </p>
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                    {isIncome
                      ? "Дохід"
                      : tx.type === "TRANSFER"
                        ? "Переказ"
                        : "Витрата"}
                  </p>
                </div>
                {tx.category?.color && (
                  <span
                    className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: tx.category.color }}
                    aria-hidden
                  />
                )}
              </div>

              {(onEdit || onDelete) && (
                <div className="mt-4 flex justify-end gap-1 border-t border-zinc-100 pt-3 dark:border-white/5">
                  {onEdit && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-zinc-600 hover:text-[#2f6fed] dark:text-zinc-300"
                      onClick={() => onEdit(tx)}
                    >
                      Редагувати
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-zinc-500 hover:text-danger-600 dark:text-zinc-400 dark:hover:text-danger-400"
                      onClick={() => onDelete(tx.id)}
                    >
                      Видалити
                    </Button>
                  )}
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
