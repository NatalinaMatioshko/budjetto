"use client";

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

export function TransactionsView() {
  const {
    ready,
    db,
    transactionsWithRelations,
    addTransaction,
    deleteTransaction,
  } = useLocalBudget();

  if (!ready) {
    return <p className="text-sm text-slate-500">Loading local data…</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Transactions
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Changes are saved in your browser (localStorage)
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>New transaction</CardTitle>
            <CardDescription>Adds instantly to local storage</CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionForm
              accounts={db.accounts.map((a) => ({ id: a.id, name: a.name }))}
              categories={db.categories.map((c) => ({
                id: c.id,
                name: c.name,
                type: c.type,
              }))}
              onSubmit={(data) => addTransaction(data)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>
              {transactionsWithRelations.length} transaction
              {transactionsWithRelations.length === 1 ? "" : "s"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TransactionsPanel transactions={transactionsWithRelations} />
            {transactionsWithRelations.length > 0 && (
              <ul className="space-y-2 border-t border-slate-100 pt-4">
                {transactionsWithRelations.slice(0, 8).map((tx) => (
                  <li
                    key={tx.id}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="truncate text-slate-600">
                      {tx.description || "Untitled"}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTransaction(tx.id)}
                    >
                      Delete
                    </Button>
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
