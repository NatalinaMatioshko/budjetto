"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { CreateTransactionInput } from "@/lib/validations";
import type { Account, Category, Transaction, TransactionType } from "@/types";

export interface TransactionFormProps {
  accounts: Pick<Account, "id" | "name">[];
  categories: Pick<Category, "id" | "name" | "type">[];
  onSubmit?: (data: CreateTransactionInput) => void | Promise<void>;
  onCancel?: () => void;
  defaultType?: TransactionType;
  defaultCategoryId?: string | null;
  /** When set, form edits this transaction */
  initial?: Pick<
    Transaction,
    | "amount"
    | "type"
    | "description"
    | "date"
    | "accountId"
    | "categoryId"
  > | null;
  submitLabel?: string;
}

const TYPES: TransactionType[] = ["EXPENSE", "INCOME", "TRANSFER"];

const TYPE_LABELS: Record<TransactionType, string> = {
  EXPENSE: "Витрата",
  INCOME: "Дохід",
  TRANSFER: "Переказ",
};

function toDateInput(value: Date | string) {
  const d = value instanceof Date ? value : new Date(value);
  return d.toISOString().slice(0, 10);
}

/**
 * Form for creating or editing a transaction (local storage).
 */
export function TransactionForm({
  accounts,
  categories,
  onSubmit,
  onCancel,
  defaultType = "EXPENSE",
  defaultCategoryId = null,
  initial = null,
  submitLabel,
}: TransactionFormProps) {
  const isEdit = Boolean(initial);
  const [type, setType] = useState<TransactionType>(
    initial?.type ?? defaultType
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initial) setType(initial.type);
  }, [initial]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const payload: CreateTransactionInput = {
      amount: Number(form.get("amount")),
      type,
      description: String(form.get("description") || "") || null,
      date: form.get("date")
        ? new Date(String(form.get("date")))
        : new Date(),
      accountId: String(form.get("accountId")),
      categoryId: String(form.get("categoryId") || "") || null,
    };

    setIsSubmitting(true);
    try {
      await onSubmit?.(payload);
      if (!isEdit) {
        event.currentTarget.reset();
        setType(defaultType);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const filteredCategories = categories.filter(
    (c) => c.type === type || type === "TRANSFER"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={
              type === t
                ? "rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white dark:bg-[#2f6fed]"
                : "rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }
          >
            {TYPE_LABELS[t]}
          </button>
        ))}
      </div>

      <Input
        key={`amount-${initial?.amount ?? "new"}`}
        name="amount"
        label="Сума"
        type="number"
        step="0.01"
        min="0"
        required
        placeholder="0.00"
        defaultValue={initial?.amount ?? ""}
      />

      <Input
        key={`desc-${initial?.description ?? "new"}`}
        name="description"
        label="Опис"
        placeholder="Продукти, ЗП, оренда…"
        defaultValue={initial?.description ?? ""}
      />

      <Input
        key={`date-${initial ? toDateInput(initial.date) : "new"}`}
        name="date"
        label="Дата"
        type="date"
        defaultValue={
          initial ? toDateInput(initial.date) : new Date().toISOString().slice(0, 10)
        }
      />

      <Select
        key={`account-${initial?.accountId ?? "new"}`}
        id="accountId"
        name="accountId"
        label="Рахунок"
        required
        defaultValue={initial?.accountId ?? accounts[0]?.id ?? ""}
      >
        <option value="">Оберіть рахунок</option>
        {accounts.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </Select>

      <Select
        key={`category-${initial?.categoryId ?? defaultCategoryId ?? "new"}-${type}`}
        id="categoryId"
        name="categoryId"
        label="Категорія"
        defaultValue={
          initial?.categoryId ?? defaultCategoryId ?? ""
        }
      >
        <option value="">Без категорії</option>
        {filteredCategories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Select>

      <div className="flex gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            Скасувати
          </Button>
        )}
        <Button
          type="submit"
          isLoading={isSubmitting}
          className={onCancel ? "flex-1" : "w-full"}
        >
          {submitLabel ?? (isEdit ? "Зберегти" : "Додати")}
        </Button>
      </div>
    </form>
  );
}
