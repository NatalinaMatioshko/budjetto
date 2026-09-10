"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CreateTransactionInput } from "@/lib/validations";
import type { Account, Category, TransactionType } from "@/types";

export interface TransactionFormProps {
  accounts: Pick<Account, "id" | "name">[];
  categories: Pick<Category, "id" | "name" | "type">[];
  onSubmit?: (data: CreateTransactionInput) => void | Promise<void>;
}

const TYPES: TransactionType[] = ["EXPENSE", "INCOME", "TRANSFER"];

/**
 * Placeholder form for creating a transaction (client-side only for now).
 */
export function TransactionForm({
  accounts,
  categories,
  onSubmit,
}: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>("EXPENSE");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      event.currentTarget.reset();
      setType("EXPENSE");
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
                ? "rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white"
                : "rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200"
            }
          >
            {t}
          </button>
        ))}
      </div>

      <Input
        name="amount"
        label="Amount"
        type="number"
        step="0.01"
        min="0"
        required
        placeholder="0.00"
      />

      <Input
        name="description"
        label="Description"
        placeholder="Groceries, salary, rent…"
      />

      <Input
        name="date"
        label="Date"
        type="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="accountId" className="text-sm font-medium text-slate-700">
          Account
        </label>
        <select
          id="accountId"
          name="accountId"
          required
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <option value="">Select account</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="categoryId"
          className="text-sm font-medium text-slate-700"
        >
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <option value="">Uncategorized</option>
          {filteredCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Add transaction
      </Button>
    </form>
  );
}
