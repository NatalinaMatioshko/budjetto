"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalBudget } from "@/components/providers/local-budget-provider";

function monthInputValue(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function BudgetForm() {
  const { db, addBudget } = useLocalBudget();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const amount = Number(form.get("amount") || 0);
    if (!name || amount <= 0) return;

    setIsSubmitting(true);
    addBudget({
      name,
      amount,
      startDate: new Date(String(form.get("startDate"))),
      endDate: new Date(String(form.get("endDate"))),
      categoryId: String(form.get("categoryId") || "") || null,
    });
    event.currentTarget.reset();
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" label="Name" required placeholder="Groceries" />
      <Input
        name="amount"
        label="Limit"
        type="number"
        step="0.01"
        min="0.01"
        required
        placeholder="600"
      />
      <Input
        name="startDate"
        label="Start"
        type="date"
        required
        defaultValue={monthInputValue(start)}
      />
      <Input
        name="endDate"
        label="End"
        type="date"
        required
        defaultValue={monthInputValue(end)}
      />
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="budgetCategoryId"
          className="text-sm font-medium text-slate-700"
        >
          Category
        </label>
        <select
          id="budgetCategoryId"
          name="categoryId"
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <option value="">All expenses</option>
          {db.categories
            .filter((c) => c.type === "EXPENSE")
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Add budget
      </Button>
    </form>
  );
}
