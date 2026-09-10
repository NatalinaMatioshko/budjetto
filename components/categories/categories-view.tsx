"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "@/components/categories/category-form";
import { CategoryList } from "@/components/categories/category-list";
import { useLocalBudget } from "@/components/providers/local-budget-provider";

export function CategoriesView() {
  const { ready, db, deleteCategory } = useLocalBudget();

  if (!ready) {
    return <p className="text-sm text-slate-500">Loading local data…</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Categories
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Organize spending and income (saved locally)
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>New category</CardTitle>
            <CardDescription>Stored in this browser</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your categories</CardTitle>
            <CardDescription>{db.categories.length} total</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CategoryList categories={db.categories} />
            {db.categories.length > 0 && (
              <ul className="space-y-2 border-t border-slate-100 pt-4">
                {db.categories.map((category) => (
                  <li
                    key={category.id}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-slate-700">{category.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteCategory(category.id)}
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
