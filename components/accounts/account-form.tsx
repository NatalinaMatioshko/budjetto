"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AccountType } from "@/types";
import { useLocalBudget } from "@/components/providers/local-budget-provider";

const ACCOUNT_TYPES: AccountType[] = [
  "CHECKING",
  "SAVINGS",
  "CASH",
  "CREDIT",
  "INVESTMENT",
  "OTHER",
];

export function AccountForm() {
  const { addAccount } = useLocalBudget();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setIsSubmitting(true);
    addAccount({
      name: String(form.get("name") || "").trim(),
      type: String(form.get("type") || "CHECKING") as AccountType,
      balance: Number(form.get("balance") || 0),
      currency: String(form.get("currency") || "USD"),
    });
    event.currentTarget.reset();
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" label="Name" required placeholder="Checking" />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="type" className="text-sm font-medium text-slate-700">
          Type
        </label>
        <select
          id="type"
          name="type"
          defaultValue="CHECKING"
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          {ACCOUNT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <Input
        name="balance"
        label="Opening balance"
        type="number"
        step="0.01"
        defaultValue={0}
      />
      <Input name="currency" label="Currency" defaultValue="UAH" maxLength={3} />
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Add account
      </Button>
    </form>
  );
}
