export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-48 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="h-32 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-32 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-32 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-32 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="h-72 rounded-2xl bg-zinc-200 dark:bg-zinc-900" />
        <div className="h-72 rounded-2xl bg-zinc-200 dark:bg-zinc-900" />
        <div className="h-72 rounded-2xl bg-zinc-200 dark:bg-zinc-900" />
        <div className="h-72 rounded-2xl bg-zinc-200 dark:bg-zinc-900" />
      </div>
    </div>
  );
}
