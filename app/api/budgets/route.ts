import { NextResponse } from "next/server";
import { createBudgetSchema } from "@/lib/validations";

/**
 * GET /api/budgets — list budgets (stub).
 * POST /api/budgets — create budget (validates body, stub).
 */
export async function GET() {
  return NextResponse.json({
    data: [],
    message: "Connect Prisma to return real budgets.",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createBudgetSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (parsed.data.endDate < parsed.data.startDate) {
      return NextResponse.json(
        { error: "endDate must be on or after startDate" },
        { status: 400 }
      );
    }

    // TODO: prisma.budget.create(...)
    return NextResponse.json(
      { data: parsed.data, message: "Budget validated (not persisted)." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
