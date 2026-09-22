import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Landing page — local browser mode (no backend required).
 */
export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-50 dark:bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(47,111,237,0.25)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.15)_0%,_transparent_45%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <div className="mb-8 flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2f6fed] text-base font-bold text-white">
            B
          </span>
          <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Budjetto
          </span>
        </div>

        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          Family budgeting, without the spreadsheet chaos.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Track accounts, categories, budgets, and transactions locally in your
          browser — no database setup needed for now.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/dashboard">
            <Button size="lg">Open app</Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline">
              Get started
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
