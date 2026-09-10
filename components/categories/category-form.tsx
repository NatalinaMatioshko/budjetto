"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TransactionType } from "@/types";
import { useLocalBudget } from "@/components/providers/local-budget-provider";

const TYPES: TransactionType[] = ["EXPENSE", "INCOME", "TRANSFER"];
const COLORS = ["#16a34a", "#4f46e5", "#ca8a04", "#dc2626", "#0891b2", "#db2777"];

export function CategoryForm() {
  const { addCategory } = useLocalBudget();
  const [type, setType] = useState<TransactionType>("EXPENSE");
  const [color, setColor] = useState(COLORS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    if (!name) return;

    setIsSubmitting(true);
    addCategory({
      name,
      type,
      color,
      icon: String(form.get("icon") || "") || name.slice(0, 1).toUpperCase(),
    });
    event.currentTarget.reset();
    setType("EXPENSE");
    setColor(COLORS[0]);
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" label="Name" required placeholder="Food" />
      <Input name="icon" label="Icon / letter" placeholder="F" maxLength={2} />

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

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-slate-700">Color</span>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={
                color === c
                  ? "h-7 w-7 rounded-full ring-2 ring-offset-2 ring-slate-900"
                  : "h-7 w-7 rounded-full"
              }
              style={{ backgroundColor: c }}
              aria-label={c}
            />
          ))}
        </div>
      </div>

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Add category
      </Button>
    </form>
  );
}
