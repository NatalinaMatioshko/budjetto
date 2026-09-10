"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-danger-200 bg-danger-50 p-6">
      <h2 className="text-lg font-semibold text-danger-800">
        Dashboard error
      </h2>
      <p className="text-sm text-danger-700">
        Could not load this section. Try again.
      </p>
      <Button variant="danger" size="sm" onClick={reset}>
        Retry
      </Button>
    </div>
  );
}
