import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CategorySpendBlock } from "@/types";
import { cn, formatCurrency, budgetProgressPercent } from "@/lib/utils";
import {
  CATEGORY_VISUALS,
  expenseCategoryHref,
} from "@/lib/budget-structure";
import { CategoryGlyph } from "@/components/expenses/category-glyphs";

/**
 * Media category card — light surface in light theme, dark in dark theme.
 */
export function CategoryMediaCard({
  block,
  href,
  percentOfTotal,
}: {
  block: CategorySpendBlock;
  href: string;
  percentOfTotal: number;
}) {
  const visual = CATEGORY_VISUALS[block.id];
  const budgetPercent =
    block.budget != null && block.budget > 0
      ? budgetProgressPercent(block.spent, block.budget)
      : null;

  const description = [
    visual?.blurb,
    `Витрачено ${formatCurrency(block.spent)}`,
    block.budget != null ? `ліміт ${formatCurrency(block.budget)}` : null,
    `${percentOfTotal}% від витрат`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={href}
      className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#2f6fed] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100 dark:focus-visible:ring-offset-black"
    >
      <article
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300",
          "border-zinc-200 bg-white shadow-sm",
          "group-hover:border-[#2f6fed] group-hover:shadow-[0_0_0_1px_#2f6fed]",
          "dark:border-white/10 dark:bg-[#0a0a0a] dark:shadow-none"
        )}
      >
        <div className="relative h-40 w-full overflow-hidden sm:h-44">
          {visual ? (
            <Image
              src={visual.image}
              alt={visual.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${block.color ?? "#334155"}, #e4e4e7)`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/55 dark:to-transparent" />
        </div>

        <div className="relative flex flex-1 flex-col px-5 pb-5 pt-0">
          <div className="-mt-5 mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2f6fed] text-white shadow-lg shadow-[#2f6fed]/25">
            {visual ? (
              <CategoryGlyph name={visual.icon} />
            ) : (
              <span className="text-sm font-bold">
                {block.icon ?? block.name.slice(0, 1)}
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold tracking-tight text-zinc-900 transition-colors duration-300 group-hover:text-[#2f6fed] dark:text-white">
            {block.name}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {description}
          </p>

          {budgetPercent != null && (
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  budgetPercent >= 100
                    ? "bg-danger-500"
                    : budgetPercent >= 80
                      ? "bg-warning-400"
                      : "bg-[#2f6fed]"
                )}
                style={{ width: `${Math.min(budgetPercent, 100)}%` }}
              />
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

export function ExpenseCategoryGrid({
  blocks,
  hrefBase = "/expenses",
  compact = false,
  linkMode = "transactions",
  totalExpenses,
}: {
  blocks: CategorySpendBlock[];
  hrefBase?: string;
  compact?: boolean;
  linkMode?: "anchor" | "transactions";
  showProgress?: boolean;
  totalExpenses?: number;
}) {
  const total =
    totalExpenses ?? (blocks.reduce((sum, b) => sum + b.spent, 0) || 1);

  return (
    <div
      className={cn(
        "grid gap-5",
        compact
          ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
      )}
    >
      {blocks.map((block) => {
        const href =
          linkMode === "transactions"
            ? expenseCategoryHref(block.id)
            : `${hrefBase}#${block.id}`;
        const percentOfTotal = Math.round((block.spent / total) * 100);

        return (
          <CategoryMediaCard
            key={block.id}
            block={block}
            href={href}
            percentOfTotal={percentOfTotal}
          />
        );
      })}
    </div>
  );
}

export function ExpenseCategoryGridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-72 animate-pulse rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-white/5 dark:bg-[#141414]"
        />
      ))}
    </div>
  );
}

/** Showcase stage for category media cards — theme-aware */
export function CategoryShowcase({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-black dark:shadow-none sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
