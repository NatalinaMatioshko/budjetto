import { Suspense } from "react";
import { TransactionsView } from "@/components/transactions/transactions-view";

function TransactionsFallback() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-56 animate-pulse rounded bg-slate-200" />
      <div className="h-64 animate-pulse rounded-xl bg-slate-100" />
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense fallback={<TransactionsFallback />}>
      <TransactionsView />
    </Suspense>
  );
}
