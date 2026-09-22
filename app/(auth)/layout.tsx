import Link from "next/link";

/**
 * Centered auth shell for login / register.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(47,111,237,0.2)_0%,_transparent_50%)]" />
      <div className="relative mb-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2f6fed] text-sm font-bold text-white">
            B
          </span>
          <span className="text-xl font-semibold text-zinc-900 dark:text-white">
            Budjetto
          </span>
        </Link>
      </div>
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
