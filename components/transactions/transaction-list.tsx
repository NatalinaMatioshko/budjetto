import type { TransactionWithRelations } from "@/types";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface TransactionListProps {
  transactions: TransactionWithRelations[];
  emptyMessage?: string;
}

/**
 * Tabular list of transactions with income/expense styling.
 */
export function TransactionList({
  transactions,
  emptyMessage = "No transactions yet.",
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-slate-500">{emptyMessage}</p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Account</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((tx) => {
          const isIncome = tx.type === "INCOME";
          return (
            <TableRow key={tx.id}>
              <TableCell className="whitespace-nowrap text-slate-500">
                {formatDate(tx.date)}
              </TableCell>
              <TableCell className="font-medium text-slate-900">
                {tx.description || "—"}
              </TableCell>
              <TableCell>
                {tx.category ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: tx.category.color ?? "#94a3b8",
                      }}
                    />
                    {tx.category.name}
                  </span>
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell>{tx.account?.name ?? "—"}</TableCell>
              <TableCell
                className={cn(
                  "text-right font-semibold tabular-nums",
                  isIncome ? "text-success-600" : "text-danger-600"
                )}
              >
                {isIncome ? "+" : "−"}
                {formatCurrency(Math.abs(tx.amount))}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
