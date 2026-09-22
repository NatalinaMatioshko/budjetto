"use client";

import { useState, type FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useLocalBudget } from "@/components/providers/local-budget-provider";

export function SavingsView() {
  const {
    ready,
    savingsBalance,
    mainBalance,
    savingsTransfers,
    addToSavings,
  } = useLocalBudget();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!ready) {
    return <p className="text-sm text-slate-500">Завантаження…</p>;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    const amount = Number(form.get("amount") || 0);
    const note = String(form.get("note") || "");

    if (amount <= 0) {
      setError("Вкажи суму більше нуля.");
      return;
    }
    if (amount > mainBalance) {
      setError("На основному рахунку недостатньо коштів.");
      return;
    }

    setIsSubmitting(true);
    addToSavings(amount, note || undefined);
    event.currentTarget.reset();
    setIsSubmitting(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Накопичення
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Відкладай гроші з основного рахунку на майбутнє.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-primary-200 bg-primary-50/30">
          <CardHeader>
            <CardDescription>Уже відкладено</CardDescription>
            <CardTitle className="text-3xl tabular-nums text-primary-700">
              {formatCurrency(savingsBalance)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Доступно на основному</CardDescription>
            <CardTitle className="text-3xl tabular-nums text-slate-900">
              {formatCurrency(mainBalance)}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Відкласти</CardTitle>
            <CardDescription>Переказ на рахунок накопичення</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="amount"
                label="Сума (грн)"
                type="number"
                step="0.01"
                min="1"
                required
                placeholder="1000"
              />
              <Input
                name="note"
                label="Нотатка"
                placeholder="На відпустку / подушку безпеки"
              />
              {error && (
                <p className="rounded-lg bg-danger-50 px-3 py-2 text-sm text-danger-700">
                  {error}
                </p>
              )}
              <Button type="submit" isLoading={isSubmitting} className="w-full">
                Відкласти
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Історія відкладень</CardTitle>
            <CardDescription>Останні перекази</CardDescription>
          </CardHeader>
          <CardContent>
            {savingsTransfers.length === 0 ? (
              <p className="text-sm text-slate-500">
                Поки нічого не відкладено — додай першу суму.
              </p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {savingsTransfers.map((tx) => (
                  <li
                    key={tx.id}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {tx.description}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatDate(tx.date)}
                      </p>
                    </div>
                    <p className="font-semibold tabular-nums text-primary-700">
                      +{formatCurrency(tx.amount)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
