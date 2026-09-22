import { LocalBudgetProvider } from "@/components/providers/local-budget-provider";
import { AppShell } from "@/components/layout/app-shell";

/**
 * App shell with local browser storage provider (no backend required).
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocalBudgetProvider>
      <AppShell>{children}</AppShell>
    </LocalBudgetProvider>
  );
}
