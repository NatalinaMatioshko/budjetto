"use client";

import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { ShoppingItemWithRelations } from "@/types";

export interface ShoppingListProps {
  items: ShoppingItemWithRelations[];
  onToggle: (id: string, bought: boolean) => void;
  onDelete: (id: string) => void;
  emptyMessage?: string;
}

/**
 * Checklist: що купити / вже куплено.
 */
export function ShoppingList({
  items,
  onToggle,
  onDelete,
  emptyMessage = "Список порожній.",
}: ShoppingListProps) {
  if (items.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-slate-500">{emptyMessage}</p>
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
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
            className="mt-1 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
            aria-label={
              item.bought
                ? `Позначити «${item.title}» як не куплене`
                : `Позначити «${item.title}» як куплене`
            }
          />
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "font-medium text-slate-900",
                item.bought && "line-through"
              )}
            >
              {item.title}
            </p>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
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
                <span className="tabular-nums text-slate-700">
                  {formatCurrency(item.amount)}
                </span>
              )}
              {item.notes && <span>· {item.notes}</span>}
              {!item.bought && (
                <span className="font-medium text-warning-700">
                  ще не куплено
                </span>
              )}
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onDelete(item.id)}
          >
            Видалити
          </Button>
        </li>
      ))}
    </ul>
  );
}
