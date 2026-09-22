"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useShell } from "@/components/layout/app-shell";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { href: "/transactions", label: "Transactions", icon: TransactionsIcon },
  { href: "/expenses", label: "Categories", icon: CategoriesIcon },
  { href: "/budgets", label: "Budgets", icon: BudgetsIcon },
  { href: "/accounts", label: "Accounts", icon: AccountsIcon },
  { href: "/savings", label: "Накопичення", icon: SavingsIcon },
  { href: "/shopping", label: "Що купити", icon: ShoppingIcon },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Menu
      </p>
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive =
          pathname === href ||
          (href !== "/dashboard" && pathname.startsWith(href));

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-[#2f6fed]/15 text-[#6ea0ff]"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarChrome({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-64 flex-col bg-white dark:bg-zinc-950",
        className
      )}
    >
      <div className="flex h-14 items-center gap-2 border-b border-zinc-200 px-5 dark:border-white/10">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2f6fed] text-sm font-bold text-white">
            B
          </span>
          <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
            Budjetto
          </span>
        </Link>
      </div>

      <NavLinks onNavigate={onNavigate} />

      <div className="border-t border-zinc-200 p-4 dark:border-white/10">
        <div className="flex items-center gap-3 rounded-lg bg-zinc-50 px-3 py-2.5 dark:bg-white/5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2f6fed]/20 text-sm font-semibold text-[#2f6fed] dark:text-[#6ea0ff]">
            Н
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">
              Local user
            </p>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
              Без акаунта
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { mobileOpen, closeMobile } = useShell();

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-zinc-200 dark:border-white/10 desktop:block">
        <SidebarChrome />
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-50 desktop:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          className={cn(
            "absolute inset-0 bg-black/60 transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={closeMobile}
        />
        <aside
          className={cn(
            "absolute inset-y-0 left-0 border-r border-zinc-200 shadow-xl transition-transform duration-300 ease-out dark:border-white/10",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <SidebarChrome onNavigate={closeMobile} />
        </aside>
      </div>
    </>
  );
}

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" />
    </svg>
  );
}

function TransactionsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
    </svg>
  );
}

function CategoriesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h7" />
    </svg>
  );
}

function BudgetsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  );
}

function AccountsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function SavingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l4 4m-4-4L8 7m-3 5h14v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7z" />
    </svg>
  );
}

function ShoppingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5h6M9 9h6M9 13h4M5 3h14a1 1 0 011 1v16l-4-2-4 2-4-2-4 2V4a1 1 0 011-1z"
      />
    </svg>
  );
}
