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
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#e0e7ff_0%,_transparent_50%)]" />
      <div className="relative mb-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
            B
          </span>
          <span className="text-xl font-semibold text-slate-900">Budjetto</span>
        </Link>
      </div>
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
