"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useLocalBudget } from "@/components/providers/local-budget-provider";
import { ShoppingForm } from "@/components/shopping/shopping-form";
import { ShoppingList } from "@/components/shopping/shopping-list";
import type { ShoppingItemWithRelations } from "@/types";

export function ShoppingView() {
  const {
    ready,
    shoppingItemsWithRelations,
    pendingShopping,
    pendingShoppingTotal,
    toggleShoppingBought,
    deleteShoppingItem,
  } = useLocalBudget();

  const [editing, setEditing] = useState<ShoppingItemWithRelations | null>(
    null
  );

  if (!ready) {
    return <p className="text-sm text-zinc-500 dark:text-zinc-400">Завантаження…</p>;
  }

  const pending = shoppingItemsWithRelations.filter((i) => !i.bought);
  const done = shoppingItemsWithRelations.filter((i) => i.bought);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Що купити
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Чекліст покупок поруч із планом витрат. Додавай, редагуй і відмічай
          куплене.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>Ще треба купити</CardDescription>
            <CardTitle className="text-2xl tabular-nums text-warning-700">
              {pendingShopping.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              На суму{" "}
              <span className="font-semibold tabular-nums">
                {formatCurrency(pendingShoppingTotal)}
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Вже куплено</CardDescription>
            <CardTitle className="text-2xl tabular-nums text-success-700">
              {done.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              з {shoppingItemsWithRelations.length} пунктів у списку
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>
              {editing ? "Редагувати пункт" : "Новий пункт"}
            </CardTitle>
            <CardDescription>
              {editing
                ? "Онови назву, суму чи категорію"
                : "Додай те, що треба придбати"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ShoppingForm
              key={editing?.id ?? "new"}
              initial={editing}
              onCancel={editing ? () => setEditing(null) : undefined}
              onSaved={() => setEditing(null)}
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>До покупки</CardTitle>
              <CardDescription>
                {pending.length}{" "}
                {pending.length === 1 ? "пункт" : "пунктів"} очікує
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShoppingList
                items={pending}
                onToggle={toggleShoppingBought}
                onEdit={setEditing}
                onDelete={deleteShoppingItem}
                emptyMessage="Усе куплено — список порожній."
              />
            </CardContent>
          </Card>

          {done.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Куплено</CardTitle>
                <CardDescription>
                  Можна зняти галочку, якщо помилково
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ShoppingList
                  items={done}
                  onToggle={toggleShoppingBought}
                  onEdit={setEditing}
                  onDelete={deleteShoppingItem}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
