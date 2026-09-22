"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { setLocalSession } from "@/lib/local-db";
import { useShell } from "@/components/layout/app-shell";
import { useTheme } from "@/components/providers/theme-provider";

/**
 * Top bar: hamburger, theme toggle, sign out.
 */
export function Navbar() {
  const router = useRouter();
  const { mobileOpen, toggleMobile } = useShell();
  const { theme, toggleTheme } = useTheme();

  function handleSignOut() {
    setLocalSession(false);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-zinc-950/90">
      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10 desktop:hidden"
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            onClick={toggleMobile}
          >
            <MenuIcon open={mobileOpen} />
          </button>
          <span className="text-base font-semibold text-zinc-900 dark:text-white desktop:hidden">
            Budjetto
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs font-medium text-zinc-400 sm:inline">
            Local mode
          </span>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Увімкнути світлу тему" : "Увімкнути темну тему"
            }
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            <span className="hidden sm:inline">
              {theme === "dark" ? "Світла" : "Темна"}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {open ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0L16.95 7.05M7.05 16.95l-1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}
