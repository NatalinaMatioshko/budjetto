import { NextResponse } from "next/server";
import { createTransactionSchema } from "@/lib/validations";

/**
 * GET /api/transactions — list transactions (stub).
 * POST /api/transactions — create transaction (validates body, stub).
 */
export async function GET() {
  return NextResponse.json({
    data: [],
    message: "Connect Prisma to return real transactions.",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createTransactionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // TODO: prisma.transaction.create({ data: { ...parsed.data, userId } })
    return NextResponse.json(
      { data: parsed.data, message: "Transaction validated (not persisted)." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
