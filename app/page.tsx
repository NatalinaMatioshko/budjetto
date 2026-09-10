import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Landing page — local browser mode (no backend required).
 */
export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#e0e7ff_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_#dbeafe_0%,_transparent_45%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <div className="mb-8 flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-base font-bold text-white">
            B
          </span>
          <span className="text-2xl font-semibold tracking-tight text-slate-900">
            Budjetto
          </span>
        </div>

        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Family budgeting, without the spreadsheet chaos.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-slate-600">
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
