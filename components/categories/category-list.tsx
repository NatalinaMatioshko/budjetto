import type { Category } from "@/types";
import { cn } from "@/lib/utils";

export interface CategoryListProps {
  categories: Category[];
  emptyMessage?: string;
}

/**
 * Simple grid of category chips / cards.
 */
export function CategoryList({
  categories,
  emptyMessage = "No categories yet. Create one to organize spending.",
}: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-slate-500">{emptyMessage}</p>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <li
          key={category.id}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white"
            style={{ backgroundColor: category.color ?? "#6366f1" }}
          >
            {category.icon ?? category.name.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium text-slate-900">
              {category.name}
            </p>
            <p
              className={cn(
                "text-xs font-medium uppercase tracking-wide",
                category.type === "INCOME"
                  ? "text-success-600"
                  : category.type === "EXPENSE"
                    ? "text-danger-600"
                    : "text-primary-600"
              )}
            >
              {category.type}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
