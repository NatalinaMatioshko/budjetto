"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useLocalBudget } from "@/components/providers/local-budget-provider";
import type { ShoppingItem } from "@/types";

export interface ShoppingFormProps {
  initial?: Pick<
    ShoppingItem,
    "id" | "title" | "amount" | "categoryId" | "notes"
  > | null;
  onCancel?: () => void;
  onSaved?: () => void;
}

export function ShoppingForm({
  initial = null,
  onCancel,
  onSaved,
}: ShoppingFormProps) {
  const { db, addShoppingItem, updateShoppingItem } = useLocalBudget();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = Boolean(initial);

  useEffect(() => {
    // remount via key from parent when initial changes
  }, [initial]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "").trim();
    if (!title) return;

    const amountRaw = String(form.get("amount") || "");
    const payload = {
      title,
      amount: amountRaw ? Number(amountRaw) : null,
      categoryId: String(form.get("categoryId") || "") || null,
      notes: String(form.get("notes") || "") || null,
    };

    setIsSubmitting(true);
    if (initial) {
      updateShoppingItem(initial.id, payload);
    } else {
      addShoppingItem(payload);
      event.currentTarget.reset();
    }
    setIsSubmitting(false);
    onSaved?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        key={`title-${initial?.id ?? "new"}`}
        name="title"
        label="Що купити"
        required
        placeholder="Прокладки, корм…"
        defaultValue={initial?.title ?? ""}
      />
      <Input
        key={`amount-${initial?.id ?? "new"}`}
        name="amount"
        label="Сума (грн)"
        type="number"
        step="0.01"
        min="0"
        placeholder="115"
        defaultValue={initial?.amount ?? ""}
      />
      <Select
        key={`cat-${initial?.id ?? "new"}`}
        id="shopCategoryId"
        name="categoryId"
        label="Категорія"
        defaultValue={initial?.categoryId ?? ""}
      >
        <option value="">Без категорії</option>
        {db.categories
          .filter((c) => c.type === "EXPENSE")
          .map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
      </Select>
      <Input
        key={`notes-${initial?.id ?? "new"}`}
        name="notes"
        label="Нотатка"
        placeholder="Ще не куплені"
        defaultValue={initial?.notes ?? ""}
      />
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
          {isEdit ? "Зберегти" : "Додати в список"}
        </Button>
      </div>
    </form>
  );
}
