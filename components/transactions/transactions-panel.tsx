"use client";

import { useMemo, useState } from "react";
import type { TransactionType, TransactionWithRelations } from "@/types";
import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { TransactionList } from "@/components/transactions/transaction-list";

/**
 * Filters + transaction cards with edit/delete.
 */
export function TransactionsPanel({
  transactions,
  onEdit,
  onDelete,
}: {
  transactions: TransactionWithRelations[];
  onEdit?: (tx: TransactionWithRelations) => void;
  onDelete?: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"ALL" | TransactionType>("ALL");

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesType = type === "ALL" || tx.type === type;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        (tx.description ?? "").toLowerCase().includes(q) ||
        (tx.category?.name ?? "").toLowerCase().includes(q) ||
        (tx.account?.name ?? "").toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [transactions, query, type]);

  return (
    <div className="space-y-5">
      <TransactionFilters
        query={query}
        type={type}
        onQueryChange={setQuery}
        onTypeChange={setType}
      />
      <TransactionList
        transactions={filtered}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
