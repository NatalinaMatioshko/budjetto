"use client";

import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { ShoppingItemWithRelations } from "@/types";

export interface ShoppingListProps {
  items: ShoppingItemWithRelations[];
  onToggle: (id: string, bought: boolean) => void;
  onEdit?: (item: ShoppingItemWithRelations) => void;
  onDelete: (id: string) => void;
  emptyMessage?: string;
}

/**
 * Checklist: що купити / вже куплено.
 */
export function ShoppingList({
  items,
  onToggle,
  onEdit,
  onDelete,
  emptyMessage = "Список порожній.",
}: ShoppingListProps) {
  if (items.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="divide-y divide-zinc-100 dark:divide-white/10">
      {items.map((item) => (
        <li
          key={item.id}
          className={cn(
            "flex items-start gap-3 py-3",
            item.bought && "opacity-60"
          )}
        >
          <input
            type="checkbox"
            checked={item.bought}
            onChange={(e) => onToggle(item.id, e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-[#2f6fed] focus:ring-[#2f6fed] dark:border-white/20 dark:bg-zinc-900"
            aria-label={
              item.bought
                ? `Позначити «${item.title}» як не куплене`
                : `Позначити «${item.title}» як куплене`
            }
          />
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "font-medium text-zinc-900 dark:text-white",
                item.bought && "line-through"
              )}
            >
              {item.title}
            </p>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
              {item.category && (
                <span className="inline-flex items-center gap-1">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: item.category.color ?? "#94a3b8",
                    }}
                  />
                  {item.category.name}
                </span>
              )}
              {item.amount != null && (
                <span className="tabular-nums text-zinc-700 dark:text-zinc-300">
                  {formatCurrency(item.amount)}
                </span>
              )}
              {item.notes && <span>· {item.notes}</span>}
              {!item.bought && (
                <span className="font-medium text-warning-700 dark:text-warning-400">
                  ще не куплено
                </span>
              )}
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-0.5 sm:flex-row">
            {onEdit && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onEdit(item)}
              >
                Редагувати
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-zinc-500 hover:text-danger-600 dark:hover:text-danger-400"
              onClick={() => onDelete(item.id)}
            >
              Видалити
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
