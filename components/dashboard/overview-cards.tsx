import type { ReactNode } from "react";
import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type OverviewTone = "success" | "danger" | "primary" | "purple";

export interface OverviewCardProps {
  title: string;
  amount: number;
  hint?: string;
  href: string;
  tone: OverviewTone;
  icon: ReactNode;
}

const toneStyles: Record<
  OverviewTone,
  { card: string; amount: string; icon: string }
> = {
  success: {
    card: "border-success-200 hover:border-success-300 dark:border-success-800 dark:hover:border-success-600",
    amount: "text-success-700 dark:text-success-400",
    icon: "bg-success-100 text-success-700 dark:bg-success-950 dark:text-success-400",
  },
  danger: {
    card: "border-danger-200 hover:border-danger-300 dark:border-danger-800 dark:hover:border-danger-600",
    amount: "text-danger-700 dark:text-danger-400",
    icon: "bg-danger-100 text-danger-700 dark:bg-danger-950 dark:text-danger-400",
  },
  primary: {
    card: "border-primary-200 hover:border-primary-300 dark:border-[#2f6fed]/40 dark:hover:border-[#2f6fed]",
    amount: "text-primary-700 dark:text-[#6ea0ff]",
    icon: "bg-primary-100 text-primary-700 dark:bg-[#2f6fed]/20 dark:text-[#6ea0ff]",
  },
  purple: {
    card: "border-violet-200 hover:border-violet-300 dark:border-violet-800 dark:hover:border-violet-500",
    amount: "text-violet-700 dark:text-violet-300",
    icon: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  },
};

export function OverviewCard({
  title,
  amount,
  hint,
  href,
  tone,
  icon,
}: OverviewCardProps) {
  const styles = toneStyles[tone];

  return (
    <Link href={href} className="group block h-full">
      <Card
        className={cn(
          "h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md dark:group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]",
          styles.card
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <CardDescription>{title}</CardDescription>
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                styles.icon
              )}
            >
              {icon}
            </span>
          </div>
          <CardTitle
            className={cn("text-2xl tabular-nums sm:text-3xl", styles.amount)}
          >
            {formatCurrency(amount)}
          </CardTitle>
        </CardHeader>
        {hint && (
          <CardContent>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}

export function OverviewCardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-32 animate-pulse rounded-xl border border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-zinc-900"
        />
      ))}
    </div>
  );
}
