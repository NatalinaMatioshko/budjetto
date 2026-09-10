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
 * Local-mode register — no server, redirects to dashboard.
 */
export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirmPassword") ?? "");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setLocalSession(true);
    router.push("/dashboard");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Local mode — data stays in this browser only.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Input
            name="name"
            label="Name"
            autoComplete="name"
            required
            placeholder="Alex"
          />
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
            autoComplete="new-password"
            required
            minLength={8}
            hint="At least 8 characters"
          />
          <Input
            name="confirmPassword"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
          />
          {error && (
            <p className="rounded-lg bg-danger-50 px-3 py-2 text-sm text-danger-700">
              {error}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-3">
          <Button type="submit" isLoading={isLoading} className="w-full">
            Start locally
          </Button>
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
