"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { AccountForm } from "@/components/accounts/account-form";
import { useLocalBudget } from "@/components/providers/local-budget-provider";

export function AccountsView() {
  const { ready, db, deleteAccount } = useLocalBudget();

  if (!ready) {
    return <p className="text-sm text-slate-500">Loading local data…</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Accounts
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Bank accounts, cash, and credit (local only)
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>New account</CardTitle>
            <CardDescription>Saved in localStorage</CardDescription>
          </CardHeader>
          <CardContent>
            <AccountForm />
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {db.accounts.map((account) => (
            <Card key={account.id}>
              <CardHeader>
                <CardDescription className="uppercase tracking-wide">
                  {account.type}
                </CardDescription>
                <CardTitle>{account.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-2xl font-semibold tabular-nums text-primary-700">
                  {formatCurrency(account.balance, account.currency)}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => deleteAccount(account.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
          {db.accounts.length === 0 && (
            <p className="text-sm text-slate-500">No accounts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
