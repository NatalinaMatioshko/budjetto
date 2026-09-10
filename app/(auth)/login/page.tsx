"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { setLocalSession } from "@/lib/local-db";

/**
 * Local-mode login — no server auth, just opens the dashboard.
 */
export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setLocalSession(true);
    router.push("/dashboard");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Local mode — no backend. Any email/password opens the app.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Input
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@family.com"
          />
          <Input
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
          />
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-3">
          <Button type="submit" isLoading={isLoading} className="w-full">
            Continue locally
          </Button>
          <p className="text-center text-sm text-slate-500">
            No account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              Create one
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
