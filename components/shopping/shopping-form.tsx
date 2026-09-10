"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalBudget } from "@/components/providers/local-budget-provider";

export function ShoppingForm() {
  const { db, addShoppingItem } = useLocalBudget();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "").trim();
    if (!title) return;

    const amountRaw = String(form.get("amount") || "");
    setIsSubmitting(true);
    addShoppingItem({
      title,
      amount: amountRaw ? Number(amountRaw) : null,
      categoryId: String(form.get("categoryId") || "") || null,
      notes: String(form.get("notes") || "") || null,
    });
    event.currentTarget.reset();
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="title"
        label="Що купити"
        required
        placeholder="Прокладки, корм…"
      />
      <Input
        name="amount"
        label="Сума (грн)"
        type="number"
        step="0.01"
        min="0"
        placeholder="115"
      />
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="shopCategoryId"
          className="text-sm font-medium text-slate-700"
        >
          Категорія
        </label>
        <select
          id="shopCategoryId"
          name="categoryId"
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <option value="">Без категорії</option>
          {db.categories
            .filter((c) => c.type === "EXPENSE")
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <Input name="notes" label="Нотатка" placeholder="Ще не куплені" />
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Додати в список
      </Button>
    </form>
  );
}
