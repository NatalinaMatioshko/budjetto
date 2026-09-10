import { LocalBudgetProvider } from "@/components/providers/local-budget-provider";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

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
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl flex-1">
          <Sidebar />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </LocalBudgetProvider>
  );
}
